
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Calendar,
  PlusCircle,
  MapPin,
  Clock,
  CreditCard,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-travel-primary" />
            <span className="font-display text-xl font-bold text-travel-dark">WanderVerse</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Main
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center space-x-3 text-travel-primary font-medium p-2 rounded-lg bg-travel-primary/10">
                  <Calendar className="h-5 w-5" />
                  <span>My Trips</span>
                </Link>
              </li>
              <li>
                <Link to="/explore" className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Search className="h-5 w-5" />
                  <span>Explore</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <button className="w-full flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}></div>
      )}
      
      {/* Mobile sidebar */}
      <aside className={`bg-white shadow-md w-64 fixed top-0 bottom-0 left-0 z-50 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="p-6 border-b flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-travel-primary" />
            <span className="font-display text-xl font-bold text-travel-dark">WanderVerse</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Same navigation as desktop */}
        <nav className="flex-grow p-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Main
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" onClick={toggleSidebar} className="flex items-center space-x-3 text-travel-primary font-medium p-2 rounded-lg bg-travel-primary/10">
                  <Calendar className="h-5 w-5" />
                  <span>My Trips</span>
                </Link>
              </li>
              <li>
                <Link to="/explore" onClick={toggleSidebar} className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Search className="h-5 w-5" />
                  <span>Explore</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" onClick={toggleSidebar} className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={toggleSidebar} className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <button className="w-full flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
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
          
          {/* Trip categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">All Trips</p>
                  <p className="text-2xl font-bold text-travel-dark">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Upcoming</p>
                  <p className="text-2xl font-bold text-travel-dark">1</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <MapPin className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Planning</p>
                  <p className="text-2xl font-bold text-travel-dark">1</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-travel-dark">1</p>
                </div>
              </div>
            </div>
          </div>
          
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelPlans.map((trip) => (
              <Link to={`/trip/${trip.id}`} key={trip.id} className="block">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 card-hover">
                  <div className="relative h-48">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trip.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                        trip.status === 'planning' ? 'bg-amber-100 text-amber-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-travel-dark mb-2">{trip.destination}</h3>
                    <div className="flex items-center text-gray-500 space-x-4 text-sm">
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
              </Link>
            ))}
            
            {/* Create new trip card */}
            <Link to="/create-trip">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 h-full flex items-center justify-center p-6 card-hover">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-full p-6 inline-flex mb-4">
                    <PlusCircle className="h-8 w-8 text-travel-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-travel-dark">Create New Trip</h3>
                  <p className="text-gray-500 mt-2">Plan your next adventure</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
