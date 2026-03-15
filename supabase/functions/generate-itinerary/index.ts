import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const GROQ_API_KEY = Deno.env.get("GROQ_AI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse the request body once.
    const requestBody = await (async () => {
      try {
        return await req.json();
      } catch {
        return {}; // Return empty object if parsing fails
      }
    })();

    const { mode, itinerary, currency: calcCurrency, people: calcPeople } = requestBody;

    if (mode === "recalculate" && itinerary) {
      if (!GROQ_API_KEY) {
        return new Response(JSON.stringify({ error: "Server configuration error: Missing API Key." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      const recalcPrompt = `You are a travel budget expert. The user has an itinerary for ${calcPeople} people in ${calcCurrency}.
Some items were edited (e.g. a specific hotel or restaurant was chosen). Please recalculate: 
1. The total estimated budget (Including flight estimates for the group).
2. The approximate flight budget for ${calcPeople} people based on the updated destinations.

Itinerary Data:
${JSON.stringify(itinerary.days.map((d: any) => ({ 
  stay: d.stay.name, 
  eat: d.eat.name, 
  explore: d.explore.name,
  shop: d.shop?.name,
  move: d.move?.name
})))}

Return ONLY a JSON object:
{
  "total_budget": "New total budget with symbol",
  "approx_flight_budget": "New flight budget with symbol"
}
`;
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [{ role: "user", content: recalcPrompt }],
          temperature: 0.1,
          response_format: { type: "json_object" },
        }),
      });

      const completion = await response.json();
      
      if (!response.ok) {
        throw new Error(`Groq API Error: ${completion.error?.message || response.statusText}`);
      }

      let parsedContent;
      try {
        parsedContent = JSON.parse(completion.choices[0].message.content);
      } catch (err) {
        throw new Error("Failed to parse AI response as JSON for recalculation.");
      }

      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Normal generation flow...
    const { destinations, days, selections, currency = "USD", people = 1, startDate, endDate } = requestBody;

    if (!destinations || !days || !selections) {
      return new Response(JSON.stringify({ error: "Missing required parameters." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "Server configuration error: Missing API Key." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Prepare prompt
    const destString = destinations.join(", ");
    const dateRangeStr = (startDate && endDate) ? `from ${startDate} to ${endDate}` : "";
    const prompt = `You are an expert travel planner. Create an itinerary for a trip to ${destString} lasting ${days} days ${dateRangeStr} for ${people} travelers.
The user's preferred currency is ${currency}. 

CRITICAL: EVERY price field MUST include the currency symbol (e.g. "$150", "₹12000", "€100"). DO NOT return just numbers.
CRITICAL: EVERY item MUST have a "location_url" field which is a valid Google Maps search URL (e.g. "https://www.google.com/maps/search/?api=1&query=Hotel+Eiffel+Seine+Paris").

The user has selected the following layout for their budget: 
- Stay (Accommodation): ${selections.stay} (Note: budget = Hostels, boutique = 3-4 Star Boutique Hotels, luxury = High-end 5-7 Star Hotels)
- Eat (Dining): ${selections.eat} (Note: street = Street Food & Local Eateries, cafe-bistro = Casual Cafes & Bistros, restaurants = Fine Dining Restaurants)
- Explore (Activities): ${selections.explore} (Note: nature = Nature & Outdoor Activities, hidden-gems = Hidden Gems & Local Experiences, iconic = Iconic Landmarks & Tourist Attractions)
- Shop (Shopping): ${selections.shop} (Note: market = Local Markets & Bazaars, vintage = Vintage & Boutique Shops, luxury = Luxury Malls with Designer Brands - Bags & Watches)
- Move (Transportation): ${selections.move} (Note: public = Public Transport like Buses & Metros, private = Private Cabs & Taxis, active = Active Transport like Bicycles & E-Scooters)

Generate a JSON object with the following structure. Pay close attention to the budget preferences and provide realistic options that fit those tiers for a group of ${people} people.
Return ONLY pure JSON data.

{
  "name": "Trip to ${destString}",
  "total_budget": "Total estimated budget INCLUDING flight for all ${people} people in ${currency} (include symbol e.g. ₹5,25,000)",
  "approx_flight_budget": "Approx total flight ticket cost for ${people} people in ${currency}",
  "requirements": [
    "Requirement 1 (MUST be factual Visa information for Indian citizens visiting ${destString}. Include: https://www.ivisa.com/ and https://www.mea.gov.in/images/amb1/visa-facility-for-indian-nationals.pdf)",
    "Requirement 2 (MUST be factual Visa information for Western/Foreign citizens visiting ${destString}. Include: https://www.passportindex.org/travel-visa-checker/)",   
    "Requirement 3 (Travel Insurance recommended)",
    "Seasonal tip for traveling to ${destString} during ${dateRangeStr}"
  ],
  "days": [
    {
      "title": "Short title",
      "description": "A detailed step-by-step guide for this day. MUST include travel/transit details like 'Take a 2h flight from X to Y', 'Board the Shinkansen at 9 AM', or 'Grab a local TukTuk to the temple'. Make it feel like a professional travel agent's plan.",
      "stay": {
        "name": "Accommodation in ${selections.stay} tier",
        "price": "Price in ${currency} with symbol",
        "location_url": "Google Maps search URL"
      },
      "eat": {
        "name": "Dining spot in ${selections.eat} tier",
        "price": "Price in ${currency} with symbol",
        "location_url": "Google Maps search URL"
      },
      "explore": {
        "name": "Activity in ${selections.explore} tier",
        "price": "Price in ${currency} with symbol",
        "location_url": "Google Maps search URL"
      },
      "shop": {
        "name": "Shopping location in ${selections.shop} tier",
        "price": "Price in ${currency} with symbol",
        "location_url": "Google Maps search URL"
      },
      "move": {
        "name": "Transportation option in ${selections.move} tier",
        "price": "Price in ${currency} with symbol",
        "location_url": "Google Maps search URL"
      }
    }
  ]
}

CRITICAL: Return exactly ${days} days in the "days" array to match the selected duration.
CRITICAL: EVERY day object MUST include ALL 5 fields: stay, eat, explore, shop, move. Do NOT omit any field.
CRITICAL: Use ONLY factual, up-to-date visa information. If a country is Visa-free or VOA, state it explicitly for both Indian and Foreign citizens.


Make sure there are exactly ${days} items in the "days" array. Avoid generic names, use real places.
`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Groq API Error: ${data.error?.message || response.statusText}`);
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(data.choices[0].message.content);
    } catch (err) {
      throw new Error("Failed to parse AI response as JSON.");
    }

    // Helper function to search for images using Pexels with better fallbacks
    const searchImageForLocation = async (locationName: string, destination: string, type: string): Promise<string> => {
      try {
        const query = `${locationName} ${destination}`;
        const PEXELS_API_KEY = Deno.env.get("PEXELS_API_KEY");
        
        if (PEXELS_API_KEY) {
          const searchResponse = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
            {
              headers: {
                'Authorization': PEXELS_API_KEY
              }
            }
          );
          
          if (searchResponse.ok) {
            const data = await searchResponse.json();
            if (data.photos && data.photos.length > 0) {
              return data.photos[0].src.large;
            }
          }
        }
        
        // Fallback to category-specific generic images from Unsplash
        const fallbackImages: Record<string, string> = {
          hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
          restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop',
          attraction: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop',
          shopping: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
          transport: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
        };
        return fallbackImages[type] || fallbackImages.attraction;
        
      } catch (error) {
        console.error('Image search error:', error);
        // Ultimate fallback - generic travel images
        const fallbackImages: Record<string, string> = {
          hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop',
          restaurant: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop',
          attraction: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop',
          shopping: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
          transport: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&h=300&fit=crop'
        };
        return fallbackImages[type] || fallbackImages.attraction;
      }
    };

    // Process parsedContent to add real images from web search
    const processedDays = await Promise.all(parsedContent.days.map(async (day: any) => {
      // Fetch images in parallel for each day
      const [stayImage, eatImage, exploreImage, shopImage, moveImage] = await Promise.all([
        searchImageForLocation(day.stay?.name || 'hotel', destinations[0], 'hotel'),
        searchImageForLocation(day.eat?.name || 'restaurant', destinations[0], 'restaurant'),
        searchImageForLocation(day.explore?.name || 'attraction', destinations[0], 'attraction'),
        searchImageForLocation(day.shop?.name || 'market', destinations[0], 'shopping'),
        searchImageForLocation(day.move?.name || 'transport', destinations[0], 'transport')
      ]);

      const fallbackMapUrl = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

      return {
        title: day.title,
        description: day.description,
        stay: {
          [selections.stay]: {
            name: day.stay?.name || 'Accommodation',
            price: day.stay?.price || '—',
            image: stayImage,
            location_url: day.stay?.location_url || fallbackMapUrl(day.stay?.name || 'hotel'),
          }
        },
        eat: {
          [selections.eat]: {
            name: day.eat?.name || 'Restaurant',
            price: day.eat?.price || '—',
            image: eatImage,
            location_url: day.eat?.location_url || fallbackMapUrl(day.eat?.name || 'restaurant'),
          }
        },
        explore: {
          [selections.explore]: {
            name: day.explore?.name || 'Attraction',
            price: day.explore?.price || '—',
            image: exploreImage,
            location_url: day.explore?.location_url || fallbackMapUrl(day.explore?.name || 'attraction'),
          }
        },
        shop: {
          [selections.shop]: {
            name: day.shop?.name || 'Local Market',
            price: day.shop?.price || '—',
            image: shopImage,
            location_url: day.shop?.location_url || fallbackMapUrl(day.shop?.name || 'market'),
          }
        },
        move: {
          [selections.move]: {
            name: day.move?.name || 'Local Transport',
            price: day.move?.price || '—',
            image: moveImage,
            location_url: day.move?.location_url || fallbackMapUrl(day.move?.name || 'transport'),
          }
        }
      };
    }));

    return new Response(JSON.stringify({
      name: parsedContent.name,
      total_budget: parsedContent.total_budget,
      approx_flight_budget: parsedContent.approx_flight_budget,
      booking_links: parsedContent.booking_links,
      requirements: parsedContent.requirements,
      days: processedDays
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
