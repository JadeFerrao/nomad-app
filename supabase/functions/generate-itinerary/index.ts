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
  explore: d.explore.name 
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
- Stay (Accommodation): ${selections.stay} (Note: budget = Hostels, mid = 2-4 Star Hotels, luxury = High-end 5-7 Star Hotels)
- Eat (Dining): ${selections.eat} (Note: budget = Street Food, mid = 2-4 Star Restaurants, luxury = High-end 5-7 Star Restaurants)
- Explore (Transport & Day Tours): ${selections.explore} (Note: budget = Public Transport, mid = Cabs, luxury = Private Cabs or Coaches)

Generate a JSON object with the following structure. Pay close attention to the budget preferences and provide realistic options that fit those tiers for a group of ${people} people.
Return ONLY pure JSON data.

{
  "name": "Trip to ${destString}",
  "total_budget": "Total estimated budget INCLUDING flight for all ${people} people in ${currency} (include symbol e.g. ₹5,25,000)",
  "approx_flight_budget": "Approx total flight ticket cost for ${people} people in ${currency}",
  "booking_links": {
    "skyscanner": "Direct Skyscanner search URL for this route and dates: https://www.skyscanner.net/transport/flights/[origin]/[destination]/[outboundDate]/[inboundDate]?adults=${people}"
  },
  "requirements": [
    "Requirement 1 (MUST be factual Visa information for Indian citizens visiting ${destString})",
    "Requirement 2 (MUST be factual Visa information for Western/Foreign citizens visiting ${destString})",
    
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
        "name": "Activity/Transport in ${selections.explore} tier",
        "price": "Price in ${currency} with symbol",
        "location_url": "Google Maps search URL"
      }
    }
  ]
}

CRITICAL: Return exactly ${days} days in the "days" array to match the selected duration.
CRITICAL: Use ONLY factual, up-to-date visa information. If a country is Visa-free or VOA, state it explicitly for both Indian and Foreign citizens.
CRITICAL: Construct the Skyscanner URL using the actual dates: Outbound: ${startDate}, Inbound: ${endDate}.


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

    // Process parsedContent to add AI generated images using Pollinations AI
    const processedDays = parsedContent.days.map((day: any) => {
      // Helper to cleanly encode prompts
      const getImageUrl = (type: string, spotName: string) => {
        // Keep prompt short & clean for better API success
        const cleanName = spotName.split('(')[0].trim();
        let p = `${cleanName} ${destinations[0]}`;
        
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(p)}?width=500&height=300&nologo=true`;
      };

      return {
        title: day.title,
        description: day.description,
        stay: {
          [selections.stay]: {
            name: day.stay.name,
            price: day.stay.price,
            image: getImageUrl('stay', day.stay.name),
          }
        },
        eat: {
          [selections.eat]: {
            name: day.eat.name,
            price: day.eat.price,
            image: getImageUrl('eat', day.eat.name),
          }
        },
        explore: {
          [selections.explore]: {
            name: day.explore.name,
            price: day.explore.price,
            image: getImageUrl('explore', day.explore.name),
          }
        }
      };
    });

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
