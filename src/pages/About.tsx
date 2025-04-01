
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Code, Globe, Bot, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-travel-primary text-white py-24 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About WanderVerse
              </h1>
              <p className="text-xl mb-8">
                We're building the future of travel planning with AI agents and the power of Fetch.ai's uAgents framework.
              </p>
              <Link to="/signin">
                <Button className="bg-white text-travel-primary hover:bg-white/90 px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2">
                  <span>Join Our Community</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Mission section */}
        <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-travel-dark mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At WanderVerse, we believe that travel should be transformative, not tedious. Our mission is to eliminate the stress of planning so you can focus on the joy of exploration.
                </p>
                <p className="text-gray-600 mb-6">
                  By harnessing the power of AI agents and the Agentverse ecosystem, we're creating a platform that understands your preferences, adapts to your needs, and connects you with meaningful experiences around the world.
                </p>
                <p className="text-gray-600">
                  We're not just building another travel app — we're reimagining how technology can enhance the entire journey, from dreaming and planning to experiencing and sharing.
                </p>
              </div>
              <div className="relative">
                <div className="glass-card p-6 rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1517022812141-23620dba5c23" 
                    alt="Scenic landscape" 
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-travel-secondary rounded-full p-4 shadow-lg">
                  <Globe className="h-8 w-8 text-travel-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="py-16 px-6 md:px-12 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-travel-dark mb-4">Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're a passionate team of travel enthusiasts, AI specialists, and software engineers dedicated to transforming how people explore the world.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                  alt="Team member" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-travel-dark">Sophia Chen</h3>
                <p className="text-gray-500 mb-3">CEO & Founder</p>
                <p className="text-gray-600">
                  Travel tech pioneer with a vision to make AI-assisted travel planning accessible to everyone.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" 
                  alt="Team member" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-travel-dark">Alex Martinez</h3>
                <p className="text-gray-500 mb-3">CTO</p>
                <p className="text-gray-600">
                  AI researcher specializing in multi-agent systems and Fetch.ai's uAgents framework.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956" 
                  alt="Team member" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-travel-dark">Maya Johnson</h3>
                <p className="text-gray-500 mb-3">Head of Product</p>
                <p className="text-gray-600">
                  Former travel industry executive with a passion for creating intuitive user experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tech stack section */}
        <section className="py-16 px-6 md:px-12 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-travel-dark mb-4">Our Technology</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                WanderVerse is built on cutting-edge technologies that enable our AI agents to provide personalized, intelligent travel assistance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <div className="bg-travel-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-travel-primary" />
                </div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2">Fetch.ai uAgents</h3>
                <p className="text-gray-600">
                  Our core agent framework that powers intelligent decision-making and autonomous actions.
                </p>
              </div>
              
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <div className="bg-travel-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-travel-primary" />
                </div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2">Agentverse</h3>
                <p className="text-gray-600">
                  A collaborative ecosystem that connects our agents with other specialized travel services.
                </p>
              </div>
              
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <div className="bg-travel-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-travel-primary" />
                </div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2">React & Next.js</h3>
                <p className="text-gray-600">
                  Modern frontend technologies providing a fast, responsive user experience.
                </p>
              </div>
              
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <div className="bg-travel-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-travel-primary" />
                </div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2">Supabase</h3>
                <p className="text-gray-600">
                  Our database and authentication system, ensuring your travel data is accessible and secure.
                </p>
              </div>
              
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <div className="bg-travel-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-travel-primary" />
                </div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2">Clerk</h3>
                <p className="text-gray-600">
                  Secure user authentication and management for a seamless login experience.
                </p>
              </div>
              
              <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6">
                <div className="bg-travel-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-travel-primary" />
                </div>
                <h3 className="text-xl font-semibold text-travel-dark mb-2">Data Security</h3>
                <p className="text-gray-600">
                  Enterprise-grade security measures to protect your personal and travel information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
