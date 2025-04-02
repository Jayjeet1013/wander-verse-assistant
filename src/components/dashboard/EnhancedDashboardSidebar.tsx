
import { useLocation } from "react-router-dom";
import { 
  Home, 
  Globe, 
  User, 
  Settings as SettingsIcon, 
  Menu, 
  LogOut,
  Compass,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardSidebarProps {
  isMobile?: boolean;
  toggleSidebar?: () => void;
}

const EnhancedDashboardSidebar = ({ isMobile, toggleSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      name: "Explore", 
      href: "/explore", 
      icon: <Compass className="h-5 w-5" /> 
    },
    { 
      name: "AI Travel Assistant", 
      href: "/travel-assistant", 
      icon: <Sparkles className="h-5 w-5" /> 
    },
    { 
      name: "Profile", 
      href: "/profile", 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      name: "Settings", 
      href: "/settings", 
      icon: <SettingsIcon className="h-5 w-5" /> 
    }
  ];
  
  return (
    <div className="h-full flex flex-col">
      {isMobile && (
        <div className="p-4 flex justify-between items-center border-b">
          <div className="font-bold text-travel-primary text-xl">TravelAI</div>
          <button onClick={toggleSidebar} className="text-gray-500">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      )}
      
      <div className={`${isMobile ? '' : 'p-4 border-b'}`}>
        {!isMobile && (
          <div className="font-bold text-travel-primary text-xl mb-6">TravelAI</div>
        )}
        
        <div className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start ${location.pathname === item.href ? 'bg-travel-primary/10 text-travel-primary' : ''}`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-500"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Log Out</span>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedDashboardSidebar;
