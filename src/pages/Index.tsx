import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { RideTypes } from "@/components/home/RideTypes";
import { Testimonials } from "@/components/home/Testimonials";
import { AppCTA } from "@/components/home/AppCTA";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <HowItWorks />
    <Features />
    <RideTypes />
    <Testimonials />
    <AppCTA />
    <Footer />
  </div>
);

export default Index;
