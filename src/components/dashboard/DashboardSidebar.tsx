import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Calendar,
  Search,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isMobile?: boolean;
  toggleSidebar?: () => void;
}

const DashboardSidebar = ({
  isMobile = false,
  toggleSidebar,
}: SidebarProps) => {
  return (
    <>
      <div className="p-6 border-b flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-travel-primary" />
          <span className="font-display text-xl font-bold text-travel-dark">
            WanderVerse
          </span>
        </Link>
        {isMobile && toggleSidebar && (
          <button onClick={toggleSidebar} className="md:hidden text-gray-500">
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="flex-grow p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
            Main
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                onClick={isMobile ? toggleSidebar : undefined}
                className="flex items-center space-x-3 text-travel-primary font-medium p-2 rounded-lg bg-travel-primary/10"
              >
                <Calendar className="h-5 w-5" />
                <span>My Trips</span>
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                onClick={isMobile ? toggleSidebar : undefined}
                className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
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
              <Link
                to="/profile"
                onClick={isMobile ? toggleSidebar : undefined}
                className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={isMobile ? toggleSidebar : undefined}
                className="flex items-center space-x-3 text-gray-700 font-medium p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
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
    </>
  );
};

export default DashboardSidebar;
