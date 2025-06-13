
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ChevronRight, Sparkles, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-gradient min-h-screen pt-24 section-padding relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 animate-float-slow">
          <div className="w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float-medium">
          <div className="w-32 h-32 bg-travel-accent/20 rounded-full blur-2xl"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float-fast">
          <div className="w-24 h-24 bg-travel-secondary/30 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="flex flex-col space-y-6 animate-slide-in-left">
          <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center space-x-2 w-fit animate-bounce-in">
            <span className="bg-travel-accent text-white text-xs px-2 py-1 rounded-full animate-pulse-soft">New</span>
            <span className="text-sm font-medium text-travel-dark">AI-Powered Travel Planning</span>
            <Sparkles className="h-4 w-4 text-travel-accent animate-spin-slow" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-travel-dark leading-tight animate-fade-in-up">
            Discover the world with{" "}
            <span className="text-travel-primary animate-gradient-text bg-gradient-to-r from-travel-primary via-travel-secondary to-travel-accent bg-clip-text text-transparent bg-300% animate-gradient-shift">
              AI agents
            </span>{" "}
            by your side
          </h1>
          
          <p className="text-lg text-gray-700 md:pr-12 animate-fade-in-up animation-delay-200">
            WanderVerse uses advanced AI to create personalized travel plans, recommend attractions, and help you navigate like a local.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up animation-delay-400">
            <Link to="/travel-assistant">
              <Button className="btn-primary flex items-center justify-center space-x-2 h-12 group hover:scale-105 transition-all duration-300 hover:shadow-lg">
                <span>Start Planning</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="btn-outline h-12 hover:scale-105 transition-all duration-300">
                Learn more
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-6 animate-fade-in-up animation-delay-600">
            <div className="text-center group hover:scale-110 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Globe className="h-6 w-6 text-travel-primary mr-2 animate-spin-slow" />
                <p className="text-travel-primary text-2xl font-bold">100+</p>
              </div>
              <p className="text-sm text-gray-600">Destinations</p>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-travel-primary mr-2 animate-pulse-soft" />
                <p className="text-travel-primary text-2xl font-bold">50K+</p>
              </div>
              <p className="text-sm text-gray-600">Happy travelers</p>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-travel-primary mr-2 animate-twinkle" />
                <p className="text-travel-primary text-2xl font-bold">24/7</p>
              </div>
              <p className="text-sm text-gray-600">AI assistance</p>
            </div>
          </div>
        </div>
        
        <div className="relative animate-slide-in-right">
          <div className="glass-card p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 animate-float-gentle">
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
              alt="Scenic mountain landscape" 
              className="w-full h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
            
            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <MapPin className="h-6 w-6 text-travel-primary mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="font-semibold text-travel-dark">Destination Insights</h3>
                  <p className="text-sm text-gray-600">Get recommendations based on your interests and preferences.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-travel-primary mt-1 group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="font-semibold text-travel-dark">Smart Itineraries</h3>
                  <p className="text-sm text-gray-600">AI-generated plans optimized for your time and budget.</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-travel-accent rounded-full p-4 shadow-lg animate-bounce-light hover:animate-spin transition-all duration-300">
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
                className="hover:scale-110 transition-transform duration-300"
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

          {/* Floating elements around the card */}
          <div className="absolute -top-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 animate-float-slow">
            <Sparkles className="h-4 w-4 text-travel-accent" />
          </div>
          <div className="absolute top-10 -right-8 bg-travel-secondary/20 backdrop-blur-sm rounded-full p-3 animate-float-medium">
            <Globe className="h-5 w-5 text-travel-primary" />
          </div>
          <div className="absolute -bottom-8 left-8 bg-travel-accent/20 backdrop-blur-sm rounded-full p-2 animate-float-fast">
            <Users className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
