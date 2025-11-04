import { UserPlus, FileText, Search, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Customer creates an account and posts their service request with budget details.",
    step: "01",
  },
  {
    icon: FileText,
    title: "Providers Get Notified",
    description: "Service providers receive notifications and can send their acceptance and proposals.",
    step: "02",
  },
  {
    icon: Search,
    title: "Compare & Choose",
    description: "Customer compares provider profiles, ratings, and proposals to find the best match.",
    step: "03",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Payment is secured through our escrow system, protecting both parties.",
    step: "04",
  },
  {
    icon: CheckCircle,
    title: "Service & Review",
    description: "Service is delivered, payment released, and both parties can leave reviews.",
    step: "05",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How <span className="gradient-text">Servito</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and secure. Get started in five easy steps.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop View - Horizontal Timeline */}
          <div className="hidden lg:block relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />
            
            <div className="grid grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Number Circle */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-lg shadow-lg relative z-10">
                    {step.step}
                  </div>
                  
                  {/* Content Card */}
                  <div className="bg-gradient-card rounded-xl p-6 border border-border shadow-md hover-lift">
                    <div className="bg-primary/10 rounded-lg p-3 w-fit mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-center">{step.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet View - Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative pl-16">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />
                )}
                
                {/* Step Number Circle */}
                <div className="absolute left-0 top-0 w-14 h-14 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-base shadow-lg z-10">
                  {step.step}
                </div>
                
                {/* Content Card */}
                <div className="bg-gradient-card rounded-xl p-6 border border-border shadow-md">
                  <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
