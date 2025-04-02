
import { useState } from "react";
import { Menu, User, Mail, MapPin, Calendar, Clock, Flag, Globe, Mountain, Landmark, Camera, Moon, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Sample travel stats and badges
const travelStats = [
  { label: "Countries", value: 12 },
  { label: "Cities", value: 47 },
  { label: "Total Trips", value: 24 },
  { label: "Travel Days", value: 187 }
];

const achievementBadges = [
  { name: "Globetrotter", description: "Visited 10+ countries", icon: Globe },
  { name: "Adventure Seeker", description: "Completed 5 adventure activities", icon: Mountain },
  { name: "Cultural Explorer", description: "Explored 20+ historical sites", icon: Landmark },
  { name: "Photo Master", description: "Shared 50+ travel photos", icon: Camera },
  { name: "Night Owl", description: "Experienced nightlife in 8+ cities", icon: Moon },
  { name: "Foodie", description: "Tried local cuisine in 15+ places", icon: Utensils }
];

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleUpdateProfile = async () => {
    setIsLoading(true);
    
    try {
      // This would typically update user profile data
      await supabase
        .from('profiles')
        .update({ 
          updated_at: new Date().toISOString() 
        })
        .eq('id', user?.id);
        
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="max-w-5xl mx-auto">
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-8 md:hidden">
            <button onClick={toggleSidebar} className="text-gray-500">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-travel-dark">Profile</h1>
            <div className="w-6"></div>
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">My Profile</h1>
          </div>
          
          {/* Profile header card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold">{user?.user_metadata?.full_name || 'Traveler'}</h2>
                  <div className="flex flex-col md:flex-row gap-4 mt-2 text-gray-600 items-center md:items-start">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2 justify-center md:justify-start">
                    <Button onClick={handleUpdateProfile} disabled={isLoading}>
                      {isLoading ? "Updating..." : "Edit Profile"}
                    </Button>
                    <Button variant="outline">Share Profile</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Profile content tabs */}
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trips">My Trips</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* About me */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Passionate traveler with a love for experiencing new cultures, food, and adventures. 
                      Always planning the next journey and collecting memories from around the world.
                    </p>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Travel Preferences</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Adventure</Badge>
                        <Badge variant="secondary">Cultural</Badge>
                        <Badge variant="secondary">Food Tourism</Badge>
                        <Badge variant="secondary">Photography</Badge>
                        <Badge variant="secondary">Historical Sites</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Travel stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {travelStats.map((stat, i) => (
                        <div key={i} className="bg-travel-primary/10 p-4 rounded-lg">
                          <h3 className="text-2xl font-bold text-travel-primary">{stat.value}</h3>
                          <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>2023 Travel Goal</span>
                        <span>5/8 countries</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-travel-primary h-2 rounded-full" style={{ width: '62.5%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Upcoming trips */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Upcoming Trips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-travel-primary/10 p-3 rounded-full">
                          <Flag className="h-5 w-5 text-travel-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Tokyo, Japan</h4>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Jun 15 - Jun 29, 2023</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>14 days</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">Cultural</Badge>
                            <Badge variant="outline">Food</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-travel-primary/10 p-3 rounded-full">
                          <Flag className="h-5 w-5 text-travel-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Barcelona, Spain</h4>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Aug 3 - Aug 10, 2023</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>7 days</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">Beach</Badge>
                            <Badge variant="outline">Architecture</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Achievements</CardTitle>
                  <CardDescription>Collect badges by experiencing the world</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievementBadges.map((badge, i) => (
                      <div key={i} className="bg-white border rounded-lg p-4 flex flex-col items-center text-center">
                        <div className="bg-travel-primary/10 p-4 rounded-full mb-3">
                          <badge.icon className="h-8 w-8 text-travel-primary" />
                        </div>
                        <h4 className="font-medium">{badge.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trips">
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Trip history will appear here</h3>
                <p className="text-gray-500 mt-2 mb-6">Keep track of all your adventures in one place</p>
                <Button>Create Your First Trip</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">You haven't written any reviews yet</h3>
                <p className="text-gray-500 mt-2 mb-6">Share your experiences to help other travelers</p>
                <Button>Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
