"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Menu,
  Zap,
  Star,
  DollarSign,
  Calendar,
  SlidersHorizontal,
  Wrench,
  Hammer,
  Droplet,
  Paintbrush,
  Wind,
  Home,
  Bug,
  Search,
  UserCheck,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

// ====== MAIN MERGED PAGE ======
export default function MergedApp() {
 
  const navigate = useNavigate();

  const handleScrollToServices = () => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="merged-app font-sans">
      <Header navigate={navigate} />
      <Hero navigate={navigate} scrollToServices={handleScrollToServices} />
      <SearchSection />
      <ServicesGrid />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}

// ===================== HEADER =====================
const Header = ({ navigate }: { navigate: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <h1 className="text-2xl font-bold text-blue-600">Servito</h1>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#services" className="hover:text-blue-600">
            Services
          </a>
          <a href="#how-it-works" className="hover:text-blue-600">
            How It Works
          </a>
          <a href="#testimonials" className="hover:text-blue-600">
            Reviews
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5" />
          </button>

          {/* Header Book Service */}
          <button
            onClick={() => navigate("/request")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hidden md:block"
          >
            Book Service
          </button>

          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 text-center">
          <a href="#services" className="block py-2 hover:text-blue-600">
            Services
          </a>
          <a href="#how-it-works" className="block py-2 hover:text-blue-600">
            How It Works
          </a>
          <a href="#testimonials" className="block py-2 hover:text-blue-600">
            Reviews
          </a>
          <button
            onClick={() => navigate("/request")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
          >
            Book Service
          </button>
        </div>
      )}
    </header>
  );
};


// ===================== HERO =====================
const Hero = ({
  navigate,
  scrollToServices,
}: {
  navigate: any;
  scrollToServices: () => void;
}) => (
  <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white pt-16">
    <h1 className="text-5xl font-bold mb-6">Your Trusted Home Services Platform</h1>
    <p className="max-w-2xl text-lg mb-8">
      Book professional services instantly, read authentic reviews, and find skilled professionals within your budget.
    </p>
    <div className="flex gap-4">
      {/* Navigates to Service Request Page */}
      <button
        onClick={() => navigate("/request")}
        className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-200"
      >
        Book a Service
      </button>

      {/* Smooth scrolls to Services section */}
      <button
        onClick={scrollToServices}
        className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600"
      >
        Explore Services
      </button>
    </div>
  </section>
);


// ===================== SEARCH SECTION =====================
const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section id="search-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4">Find Your Perfect Service</h2>
        <p className="text-gray-500 mb-8">Search and filter to find exactly what you need</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services (e.g. plumber, electrician...)"
              className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

// ===================== SERVICES GRID =====================
const ServicesGrid = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const services = [
    { name: "Plumbing", icon: Droplet, desc: "Expert plumbers for all your needs" },
    { name: "Electrical", icon: Zap, desc: "Licensed electricians available 24/7" },
    { name: "Carpentry", icon: Hammer, desc: "Custom woodwork and repairs" },
    { name: "Cleaning", icon: Home, desc: "Professional home cleaning services" },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Popular Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <Icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{service.desc}</p>

                {/* ✅ Redirect to Service Request Page */}
                <button
                  onClick={() => navigate("/request")}
                  className="w-full border border-blue-500 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// ===================== HOW IT WORKS =====================
const HowItWorks = () => {
  const steps = [
    { icon: Search, title: "Search Services", desc: "Find what you need quickly" },
    { icon: UserCheck, title: "Choose Professional", desc: "Compare and select experts" },
    { icon: Calendar, title: "Book & Schedule", desc: "Pick your convenient slot" },
    { icon: CheckCircle, title: "Get It Done", desc: "Sit back while pros handle it" },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition"
              >
                <Icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ===================== TESTIMONIALS =====================
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      review: "Found an amazing electrician through Servito! Super easy and reliable.",
      role: "Homeowner",
    },
    {
      name: "Michael Chen",
      review: "The best service platform. Transparent pricing and verified reviews.",
      role: "Business Owner",
    },
    {
      name: "Emily Rodriguez",
      review: "Booked a cleaner within minutes. Excellent experience!",
      role: "Resident",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="italic mb-4 text-gray-700">"{t.review}"</p>
              <p className="font-semibold text-lg">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===================== FOOTER =====================
const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-10 text-center">
    <div className="flex justify-center gap-4 mb-4">
      <Facebook />
      <Twitter />
      <Instagram />
      <Linkedin />
    </div>
    <p>© {new Date().getFullYear()} Servito. All rights reserved.</p>
  </footer>
);
