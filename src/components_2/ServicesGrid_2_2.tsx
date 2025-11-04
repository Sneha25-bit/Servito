import { Card, CardContent, CardHeader, CardTitle } from "@/components_2/ui/card_2_2";
import { Button } from "@/components_2/ui/button_2_2";
import {
  Wrench,
  Zap,
  Hammer,
  Droplet,
  Paintbrush,
  Wind,
  Home,
  Bug,
} from "lucide-react";

const ServicesGrid = () => {
  const services = [
    {
      name: "Plumbing",
      icon: Droplet,
      description: "Expert plumbers for all your needs",
      color: "text-blue-500",
    },
    {
      name: "Electrical",
      icon: Zap,
      description: "Licensed electricians available 24/7",
      color: "text-yellow-500",
    },
    {
      name: "Carpentry",
      icon: Hammer,
      description: "Custom woodwork and repairs",
      color: "text-amber-600",
    },
    {
      name: "Cleaning",
      icon: Home,
      description: "Professional home cleaning services",
      color: "text-green-500",
    },
    {
      name: "Painting",
      icon: Paintbrush,
      description: "Interior and exterior painting",
      color: "text-purple-500",
    },
    {
      name: "AC Repair",
      icon: Wind,
      description: "AC installation and maintenance",
      color: "text-cyan-500",
    },
    {
      name: "Appliance Repair",
      icon: Wrench,
      description: "Fix all home appliances",
      color: "text-orange-500",
    },
    {
      name: "Pest Control",
      icon: Bug,
      description: "Safe and effective pest solutions",
      color: "text-red-500",
    },
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Popular Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose from our wide range of professional services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.name}
                className="group hover:shadow-medium transition-all duration-300 cursor-pointer animate-scale-in border-border hover:border-primary/50"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="mb-3">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`h-7 w-7 ${service.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
