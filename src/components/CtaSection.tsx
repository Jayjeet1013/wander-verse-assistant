import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="hero-gradient section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-12 rounded-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-travel-dark mb-6">
            Ready to Transform Your Travel Experience?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Join WanderVerse today and discover the power of AI-assisted travel
            planning with connected agents in the Agentverse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary flex items-center justify-center space-x-2 h-12">
              <span>Get Started For Free</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="btn-outline h-12">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
