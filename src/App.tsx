import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CursorSpotlight from './components/CursorSpotlight';
import FloatingParticles from './components/FloatingParticles';
import Navigation from './components/Navigation';
import SocialBubbles from './components/SocialBubbles';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';

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
      <SocialBubbles />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
