import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DashboardPreview from "@/components/DashboardPreview";
import MapSection from "@/components/MapSection";
import AIResultSection from "@/components/AIResultSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <MapSection />
      <AIResultSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
