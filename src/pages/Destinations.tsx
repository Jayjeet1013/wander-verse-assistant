
import { useState, useEffect } from "react";
import { Search, Map, Hotel, Utensils, Navigation, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  tags: string[];
}

const DESTINATIONS: Destination[] = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    description: "The City of Light offers iconic landmarks, world-class cuisine, and romantic atmosphere.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    tags: ["Romantic", "Cultural", "Food"]
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    description: "Ancient temples, traditional tea houses, and beautiful gardens showcase Japanese culture.",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
    tags: ["Historical", "Cultural", "Peaceful"]
  },
  {
    id: 3,
    name: "Barcelona",
    country: "Spain",
    description: "Gaudi's architecture, Mediterranean beaches, and vibrant street life define this Catalan capital.",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    tags: ["Beach", "Architecture", "Nightlife"]
  },
  {
    id: 4,
    name: "Cape Town",
    country: "South Africa",
    description: "Stunning landscapes, diverse wildlife, and rich cultural heritage at the tip of Africa.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    tags: ["Nature", "Wildlife", "Adventure"]
  },
  {
    id: 5,
    name: "New York City",
    country: "USA",
    description: "The Big Apple offers world-famous attractions, diverse neighborhoods, and endless entertainment.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    tags: ["Urban", "Shopping", "Nightlife"]
  },
  {
    id: 6,
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with lush rice terraces, spiritual temples, and pristine beaches.",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    tags: ["Beach", "Spiritual", "Relaxation"]
  }
];

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(DESTINATIONS);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    let results = DESTINATIONS;
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by tab category
    if (activeTab !== "all") {
      results = results.filter(dest => 
        dest.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase())
      );
    }
    
    setFilteredDestinations(results);
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <div className="bg-travel-primary/10 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-travel-dark mb-4">Explore Destinations</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover incredible places around the world and plan your perfect trip with personalized AI assistance.
            </p>
            
            <div className="mt-10 max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search destinations, activities, or interests..." 
                className="pl-10 py-6 text-lg rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="beach">Beach</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
              <TabsTrigger value="adventure">Adventure</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
              <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Destinations grid */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{destination.name}</CardTitle>
                        <CardDescription>{destination.country}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {destination.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="inline-block bg-travel-primary/10 text-travel-primary text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{destination.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      Explore
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Plan Trip
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No destinations match your search criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        {/* Travel Services */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-travel-dark text-center mb-16">Our Travel Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-travel-primary/10 p-4 rounded-full mb-4">
                    <Map className="h-8 w-8 text-travel-primary" />
                  </div>
                  <CardTitle>Personalized Itineraries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">AI-powered custom travel plans based on your preferences, budget, and schedule.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-travel-primary/10 p-4 rounded-full mb-4">
                    <Hotel className="h-8 w-8 text-travel-primary" />
                  </div>
                  <CardTitle>Accommodation Finder</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Discover perfect places to stay that match your style and requirements.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-travel-primary/10 p-4 rounded-full mb-4">
                    <Utensils className="h-8 w-8 text-travel-primary" />
                  </div>
                  <CardTitle>Local Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Get insider tips for the best restaurants, attractions, and hidden gems.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-travel-primary/10 p-4 rounded-full mb-4">
                    <Navigation className="h-8 w-8 text-travel-primary" />
                  </div>
                  <CardTitle>Navigation Assistance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">Never get lost with our smart navigation and transportation guidance.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" className="bg-travel-secondary hover:bg-travel-secondary/90">
                Start Planning Your Journey
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Destinations;
