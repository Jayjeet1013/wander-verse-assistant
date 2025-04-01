
import { Bot, Map, Hotel, Utensils, Navigation, Users } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-10 w-10 text-travel-primary" />,
    title: "AI Travel Agents",
    description: "Powered by Fetch.ai's uAgents framework, our AI assistants work together to plan your perfect trip."
  },
  {
    icon: <Map className="h-10 w-10 text-travel-primary" />,
    title: "Attraction Recommendations",
    description: "Discover hidden gems and popular spots based on your interests and travel style."
  },
  {
    icon: <Hotel className="h-10 w-10 text-travel-primary" />,
    title: "Accommodation Search",
    description: "Find the perfect place to stay that matches your budget and preferences."
  },
  {
    icon: <Utensils className="h-10 w-10 text-travel-primary" />,
    title: "Restaurant Suggestions",
    description: "Eat like a local with personalized restaurant recommendations and cuisine options."
  },
  {
    icon: <Navigation className="h-10 w-10 text-travel-primary" />,
    title: "Navigation Assistance",
    description: "Get directions, transportation options, and travel times between destinations."
  },
  {
    icon: <Users className="h-10 w-10 text-travel-primary" />,
    title: "Collaborative Planning",
    description: "Share and plan trips with friends and family, with everyone's preferences considered."
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-travel-dark mb-4">
            Powered by AI Agents
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform leverages advanced AI agents that work together to create the perfect travel experience tailored just for you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl card-hover"
            >
              <div className="bg-travel-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-travel-dark mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
