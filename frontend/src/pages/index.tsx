import { Header } from "../components/Header";
import HeroSection from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { MascotSection } from "../components/MascotSection";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <MascotSection />
      </main>
      <Footer />
    </div>
  );
}
