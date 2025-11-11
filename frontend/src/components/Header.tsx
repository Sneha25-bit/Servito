import { Button } from "@/components/ui/button";
import { Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // 🟢 install if not already: npm install jwt-decode

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      localStorage.removeItem("token");
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Servito</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Auth Button → Profile Icon */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <Button
                variant="ghost"
                className="font-medium"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <User className="h-6 w-6 text-primary" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
              >
                Contact
              </button>

              <div className="flex flex-col space-y-2 pt-2">
                {!isLoggedIn ? (
                  <Button
                    variant="outline"
                    className="w-full font-medium"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full font-medium"
                    onClick={() => navigate("/customer/profile")}
                  >
                    <User className="h-5 w-5 mr-2" /> Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
