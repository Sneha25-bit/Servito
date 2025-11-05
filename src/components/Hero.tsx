import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 🟢 added

const Hero = () => {
  const navigate = useNavigate(); // 🟢 added
  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4">
              <span className="px-4 py-1.5 bg-gradient-feature rounded-full text-sm font-semibold text-primary border border-primary/20">
                Transparent & Competitive
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              A Transparent &{" "}
              <span className="gradient-text">Competitive</span>{" "}
              Service Marketplace
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Post your budget. Let providers compete. Choose the best match. 
              Experience a fair, transparent way to connect with trusted service professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="text-base font-semibold shadow-lg hover:shadow-xl transition-all group"
                onClick={() => navigate("/request")} 
              >
                Post a Request
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base font-semibold border-2 hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all"
            onClick={() => navigate("/dashboard")}
            >
                <UserPlus className="mr-2 h-5 w-5"  />
                Join as a Provider
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-8 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span>Fair Competition</span>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative lg:block hidden">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80" 
                alt="Professional services marketplace" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -left-8 top-20 bg-card p-4 rounded-xl shadow-lg border border-border animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span className="text-lg">🔧</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">New Request</p>
                  <p className="font-semibold text-sm">Plumbing Service</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 bottom-32 bg-card p-4 rounded-xl shadow-lg border border-border animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">5 Providers</p>
                  <p className="font-semibold text-sm">Ready to Help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
