
import { useState } from "react";
import { Menu, Save, User, Bell, Palette, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import EnhancedDashboardSidebar from "@/components/dashboard/EnhancedDashboardSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// Form schema for account settings
const accountFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required to set a new password",
  path: ["currentPassword"],
}).refine(data => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Form schema for notification settings
const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  tripReminders: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  appNotifications: z.boolean().default(true),
});

// Form schema for appearance settings
const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  compactView: z.boolean().default(false),
});

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();

  // Account form
  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: "user@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Notifications form
  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      tripReminders: true, 
      marketingEmails: false,
      appNotifications: true,
    },
  });

  // Appearance form
  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
      compactView: false,
    },
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onSubmitAccount = (data: z.infer<typeof accountFormSchema>) => {
    console.log("Account data:", data);
    toast({
      title: "Account settings updated",
      description: "Your account settings have been updated successfully.",
    });
  };

  const onSubmitNotifications = (data: z.infer<typeof notificationsFormSchema>) => {
    console.log("Notifications data:", data);
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  const onSubmitAppearance = (data: z.infer<typeof appearanceFormSchema>) => {
    console.log("Appearance data:", data);
    toast({
      title: "Appearance settings updated",
      description: "Your appearance settings have been updated successfully.",
    });
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
            <h1 className="text-xl font-bold text-travel-dark">Settings</h1>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
          
          {/* Desktop header */}
          <div className="hidden md:block mb-8">
            <h1 className="text-2xl font-bold text-travel-dark">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account preferences and settings</p>
          </div>
          
          {/* Settings content */}
          <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 lg:grid-cols-4 gap-2 md:w-fit w-full">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account settings and change your password
                  </CardDescription>
                </CardHeader>
                <Form {...accountForm}>
                  <form onSubmit={accountForm.handleSubmit(onSubmitAccount)}>
                    <CardContent className="space-y-6">
                      <FormField
                        control={accountForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              This is the email address associated with your account.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Update your password to keep your account secure
                        </p>
                        
                        <div className="space-y-4">
                          <FormField
                            control={accountForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={accountForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={accountForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you want to be notified about your trips and updates
                  </CardDescription>
                </CardHeader>
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onSubmitNotifications)}>
                    <CardContent className="space-y-6">
                      <FormField
                        control={notificationsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive trip updates and notifications via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="tripReminders"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Trip Reminders</FormLabel>
                              <FormDescription>
                                Get reminded about upcoming trips and bookings
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Marketing Emails</FormLabel>
                              <FormDescription>
                                Receive promotional offers and travel deals
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationsForm.control}
                        name="appNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">App Notifications</FormLabel>
                              <FormDescription>
                                Receive in-app notifications about your trips
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Preferences
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize how WanderVerse looks for you
                  </CardDescription>
                </CardHeader>
                <Form {...appearanceForm}>
                  <form onSubmit={appearanceForm.handleSubmit(onSubmitAppearance)}>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <FormLabel>Theme</FormLabel>
                        <div className="grid grid-cols-3 gap-4">
                          <div
                            className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer ${
                              appearanceForm.watch("theme") === "light" 
                              ? "ring-2 ring-travel-primary bg-gray-50" 
                              : "hover:bg-gray-50"
                            }`}
                            onClick={() => appearanceForm.setValue("theme", "light")}
                          >
                            <div className="h-10 w-10 rounded-full bg-white border shadow-sm mb-2"></div>
                            <span className="text-sm font-medium">Light</span>
                          </div>
                          <div
                            className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer ${
                              appearanceForm.watch("theme") === "dark" 
                              ? "ring-2 ring-travel-primary bg-gray-50" 
                              : "hover:bg-gray-50"
                            }`}
                            onClick={() => appearanceForm.setValue("theme", "dark")}
                          >
                            <div className="h-10 w-10 rounded-full bg-gray-900 border mb-2"></div>
                            <span className="text-sm font-medium">Dark</span>
                          </div>
                          <div
                            className={`flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer ${
                              appearanceForm.watch("theme") === "system" 
                              ? "ring-2 ring-travel-primary bg-gray-50" 
                              : "hover:bg-gray-50"
                            }`}
                            onClick={() => appearanceForm.setValue("theme", "system")}
                          >
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-white to-gray-900 border mb-2"></div>
                            <span className="text-sm font-medium">System</span>
                          </div>
                        </div>
                        <FormDescription>
                          Choose a theme for your WanderVerse experience
                        </FormDescription>
                      </div>
                      
                      <FormField
                        control={appearanceForm.control}
                        name="compactView"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Compact View</FormLabel>
                              <FormDescription>
                                Use a more compact layout for trip listings
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Appearance
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">Active Sessions</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage devices and sessions where you're currently logged in
                    </p>
                    <Button variant="outline">Manage Sessions</Button>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">Data & Privacy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Manage your data and privacy settings
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline">Download My Data</Button>
                      <Button variant="outline" className="text-red-500 hover:text-red-600">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Settings;
