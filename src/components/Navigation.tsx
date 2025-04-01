
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, LogIn } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full py-4 px-6 md:px-12 lg:px-16 bg-white/90 backdrop-blur-md fixed top-0 left-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-travel-primary" />
          <span className="font-display text-xl font-bold text-travel-dark">WanderVerse</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-travel-dark hover:text-travel-primary transition-colors">
            Home
          </Link>
          <Link to="/destinations" className="text-travel-dark hover:text-travel-primary transition-colors">
            Destinations
          </Link>
          <Link to="/about" className="text-travel-dark hover:text-travel-primary transition-colors">
            About
          </Link>
          <Link to="/signin">
            <Button className="btn-primary flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-travel-dark" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-16 left-0 w-full p-6 shadow-md animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-travel-dark hover:text-travel-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className="text-travel-dark hover:text-travel-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              Destinations
            </Link>
            <Link 
              to="/about" 
              className="text-travel-dark hover:text-travel-primary transition-colors py-2"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link to="/signin" onClick={toggleMenu}>
              <Button className="btn-primary w-full flex items-center justify-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
