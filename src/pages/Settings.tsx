
import { useState } from "react";
import { Menu, Bell, Shield, CreditCard, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully."
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was a problem signing out.",
        variant: "destructive"
      });
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
            <h1 className="text-xl font-bold text-travel-dark">Settings</h1>
            <div className="w-6"></div>
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">Account Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
          </div>
          
          {/* Settings tabs */}
          <Tabs defaultValue="account" className="mt-6">
            <TabsList className="mb-8">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={user?.user_metadata?.full_name || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
                      <p className="text-xs text-gray-500">To change your email, contact support</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, Country" defaultValue="San Francisco, USA" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself and your travel interests"
                      defaultValue="Passionate traveler with a love for experiencing new cultures and adventures."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america-los_angeles">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-los_angeles">Pacific Time (US & Canada)</SelectItem>
                        <SelectItem value="america-new_york">Eastern Time (US & Canada)</SelectItem>
                        <SelectItem value="europe-london">London</SelectItem>
                        <SelectItem value="europe-paris">Paris</SelectItem>
                        <SelectItem value="asia-tokyo">Tokyo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveSettings} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Log out from all devices</h4>
                      <p className="text-gray-500 text-sm">This will end all your active sessions</p>
                    </div>
                    <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                      Log Out Everywhere
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Delete account</h4>
                      <p className="text-gray-500 text-sm">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="trip-updates">Trip updates</Label>
                        <p className="text-sm text-muted-foreground">Receive emails about changes to your trips</p>
                      </div>
                      <Switch id="trip-updates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="travel-deals">Travel deals</Label>
                        <p className="text-sm text-muted-foreground">Get notified about special offers and discounts</p>
                      </div>
                      <Switch id="travel-deals" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="destination-news">Destination news</Label>
                        <p className="text-sm text-muted-foreground">Updates about destinations you're interested in</p>
                      </div>
                      <Switch id="destination-news" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="account-security">Account security</Label>
                        <p className="text-sm text-muted-foreground">Important security alerts about your account</p>
                      </div>
                      <Switch id="account-security" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Push Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-trip-updates">Trip reminders</Label>
                        <p className="text-sm text-muted-foreground">Reminders about upcoming trips and activities</p>
                      </div>
                      <Switch id="push-trip-updates" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-messages">Messages</Label>
                        <p className="text-sm text-muted-foreground">Notifications when you receive new messages</p>
                      </div>
                      <Switch id="push-messages" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Password</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full md:w-auto">Change Password</Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Two-Factor Authentication</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border flex items-start space-x-4">
                      <Shield className="h-10 w-10 text-travel-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Enhance your account security</h4>
                        <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                        <Button variant="outline" className="mt-4">Enable 2FA</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Session Management</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <h4 className="font-medium">Active Sessions</h4>
                      <p className="text-sm text-gray-600 mt-1">You are currently logged in on 2 devices</p>
                      <Button variant="outline" className="mt-4 text-amber-600 border-amber-200 hover:bg-amber-50">
                        Log Out All Devices
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Saved Payment Methods</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border flex items-start space-x-4">
                      <CreditCard className="h-10 w-10 text-travel-primary flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">No payment methods saved</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Add a payment method to make bookings easier</p>
                        <Button variant="outline" className="mt-4">Add Payment Method</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Billing Address</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="address-line1">Address Line 1</Label>
                        <Input id="address-line1" placeholder="Street address" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address-line2">Address Line 2</Label>
                        <Input id="address-line2" placeholder="Apt, suite, etc. (optional)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select defaultValue="us">
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Billing Information"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Logout button for mobile */}
          <div className="mt-8 md:hidden">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
