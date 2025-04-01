
import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-travel-dark text-white">
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-6 w-6 text-travel-secondary" />
              <span className="font-display text-xl font-bold text-white">WanderVerse</span>
            </div>
            <p className="text-gray-300 mb-6">
              AI-powered travel planning using Fetch.ai's uAgents and Agentverse for a seamless, personalized journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Agent Features</h3>
            <ul className="space-y-4">
              <li className="text-gray-300">Travel Planning</li>
              <li className="text-gray-300">Attraction Recommendations</li>
              <li className="text-gray-300">Restaurant Suggestions</li>
              <li className="text-gray-300">Accommodation Search</li>
              <li className="text-gray-300">Navigation Assistance</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-travel-secondary mt-0.5" />
                <span className="text-gray-300">123 AI Avenue, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-travel-secondary" />
                <span className="text-gray-300">info@wanderverse.ai</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-travel-secondary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} WanderVerse. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
