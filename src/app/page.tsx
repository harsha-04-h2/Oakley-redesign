import HeroSection from "@/components/HeroSection";
import PromoBar from "@/components/PromoBar";
import Navbar from "@/components/Navbar";
import PursuitSection from "@/components/PursuitSection";
import PrizmSection from "@/components/PrizmSection";
import IconsSection from "@/components/IconsSection";
import MetaSection from "@/components/MetaSection";
import AthletesSection from "@/components/AthletesSection";
import BuiltSection from "@/components/BuiltSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-on-surface flex flex-col relative overflow-hidden selection:bg-primary-container selection:text-black">
      <PromoBar />
      <Navbar />
      
      <HeroSection />
      
      <PursuitSection />
      
      <PrizmSection />
      
      <IconsSection />
      
      <MetaSection />
      
      <AthletesSection />
      
      <BuiltSection />
      
      <Footer />
    </main>
  );
}
