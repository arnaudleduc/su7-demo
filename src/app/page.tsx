import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import SpecsSection from "@/components/SpecsSection";
import GallerySection from "@/components/GallerySection";
import ConfiguratorSection from "@/components/ConfiguratorSection";
import MotorizationSection from "@/components/MotorizationSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <SpecsSection />
      <GallerySection />
      <ConfiguratorSection />
      <MotorizationSection />
      <ReservationSection />
      <Footer />
    </main>
  );
}
