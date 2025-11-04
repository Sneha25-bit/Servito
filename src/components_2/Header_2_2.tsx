import { Button } from "@/components_2/ui/button_2_2";
import { User, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Servito
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
              Reviews
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="default" className="hidden md:inline-flex">
              Book Service
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-3">
              <a href="#services" className="text-foreground hover:text-primary transition-colors py-2">
                Services
              </a>
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors py-2">
                How It Works
              </a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors py-2">
                Reviews
              </a>
              <Button variant="default" className="w-full mt-2">
                Book Service
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
