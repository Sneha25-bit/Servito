import { useState, useEffect } from "react";
import { DollarSign, Users, Shield, Lock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom"; 
const features = [
  {
    icon: DollarSign,
    title: "Budget-Based Requests",
    description: "Customers can post service requests with their budget, ensuring transparency from the start.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Equal Opportunity",
    description: "All providers get an equal chance to accept jobs and compete fairly for your business.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Shield,
    title: "Trust & Verification",
    description: "Build confidence through verified profiles, ratings, and reviews from real customers.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Lock,
    title: "Secure Escrow Payments",
    description: "Your payment is held securely until the service is completed to your satisfaction.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Smartphone,
    title: "User-Friendly Interface",
    description: "Access our platform seamlessly on web and mobile devices with an intuitive design.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeFeature = features[activeIndex];

  return (
    <section id="features" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Servito</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of service marketplaces with features designed for fairness and transparency
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Feature Display */}
          <div className="bg-gradient-card rounded-2xl p-8 sm:p-12 shadow-lg border border-border mb-8 min-h-[300px] flex flex-col justify-center">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className={`${activeFeature.bgColor} rounded-2xl p-6 flex-shrink-0`}>
                <activeFeature.icon className={`h-16 w-16 ${activeFeature.color}`} />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">{activeFeature.title}</h3>
                <p className="text-lg text-muted-foreground">{activeFeature.description}</p>
              </div>
            </div>
          </div>

          {/* Feature Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover-lift ${
                  activeIndex === index
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className={`${feature.bgColor} rounded-lg p-3 w-fit mx-auto mb-2`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-center">
                  {feature.title.split(' ').slice(0, 2).join(' ')}
                </p>
              </button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {features.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-12 bg-primary' 
                    : 'w-6 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;