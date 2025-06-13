
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, PlaneTakeoff, Map, Calendar, Check, LoaderCircle, Clock, Users, Globe, Lightbulb, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import EnhancedDashboardSidebar from "@/components/dashboard/EnhancedDashboardSidebar";

interface DestinationSuggestion {
  name: string;
  description: string;
  matchScore: number;
  image: string;
  highlights: string[];
}

const TravelAssistant = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [travelerCount, setTravelerCount] = useState("1");
  const [tripDuration, setTripDuration] = useState("7");
  const [interests, setInterests] = useState<string[]>(["Nature", "Culture"]);
  const [budget, setBudget] = useState("medium");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<DestinationSuggestion[]>([]);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };
  
  const generateRecommendations = () => {
    if (!destination) {
      toast({
        title: "Missing information",
        description: "Please enter a destination to get recommendations",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // In a real implementation, this would be an API call to AI service
      const mockRecommendations: DestinationSuggestion[] = [
        {
          name: "Tokyo Highlights Tour",
          description: "Explore the vibrant city of Tokyo with this carefully crafted itinerary that balances traditional culture and modern attractions.",
          matchScore: 95,
          image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
          highlights: [
            "Visit Senso-ji Temple in Asakusa",
            "Explore the Meiji Shrine and surrounding gardens",
            "Experience modern Tokyo at Shibuya Crossing",
            "Discover Japanese cuisine at Tsukiji Outer Market"
          ]
        },
        {
          name: "Cultural Kyoto Experience",
          description: "Immerse yourself in Japan's cultural heritage with this Kyoto-focused itinerary featuring ancient temples and traditional experiences.",
          matchScore: 89,
          image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
          highlights: [
            "Tour the Fushimi Inari Shrine with its thousand torii gates",
            "Visit the golden Kinkaku-ji Temple",
            "Experience a traditional tea ceremony",
            "Stroll through the bamboo forest in Arashiyama"
          ]
        },
        {
          name: "Nature & Hot Springs Journey",
          description: "Connect with Japan's natural beauty and relaxation traditions with this nature-focused itinerary featuring hot springs and scenic landscapes.",
          matchScore: 87,
          image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9",
          highlights: [
            "Relax in traditional onsen hot springs",
            "Hike through scenic mountain trails",
            "Visit Lake Kawaguchiko for Mt. Fuji views",
            "Experience ryokan-style accommodation"
          ]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsGenerating(false);
    }, 3000);
  };
  
  const createTrip = (recommendation: DestinationSuggestion) => {
    toast({
      title: "Trip created",
      description: `Your ${recommendation.name} trip has been created!`,
    });
    navigate("/create-trip", { state: { destination: recommendation.name } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside className="bg-white shadow-md w-64 hidden md:flex flex-col h-screen sticky top-0">
        <EnhancedDashboardSidebar />
      </aside>
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
      )}
      
      {/* Mobile sidebar */}
      <aside className={`bg-white shadow-md w-64 fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <EnhancedDashboardSidebar isMobile toggleSidebar={toggleSidebar} />
      </aside>
      
      {/* Main content */}
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <button onClick={toggleSidebar} className="text-gray-500">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-travel-dark">AI Travel Assistant</h1>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">AI Travel Assistant</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-travel-primary" />
                    AI Travel Recommendations
                  </CardTitle>
                  <CardDescription>
                    Our AI will generate personalized travel recommendations based on your preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Where would you like to go?
                      </label>
                      <Input 
                        placeholder="e.g. Japan, Italy, New Zealand" 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Number of travelers
                        </label>
                        <Select value={travelerCount} onValueChange={setTravelerCount}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 person</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3-4">3-4 people</SelectItem>
                            <SelectItem value="5+">5+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Trip duration
                        </label>
                        <Select value={tripDuration} onValueChange={setTripDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trip duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekend">Weekend (1-3 days)</SelectItem>
                            <SelectItem value="7">Week (4-7 days)</SelectItem>
                            <SelectItem value="14">Two weeks (8-14 days)</SelectItem>
                            <SelectItem value="30">Long trip (15+ days)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Budget
                      </label>
                      <Select value={budget} onValueChange={setBudget}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget-friendly</SelectItem>
                          <SelectItem value="medium">Mid-range</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Travel interests (select all that apply)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Nature", "Culture", "Food", "Adventure", "Relaxation", "History", "Shopping", "Nightlife"].map((interest) => (
                          <Button 
                            key={interest}
                            variant={interests.includes(interest) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleInterestToggle(interest)}
                            className={interests.includes(interest) ? "bg-travel-primary" : ""}
                          >
                            {interests.includes(interest) && <Check className="mr-1 h-4 w-4" />}
                            {interest}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Additional preferences (optional)
                      </label>
                      <Textarea 
                        placeholder="Any specific requirements or preferences? E.g., kid-friendly activities, accessibility needs, etc."
                        className="min-h-[100px]"
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={generateRecommendations}
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Generating recommendations...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        Generate Travel Recommendations
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              {recommendations.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <PlaneTakeoff className="h-5 w-5 text-travel-primary" />
                    Your Personalized Travel Recommendations
                  </h2>
                  
                  {recommendations.map((rec, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto relative">
                          <img 
                            src={rec.image} 
                            alt={rec.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-travel-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                            {rec.matchScore}% match
                          </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                          <h3 className="text-xl font-bold mb-2">{rec.name}</h3>
                          <p className="text-gray-600 mb-4">{rec.description}</p>
                          
                          <h4 className="font-medium text-sm text-gray-700 mb-2">Highlights:</h4>
                          <ul className="space-y-1 mb-4">
                            {rec.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span className="text-sm">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button 
                              variant="default" 
                              className="flex items-center gap-2"
                              onClick={() => createTrip(rec)}
                            >
                              <Calendar className="h-4 w-4" />
                              Create Trip
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Map className="h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            <div className="col-span-1">
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Why Use AI Travel Assistant?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-travel-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Personalized Recommendations</h3>
                      <p className="text-sm text-gray-600">Get travel suggestions tailored to your unique preferences and interests.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-travel-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Save Planning Time</h3>
                      <p className="text-sm text-gray-600">Our AI analyzes thousands of options to create the perfect itinerary in seconds.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-travel-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Local Expertise</h3>
                      <p className="text-sm text-gray-600">Discover hidden gems and authentic experiences recommended by AI with local knowledge.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TravelAssistant;
