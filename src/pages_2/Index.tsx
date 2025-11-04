import Header from "@/components_2/Header_2_2";
import Hero from "@/components_2/Hero_2_2";
import SearchSection from "@/components_2/SearchSection_2_2";
import ServicesGrid from "@/components_2/ServicesGrid_2_2";
import HowItWorks from "@/components_2/HowItWorks_2_2";
import Testimonials from "@/components_2/Testimonials_2_2";
import Footer from "@/components_2/Footer_2_2";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SearchSection />
      <ServicesGrid />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
