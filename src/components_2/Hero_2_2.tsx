import { Button } from "@/components_2/ui/button_2_2";
import { Zap, Star, DollarSign } from "lucide-react";
import heroImage from "@/assets_2/hero-services.jpg";

const Hero = () => {
  const scrollToSearch = () => {
    document.getElementById("search-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-hero opacity-90 z-10" />
        <img
          src={heroImage}
          alt="Professional home services"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Your Trusted Home Services Platform
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Book professional services instantly, read authentic reviews, and find skilled professionals within your budget
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Zap className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="text-primary-foreground font-semibold mb-2">Book Service ASAP</h3>
              <p className="text-primary-foreground/80 text-sm">Get instant bookings with professionals available 24/7</p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Star className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="text-primary-foreground font-semibold mb-2">Verified Reviews</h3>
              <p className="text-primary-foreground/80 text-sm">Read authentic reviews from real customers</p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <DollarSign className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="text-primary-foreground font-semibold mb-2">Budget Friendly</h3>
              <p className="text-primary-foreground/80 text-sm">Find services that match your budget perfectly</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToSearch}
              className="w-full sm:w-auto text-base"
            >
              Book a Service Now
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="w-full sm:w-auto text-base"
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
