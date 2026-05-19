import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CursorSpotlight from './components/CursorSpotlight';
import FloatingParticles from './components/FloatingParticles';
import Navigation from './components/Navigation';
import VideoShowcase from './components/VideoShowcase';
import HeroSection from './components/HeroSection';
import DeviceMarquee from './components/DeviceMarquee';
import ExpertisesSection from './components/ExpertisesSection';
import DevisSection from './components/DevisSection';
import ProcessSection from './components/ProcessSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <div className="relative min-h-screen bg-[#140a0f] text-white font-mono overflow-x-hidden">
      <CursorSpotlight />
      <FloatingParticles />
      <Navigation />

      <main className="relative z-10">
        <VideoShowcase />
        <HeroSection />
        <DevisSection />
        <DeviceMarquee />
        <ExpertisesSection />
        <ProcessSection />
        <GallerySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
