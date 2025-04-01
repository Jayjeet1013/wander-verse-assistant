
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Bed, Utensils, Camera, ArrowLeft, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data - in a real application, this would come from a database
const tripData = {
  1: {
    id: 1,
    destination: "Tokyo, Japan",
    dateRange: "Oct 15 - Oct 25, 2023",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
    status: "completed",
    days: 10,
    description: "Explore the vibrant city of Tokyo, experience Japanese culture, and enjoy delicious cuisine.",
    budget: "$3,000",
    interests: ["Culture", "Food", "Shopping"],
    itinerary: [
      {
        day: 1,
        date: "Oct 15, 2023",
        activities: [
          { type: "attraction", name: "Tokyo Skytree", time: "10:00 AM", description: "Visit the tallest tower in Japan for panoramic views of Tokyo." },
          { type: "restaurant", name: "Sushi Dai", time: "1:00 PM", description: "Enjoy fresh sushi at this renowned restaurant." },
          { type: "accommodation", name: "Park Hyatt Tokyo", description: "5-star luxury hotel with beautiful city views." }
        ]
      },
      {
        day: 2,
        date: "Oct 16, 2023",
        activities: [
          { type: "attraction", name: "Senso-ji Temple", time: "9:00 AM", description: "Tokyo's oldest Buddhist temple in Asakusa." },
          { type: "restaurant", name: "Ichiran Ramen", time: "12:30 PM", description: "Famous chain serving tonkotsu ramen in individual booths." },
          { type: "attraction", name: "Meiji Shrine", time: "3:00 PM", description: "Shinto shrine dedicated to Emperor Meiji and Empress Shoken." },
          { type: "accommodation", name: "Park Hyatt Tokyo", description: "5-star luxury hotel with beautiful city views." }
        ]
      }
    ]
  },
  2: {
    id: 2,
    destination: "Paris, France",
    dateRange: "Dec 10 - Dec 18, 2023",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    status: "upcoming",
    days: 8,
    description: "Experience the romance of Paris, visit iconic landmarks, and indulge in French cuisine.",
    budget: "$2,500",
    interests: ["Art", "History", "Food"],
    itinerary: [
      {
        day: 1,
        date: "Dec 10, 2023",
        activities: [
          { type: "attraction", name: "Eiffel Tower", time: "10:00 AM", description: "Visit the iconic symbol of Paris." },
          { type: "restaurant", name: "Café de Flore", time: "1:00 PM", description: "Historic café known for its famous patrons." },
          { type: "accommodation", name: "Hôtel Plaza Athénée", description: "Luxury hotel on Avenue Montaigne near the Champs-Elysées." }
        ]
      },
      {
        day: 2,
        date: "Dec 11, 2023",
        activities: [
          { type: "attraction", name: "Louvre Museum", time: "9:00 AM", description: "Home to thousands of works of art including the Mona Lisa." },
          { type: "restaurant", name: "Le Jules Verne", time: "12:30 PM", description: "Fine dining restaurant located on the second floor of the Eiffel Tower." },
          { type: "attraction", name: "Notre-Dame Cathedral", time: "3:00 PM", description: "Medieval Catholic cathedral on the Île de la Cité." },
          { type: "accommodation", name: "Hôtel Plaza Athénée", description: "Luxury hotel on Avenue Montaigne near the Champs-Elysées." }
        ]
      }
    ]
  },
  3: {
    id: 3,
    destination: "Bali, Indonesia",
    dateRange: "Jan 5 - Jan 15, 2024",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    status: "planning",
    days: 10,
    description: "Relax on beautiful beaches, explore lush rice terraces, and experience Balinese culture.",
    budget: "$2,000",
    interests: ["Beach", "Culture", "Nature"],
    itinerary: [
      {
        day: 1,
        date: "Jan 5, 2024",
        activities: [
          { type: "attraction", name: "Ubud Monkey Forest", time: "10:00 AM", description: "Natural sanctuary home to over 700 monkeys." },
          { type: "restaurant", name: "Locavore", time: "1:00 PM", description: "Award-winning restaurant serving contemporary Indonesian cuisine." },
          { type: "accommodation", name: "Four Seasons Resort Bali", description: "Luxury resort overlooking the Ayung River Valley." }
        ]
      }
    ]
  }
};

// Activity icon mapping
const getActivityIcon = (type: string) => {
  switch (type) {
    case 'attraction': return <Camera className="text-blue-500" />;
    case 'restaurant': return <Utensils className="text-amber-500" />;
    case 'accommodation': return <Bed className="text-purple-500" />;
    default: return null;
  }
};

const TripDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate fetching trip data
    const fetchTrip = () => {
      try {
        setLoading(true);
        // This would normally be an API call
        const tripId = Number(id);
        if (tripData[tripId as keyof typeof tripData]) {
          setTrip(tripData[tripId as keyof typeof tripData]);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load trip details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrip();
  }, [id, toast]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading trip details...</p>
        </div>
      </div>
    );
  }
  
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-700 mb-4">Trip not found</p>
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add to Itinerary</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="relative h-64 sm:h-80">
            <img 
              src={trip.image}
              alt={trip.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
              <span className={`mb-2 px-3 py-1 rounded-full text-xs font-medium self-start ${
                trip.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                trip.status === 'planning' ? 'bg-amber-100 text-amber-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </span>
              <h1 className="text-white text-3xl font-bold">{trip.destination}</h1>
              <div className="flex items-center text-white/90 space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{trip.dateRange}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{trip.days} days</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-700 mb-4">{trip.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Budget</p>
                <p className="text-lg font-semibold">{trip.budget}</p>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="text-lg font-semibold">{trip.days} days</p>
              </div>
              
              <div className="border border-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Interests</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {trip.interests.map((interest: string) => (
                    <span key={interest} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="itinerary" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="agent-assist">AI Agent Assist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="itinerary" className="space-y-6">
            {trip.itinerary.map((day: any) => (
              <Card key={day.day} className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Day {day.day}</CardTitle>
                      <CardDescription>{day.date}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Plus className="h-3 w-3" />
                      <span>Add</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {day.activities.map((activity: any, index: number) => (
                      <div key={index} className="flex">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="rounded-full p-2 bg-gray-100">
                            {getActivityIcon(activity.type)}
                          </div>
                          {index < day.activities.length - 1 && (
                            <div className="h-full w-px bg-gray-200 my-1"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="bg-white rounded-lg p-4 border border-gray-100">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">{activity.name}</h4>
                                {activity.time && (
                                  <p className="text-sm text-gray-500 flex items-center mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {activity.time}
                                  </p>
                                )}
                              </div>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                                {activity.type}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mt-2">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Local Recommendations</CardTitle>
                <CardDescription>Top rated places to visit based on your interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trip.interests.map((interest: string) => (
                    <div key={interest} className="border border-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">{interest} Recommendations</h3>
                      <p className="text-sm text-gray-500">
                        AI-powered recommendations based on your {interest.toLowerCase()} interests will appear here.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">See more recommendations</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="agent-assist">
            <Card>
              <CardHeader>
                <CardTitle>AI Travel Agent</CardTitle>
                <CardDescription>Your personal AI travel assistant powered by Fetch.ai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-blue-600"
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
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Travel AI Agent</p>
                      <p className="text-gray-700 mt-1">
                        Hello! I'm your AI travel assistant for your trip to {trip.destination}. 
                        Based on your interests in {trip.interests.join(', ')}, I can help you find 
                        the best places to visit, eat, and stay. What would you like help with today?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-blue-600"
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
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Travel AI Agent</p>
                      <p className="text-gray-700 mt-1">
                        I've analyzed your itinerary and noticed you have some free time in the 
                        evenings. Would you like me to suggest some nightlife options or 
                        cultural activities based on your interests?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg p-3 pr-12 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ask your AI travel agent anything..."
                  ></textarea>
                  <button className="absolute right-3 bottom-3 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripDetails;
