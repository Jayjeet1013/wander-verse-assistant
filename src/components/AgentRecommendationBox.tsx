
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AgentRecommendationBoxProps {
  tripDestination: string;
  interests: string[];
}

const AgentRecommendationBox = ({ tripDestination, interests }: AgentRecommendationBoxProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  
  const generateRecommendations = () => {
    setIsGenerating(true);
    
    // Simulate AI agent generating recommendations
    setTimeout(() => {
      // This would normally be an API call to a Fetch.ai agent
      const demoRecommendations = [
        {
          type: "attraction",
          name: `Top ${interests[0]} Experience in ${tripDestination}`,
          description: `This is the most popular ${interests[0].toLowerCase()} experience in ${tripDestination}, highly recommended by locals and visitors alike.`,
          rating: 4.8
        },
        {
          type: "restaurant",
          name: `Best Local Cuisine in ${tripDestination}`,
          description: `Experience authentic local flavors at this hidden gem. Perfect for foodies looking for an unforgettable culinary adventure.`,
          rating: 4.6
        },
        {
          type: "accommodation",
          name: `Ideal Stay Based on Your Preferences`,
          description: `This accommodation perfectly matches your interests in ${interests.join(', ')} with excellent amenities and location.`,
          rating: 4.9
        }
      ];
      
      setRecommendations(demoRecommendations);
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fetch.ai Agent Recommendations</CardTitle>
        <CardDescription>
          Get personalized recommendations based on your travel preferences using AI agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{rec.name}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {rec.rating}/5
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{rec.description}</p>
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" size="sm">Add to Itinerary</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-gray-400 mb-4"
            >
              <path d="M12 8V4H8"></path>
              <rect width="16" height="12" x="4" y="4" rx="2"></rect>
              <path d="M2 14h12"></path>
              <path d="M22 14h-2"></path>
              <path d="M14 20v-6"></path>
              <path d="M6 20v-6"></path>
              <path d="M10 20v-6"></path>
              <path d="M18 20v-6"></path>
            </svg>
            <p className="text-gray-600 mb-4">
              The Fetch.ai agent can analyze your interests in {interests.join(', ')} and
              provide personalized recommendations for your trip to {tripDestination}.
            </p>
            <Button 
              onClick={generateRecommendations} 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                'Generate Recommendations'
              )}
            </Button>
          </div>
        )}
      </CardContent>
      {recommendations.length > 0 && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setRecommendations([]);
              setTimeout(() => {
                generateRecommendations();
              }, 500);
            }}
          >
            Refresh Recommendations
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AgentRecommendationBox;
