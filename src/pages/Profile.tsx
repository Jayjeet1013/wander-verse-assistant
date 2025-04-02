import { useState } from "react";
import { Menu } from "lucide-react";
import EnhancedDashboardSidebar from "@/components/dashboard/EnhancedDashboardSidebar";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
            <h1 className="text-xl font-bold text-travel-dark">Profile</h1>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">Profile</h1>
          </div>
          
          {/* Profile content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-lg font-semibold text-travel-dark mb-4">User Profile</h2>
            <p className="text-gray-500">This is where user profile information will be displayed.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
