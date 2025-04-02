
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { MapPin, Compass, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 text-center">
        <div className="mb-6 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <MapPin className="w-64 h-64 text-travel-primary" />
          </div>
          <div className="relative">
            <Compass className="h-24 w-24 text-travel-primary mx-auto mb-2 animate-pulse" />
            <h1 className="text-7xl font-bold text-travel-dark">404</h1>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-travel-dark mb-3">Destination Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          It seems you've wandered off the map! The page you're looking for doesn't exist or has been moved to a new location.
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/" className="flex items-center justify-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Return Home</span>
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/destinations" className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Explore Destinations</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild className="w-full">
            <Link to="/dashboard" className="flex items-center justify-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Go to Dashboard</span>
            </Link>
          </Button>
        </div>
        
        <div className="mt-10 text-sm text-gray-500">
          <p>Need assistance planning your journey?</p>
          <p>Our AI travel agents are ready to help.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
