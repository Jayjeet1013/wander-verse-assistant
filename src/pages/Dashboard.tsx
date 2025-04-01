
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TripStats from "@/components/dashboard/TripStats";
import TripsList from "@/components/dashboard/TripsList";

// Sample travel plans
const travelPlans = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    dateRange: "Oct 15 - Oct 25, 2023",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
    status: "completed",
    days: 10
  },
  {
    id: 2,
    destination: "Paris, France",
    dateRange: "Dec 10 - Dec 18, 2023",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    status: "upcoming",
    days: 8
  },
  {
    id: 3,
    destination: "Bali, Indonesia",
    dateRange: "Jan 5 - Jan 15, 2024",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
    status: "planning",
    days: 10
  }
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
          <TripStats />
          
          {/* Mobile new trip button */}
          <div className="md:hidden mb-6">
            <Link to="/create-trip">
              <Button className="btn-primary w-full flex items-center justify-center space-x-2">
                <PlusCircle className="h-5 w-5" />
                <span>New Trip</span>
              </Button>
            </Link>
          </div>
          
          {/* Trip list */}
          <TripsList trips={travelPlans} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
