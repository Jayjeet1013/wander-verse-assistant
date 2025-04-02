
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Globe, MapPin, TrendingUp, Filter, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// Sample destinations data
const POPULAR_DESTINATIONS = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    rating: 4.8,
    tags: ["Beach", "Culture", "Relaxation"],
    description: "Tropical paradise with stunning beaches, lush rice terraces and ancient temples."
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    rating: 4.7,
    tags: ["Historical", "Culture", "Food"],
    description: "Experience traditional Japanese culture among centuries-old temples and gardens."
  },
  {
    id: 3,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1469796466635-455ede028aca",
    rating: 4.9,
    tags: ["Island", "Views", "Romantic"],
    description: "Stunning white-washed buildings perched on cliffs overlooking the Aegean Sea."
  },
  {
    id: 4,
    name: "Marrakech, Morocco",
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b",
    rating: 4.6,
    tags: ["Culture", "Markets", "Architecture"],
    description: "Vibrant markets, intricate architecture and rich cultural experiences."
  },
  {
    id: 5,
    name: "Queenstown, New Zealand",
    image: "https://images.unsplash.com/photo-1589307357824-56320ce71d1f",
    rating: 4.8,
    tags: ["Adventure", "Nature", "Mountains"],
    description: "Adventure capital surrounded by dramatic mountain landscapes and crystal-clear lakes."
  },
  {
    id: 6,
    name: "Barcelona, Spain",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4",
    rating: 4.7,
    tags: ["Architecture", "Beach", "Food"],
    description: "Stunning Gaudi architecture, Mediterranean beaches and world-class dining."
  }
];

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePlanTrip = (destinationName: string) => {
    // This would normally create a new trip draft with this destination
    navigate("/create-trip", { state: { destination: destinationName } });
  };

  // Filter destinations based on search query
  const filteredDestinations = POPULAR_DESTINATIONS.filter(
    destination => 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside className="bg-white shadow-md w-64 hidden md:flex flex-col h-screen sticky top-0">
        <DashboardSidebar />
      </aside>
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
      )}
      
      {/* Mobile sidebar */}
      <aside className={`bg-white shadow-md w-64 fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <DashboardSidebar isMobile toggleSidebar={toggleSidebar} />
      </aside>
      
      {/* Main content */}
      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <button onClick={toggleSidebar} className="text-gray-500">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-travel-dark">Explore</h1>
            <div className="w-6"></div>
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">Explore Destinations</h1>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search destinations..."
                  className="pl-10 pr-4 py-2 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="md:hidden relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search destinations..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category tabs */}
          <div className="mb-8">
            <Tabs defaultValue="popular">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Featured destinations */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-travel-dark">Featured Destinations</h2>
              <Button variant="link" className="text-travel-primary">View all</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map((destination) => (
                  <Card key={destination.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-travel-primary" />
                        <span className="text-xs font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{destination.name}</CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {destination.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="bg-travel-primary/10 text-travel-primary hover:bg-travel-primary/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm">{destination.description}</p>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className="gap-1">
                        <MapPin className="h-4 w-4" />
                        View
                      </Button>
                      <Button 
                        className="gap-1"
                        onClick={() => handlePlanTrip(destination.name)}
                      >
                        <Globe className="h-4 w-4" />
                        Plan Trip
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 flex items-center justify-center py-12">
                  <div className="text-center">
                    <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No destinations found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Travel tips */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-travel-dark">Travel Tips & Inspiration</h2>
              <Button variant="link" className="text-travel-primary">View all</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pack Like a Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Essential packing tips to maximize space and be prepared for any adventure.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-travel-primary">Read more</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget Travel Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">How to experience the world without breaking the bank - smart saving tips.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-travel-primary">Read more</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Photography Essentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">Capture incredible memories with these travel photography techniques.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0 text-travel-primary">Read more</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
