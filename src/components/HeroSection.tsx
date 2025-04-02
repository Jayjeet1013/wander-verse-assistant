
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen pt-24 section-padding">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6">
          <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center space-x-2 w-fit">
            <span className="bg-travel-accent text-white text-xs px-2 py-1 rounded-full">New</span>
            <span className="text-sm font-medium text-travel-dark">AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-travel-dark leading-tight">
            Discover the world with <span className="text-travel-primary">AI agents</span> by your side
          </h1>
          
          <p className="text-lg text-gray-700 md:pr-12">
            WanderVerse uses advanced AI to create personalized travel plans, recommend attractions, and help you navigate like a local.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/travel-assistant">
            <Button className="btn-primary flex items-center justify-center space-x-2 h-12">
              <span>Start Planning</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            </Link>
            <Link to="/about">
            <Button variant="outline" className="btn-outline h-12">
              Learn more
            </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <p className="text-travel-primary text-2xl font-bold">100+</p>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-travel-primary text-2xl font-bold">50K+</p>
              <p className="text-sm text-gray-600">Happy travelers</p>
            </div>
            <div className="text-center">
              <p className="text-travel-primary text-2xl font-bold">24/7</p>
              <p className="text-sm text-gray-600">AI assistance</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="glass-card p-6 rounded-3xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
              alt="Scenic mountain landscape" 
              className="w-full h-80 object-cover rounded-2xl"
            />
            
            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-travel-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-travel-dark">Destination Insights</h3>
                  <p className="text-sm text-gray-600">Get recommendations based on your interests and preferences.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Calendar className="h-6 w-6 text-travel-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-travel-dark">Smart Itineraries</h3>
                  <p className="text-sm text-gray-600">AI-generated plans optimized for your time and budget.</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-travel-accent rounded-full p-4 shadow-lg animate-bounce-light">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-3.08"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <rect x="12" y="11" width="10" height="10" rx="2" ry="2"></rect>
                <circle cx="17" cy="16" r="2"></circle>
                <path d="M15 14v4"></path>
                <path d="M19 14v4"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
