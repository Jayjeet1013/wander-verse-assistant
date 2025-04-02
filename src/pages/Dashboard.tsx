
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TripStats from "@/components/dashboard/TripStats";
import TripsList from "@/components/dashboard/TripsList";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { TripCardProps } from "@/components/dashboard/TripCard";
import { format, parseISO, differenceInDays } from "date-fns";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trips, setTrips] = useState<TripCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    planning: 0,
    completed: 0
  });
  
  const { user } = useAuth();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!user) return;
    
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        // Type assertion to make TypeScript happy - let Supabase handle the actual query
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) {
          // Using type assertion to work with the trip data
          const tripsData = data as any[];
          
          const formattedTrips = tripsData.map(trip => {
            const startDate = parseISO(trip.start_date);
            const endDate = parseISO(trip.end_date);
            const days = differenceInDays(endDate, startDate) + 1; // +1 to include both start and end day
            
            return {
              id: trip.id,
              destination: trip.destination,
              dateRange: `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`,
              image: trip.image,
              status: trip.status,
              days: days
            };
          });
          
          setTrips(formattedTrips);
          
          // Calculate stats
          const statsCounts = {
            total: formattedTrips.length,
            upcoming: formattedTrips.filter(t => t.status === 'upcoming').length,
            planning: formattedTrips.filter(t => t.status === 'planning').length,
            completed: formattedTrips.filter(t => t.status === 'completed').length
          };
          
          setStats(statsCounts);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
        toast({
          title: "Error loading trips",
          description: "There was a problem loading your trips. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrips();
  }, [user, toast]);

  // Filter trips based on search query
  const filteredTrips = trips.filter(trip => 
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside className={`bg-white shadow-md w-64 hidden md:flex flex-col h-screen sticky top-0`}>
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
            <h1 className="text-xl font-bold text-travel-dark">My Trips</h1>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">My Trips</h1>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search trips..."
                  className="pl-10 pr-4 py-2 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link to="/create-trip">
                <Button className="btn-primary flex items-center space-x-2">
                  <PlusCircle className="h-5 w-5" />
                  <span>New Trip</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Trip statistics */}
          <TripStats 
            total={stats.total}
            upcoming={stats.upcoming}
            planning={stats.planning}
            completed={stats.completed}
          />
          
          {/* Mobile new trip button */}
          <div className="md:hidden mb-6">
            <Link to="/create-trip">
              <Button className="btn-primary w-full flex items-center justify-center space-x-2">
                <PlusCircle className="h-5 w-5" />
                <span>New Trip</span>
              </Button>
            </Link>
          </div>
          
          {/* Loading state */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading your trips...</p>
            </div>
          ) : (
            /* Trip list */
            <TripsList trips={filteredTrips} />
          )}
          
          {/* Empty state */}
          {!isLoading && trips.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-10 text-center">
              <div className="mb-4">
                <PlusCircle className="h-12 w-12 text-gray-300 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-travel-dark mb-2">No trips yet</h3>
              <p className="text-gray-500 mb-6">Create your first trip to get started</p>
              <Link to="/create-trip">
                <Button className="btn-primary">Create New Trip</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
