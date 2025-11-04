import { Card, CardContent } from "@/components_2/ui/card_2_2";
import { Search, UserCheck, Calendar, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Search Services",
      description: "Browse through our wide range of professional services and find what you need",
    },
    {
      icon: UserCheck,
      title: "Choose Professional",
      description: "Review ratings, read reviews, and select the best professional for your needs",
    },
    {
      icon: Calendar,
      title: "Book & Schedule",
      description: "Pick your preferred date and time slot that works for you",
    },
    {
      icon: CheckCircle,
      title: "Get It Done",
      description: "Sit back and relax while our verified professionals complete your service",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Book your service in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative">
                <Card className="h-full shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6 text-center">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-medium">
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Connector arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-primary/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
