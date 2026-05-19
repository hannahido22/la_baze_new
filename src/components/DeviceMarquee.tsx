import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const devices = [
  'Consoles de jeux', 'Casque audio', 'Ordinateur portable', 'Moniteurs',
  'Smartphone', 'Haut-parleur', 'Tablette', 'Caméra',
  'Drone', 'Cartes électroniques', 'Cigarette électronique',
];

export default function DeviceMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    gsap.fromTo(marquee,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: marquee,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  // Build a single track string, then duplicate it for seamless loop
  const Track = () => (
    <>
      {devices.map((device, i) => (
        <span key={`t-${i}`} className="inline-flex items-center flex-shrink-0">
          <span className="font-mono text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider text-white whitespace-nowrap">
            {device}
          </span>
          <span className="text-burnt-orange/50 text-xs sm:text-sm mx-6 sm:mx-10">•</span>
        </span>
      ))}
    </>
  );

  return (
    <div ref={marqueeRef} className="relative py-3 sm:py-4 overflow-hidden border-y border-white/5" style={{ opacity: 0 }}>
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#140a0f] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#140a0f] to-transparent z-10" />

      <div className="marquee-container">
        <div className="marquee-content" style={{ animationDuration: '12s' }}>
          {/* First half */}
          <div className="inline-flex items-center">
            <Track />
          </div>
          {/* Second half (identical copy for seamless loop) */}
          <div className="inline-flex items-center">
            <Track />
          </div>
        </div>
      </div>
    </div>
  );
}
