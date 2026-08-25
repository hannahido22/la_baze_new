import VideoShowcase from '@/components/VideoShowcase';
import HeroSection from '@/components/HeroSection';
import DeviceMarquee from '@/components/DeviceMarquee';
import ExpertisesSection from '@/components/ExpertisesSection';
import DevisSection from '@/components/DevisSection';
import ProcessSection from '@/components/ProcessSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function HomePage() {
  return (
    <main className="relative z-10">
      <VideoShowcase />
      <HeroSection />
      <DevisSection />
      <ReviewsSection />
      <DeviceMarquee />
      <ExpertisesSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}
