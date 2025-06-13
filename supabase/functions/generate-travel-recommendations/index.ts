
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { destination, travelerCount, tripDuration, interests, budget, additionalInfo } = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `Generate 3 detailed travel recommendations for ${destination} with the following preferences:
    - Number of travelers: ${travelerCount}
    - Trip duration: ${tripDuration} days
    - Interests: ${interests.join(', ')}
    - Budget: ${budget}
    - Additional info: ${additionalInfo || 'None'}

    For each recommendation, provide:
    1. A descriptive name for the itinerary
    2. A detailed description (2-3 sentences)
    3. A match score (1-100) based on how well it fits the preferences
    4. 4 specific highlights/activities
    
    Format the response as a JSON array with this structure:
    [
      {
        "name": "Itinerary Name",
        "description": "Detailed description of the travel experience",
        "matchScore": 95,
        "highlights": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"]
      }
    ]
    
    Make sure each recommendation is unique and tailored to the specific preferences provided.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }
    
    const recommendations = JSON.parse(jsonMatch[0]);
    
    // Add placeholder images for the recommendations
    const images = [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e", 
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9"
    ];
    
    const enrichedRecommendations = recommendations.map((rec: any, index: number) => ({
      ...rec,
      image: images[index % images.length]
    }));

    return new Response(JSON.stringify({ recommendations: enrichedRecommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-travel-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
