
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "WanderVerse made planning my trip to Japan so much easier! The AI recommended places I never would have found on my own, and the itinerary was perfectly balanced.",
    rating: 5
  },
  {
    name: "David Chen",
    location: "Toronto, Canada",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    text: "I was skeptical about AI travel planning, but WanderVerse blew me away. The restaurant recommendations were spot-on for my family's preferences.",
    rating: 5
  },
  {
    name: "Maria Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    text: "The collaboration with other travel agents in Agentverse gave me access to local experiences I couldn't find anywhere else. Truly impressive technology!",
    rating: 4
  }
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-travel-dark mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from travelers who have experienced the power of our AI-assisted travel planning.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl card-hover"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-travel-accent fill-travel-accent' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-travel-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
