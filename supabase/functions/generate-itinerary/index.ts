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
    const { destinations, days, selections, currency = "USD", people = 1 } = await req.json();

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
    const prompt = `You are an expert travel planner. Create an itinerary for a trip to ${destString} lasting ${days} days for ${people} travelers.
The user's preferred currency is ${currency}. 

CRITICAL: EVERY price field MUST include the currency symbol (e.g. "$150", "₹12000", "€100"). DO NOT return just numbers.
CRITICAL: EVERY item MUST have a "location_url" field which is a valid Google Maps search URL (e.g. "https://www.google.com/maps/search/?api=1&query=Hotel+Eiffel+Seine+Paris").

The user has selected the following layout for their budget: 
- Stay (Accommodation): ${selections.stay}
- Eat (Dining): ${selections.eat}
- Explore (Transport & Day Tours): ${selections.explore} (Note: budget = Public Transport, mid = Cabs, luxury = Private Cabs or Coaches)

Generate a JSON object with the following structure. Pay close attention to the budget preferences and provide realistic options that fit those tiers for a group of ${people} people.
Return ONLY pure JSON data.

{
  "name": "Trip to ${destString}",
  "total_budget": "Total estimated budget for all ${people} people in ${currency} (include symbol e.g. ₹5,25,000)",
  "requirements": [
    "Requirement 1 (e.g. Visa needed for Indian citizens)",
    "Requirement 2 (e.g. Travel Insurance recommended)"
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
