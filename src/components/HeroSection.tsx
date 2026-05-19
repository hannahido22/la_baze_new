import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MonospacedDecoder from './MonospacedDecoder';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        imageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      tl.fromTo(
        bracketsRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );

      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
        '-=0.15'
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-16 sm:pb-24"
    >
      {/* Animated SVG circuit background */}
      <div ref={imageRef} className="absolute inset-0 z-0 overflow-hidden" style={{ opacity: 0 }}>
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="tg2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="#140a0f" />

          {/* Dense traces */}
          <g filter="url(#tg2)">
            {/* Horizontal */}
            <line x1="0" y1="80" x2="1200" y2="80" stroke="#00a8e8" strokeWidth="1" opacity="0.1" />
            <line x1="0" y1="150" x2="1200" y2="150" stroke="#00a8e8" strokeWidth="1.5" opacity="0.14" />
            <line x1="0" y1="220" x2="1200" y2="220" stroke="#00a8e8" strokeWidth="1" opacity="0.08" />
            <line x1="0" y1="300" x2="1200" y2="300" stroke="#00a8e8" strokeWidth="2" opacity="0.18" />
            <line x1="0" y1="380" x2="1200" y2="380" stroke="#00a8e8" strokeWidth="1" opacity="0.1" />
            <line x1="0" y1="450" x2="1200" y2="450" stroke="#00a8e8" strokeWidth="1.5" opacity="0.2" />
            <line x1="0" y1="520" x2="1200" y2="520" stroke="#00a8e8" strokeWidth="1" opacity="0.1" />
            <line x1="0" y1="600" x2="1200" y2="600" stroke="#00a8e8" strokeWidth="2" opacity="0.16" />
            <line x1="0" y1="680" x2="1200" y2="680" stroke="#00a8e8" strokeWidth="1" opacity="0.08" />
            <line x1="0" y1="750" x2="1200" y2="750" stroke="#00a8e8" strokeWidth="1.5" opacity="0.12" />
            {/* Vertical */}
            <line x1="80" y1="0" x2="80" y2="800" stroke="#00a8e8" strokeWidth="1" opacity="0.08" />
            <line x1="180" y1="0" x2="180" y2="800" stroke="#00a8e8" strokeWidth="1.5" opacity="0.14" />
            <line x1="300" y1="0" x2="300" y2="800" stroke="#00a8e8" strokeWidth="1" opacity="0.1" />
            <line x1="420" y1="0" x2="420" y2="800" stroke="#00a8e8" strokeWidth="2" opacity="0.2" />
            <line x1="550" y1="0" x2="550" y2="800" stroke="#00a8e8" strokeWidth="1.5" opacity="0.16" />
            <line x1="680" y1="0" x2="680" y2="800" stroke="#00a8e8" strokeWidth="1" opacity="0.1" />
            <line x1="820" y1="0" x2="820" y2="800" stroke="#00a8e8" strokeWidth="1.5" opacity="0.18" />
            <line x1="950" y1="0" x2="950" y2="800" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="1060" y1="0" x2="1060" y2="800" stroke="#00a8e8" strokeWidth="1.5" opacity="0.14" />
            <line x1="1150" y1="0" x2="1150" y2="800" stroke="#00a8e8" strokeWidth="1" opacity="0.08" />
            {/* Branches */}
            <line x1="180" y1="150" x2="300" y2="150" stroke="#00a8e8" strokeWidth="1" opacity="0.15" />
            <line x1="300" y1="300" x2="420" y2="300" stroke="#00a8e8" strokeWidth="1" opacity="0.2" />
            <line x1="420" y1="450" x2="550" y2="450" stroke="#00a8e8" strokeWidth="1" opacity="0.2" />
            <line x1="550" y1="300" x2="680" y2="300" stroke="#00a8e8" strokeWidth="1" opacity="0.18" />
            <line x1="680" y1="150" x2="820" y2="150" stroke="#00a8e8" strokeWidth="1" opacity="0.15" />
            <line x1="820" y1="450" x2="950" y2="450" stroke="#00a8e8" strokeWidth="1" opacity="0.18" />
            <line x1="550" y1="600" x2="680" y2="600" stroke="#00a8e8" strokeWidth="1" opacity="0.15" />
            <line x1="300" y1="600" x2="420" y2="600" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="420" y1="80" x2="420" y2="220" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="550" y1="450" x2="550" y2="600" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="680" y1="300" x2="680" y2="520" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="820" y1="150" x2="820" y2="300" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="950" y1="450" x2="950" y2="600" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="180" y1="300" x2="180" y2="450" stroke="#00a8e8" strokeWidth="1" opacity="0.12" />
            <line x1="300" y1="450" x2="300" y2="600" stroke="#00a8e8" strokeWidth="1" opacity="0.1" />
            {/* Orange accents */}
            <line x1="80" y1="520" x2="180" y2="680" stroke="#ff6b35" strokeWidth="1" opacity="0.08" />
            <line x1="1060" y1="150" x2="1150" y2="300" stroke="#ff6b35" strokeWidth="1" opacity="0.08" />
            <line x1="820" y1="600" x2="950" y2="750" stroke="#ff6b35" strokeWidth="1" opacity="0.06" />
          </g>

          {/* Static nodes */}
          <g>
            <circle cx="180" cy="150" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="300" cy="150" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="300" cy="300" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="420" cy="300" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="420" cy="450" r="3" fill="#00a8e8" opacity="0.3" />
            <circle cx="550" cy="450" r="3" fill="#00a8e8" opacity="0.3" />
            <circle cx="550" cy="300" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="680" cy="300" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="680" cy="150" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="820" cy="150" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="820" cy="450" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="950" cy="450" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="550" cy="600" r="2.5" fill="#00a8e8" opacity="0.25" />
            <circle cx="680" cy="600" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="300" cy="600" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="420" cy="600" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="420" cy="150" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="420" cy="80" r="1.5" fill="#00a8e8" opacity="0.15" />
            <circle cx="550" cy="600" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="680" cy="520" r="1.5" fill="#00a8e8" opacity="0.15" />
            <circle cx="820" cy="300" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="950" cy="600" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="180" cy="300" r="1.5" fill="#00a8e8" opacity="0.15" />
            <circle cx="180" cy="450" r="2" fill="#00a8e8" opacity="0.2" />
            <circle cx="300" cy="450" r="2" fill="#00a8e8" opacity="0.2" />
          </g>

          {/* FAST MOVING DOTS */}
          <g>
            {/* Horizontal - fast */}
            <circle r="3" fill="#00a8e8" opacity="0.9">
              <animateMotion path="M-20,80 L1220,80" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.95">
              <animateMotion path="M1220,150 L-20,150" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.85">
              <animateMotion path="M-20,220 L1220,220" dur="1.5s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle r="5" fill="#00a8e8" opacity="1">
              <animateMotion path="M1220,300 L-20,300" dur="2.2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle r="3.5" fill="#00a8e8" opacity="0.9">
              <animateMotion path="M-20,380 L1220,380" dur="1.7s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.95">
              <animateMotion path="M1220,450 L-20,450" dur="2s" repeatCount="indefinite" begin="1.1s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.85">
              <animateMotion path="M-20,520 L1220,520" dur="1.6s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle r="5" fill="#00a8e8" opacity="1">
              <animateMotion path="M1220,600 L-20,600" dur="2.5s" repeatCount="indefinite" begin="1.4s" />
            </circle>
            <circle r="3.5" fill="#00a8e8" opacity="0.9">
              <animateMotion path="M-20,680 L1220,680" dur="1.9s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.95">
              <animateMotion path="M1220,750 L-20,750" dur="2.1s" repeatCount="indefinite" begin="1s" />
            </circle>

            {/* Vertical - fast */}
            <circle r="4" fill="#00a8e8" opacity="0.9">
              <animateMotion path="M80,-20 L80,820" dur="2s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle r="3.5" fill="#00a8e8" opacity="0.85">
              <animateMotion path="M180,820 L180,-20" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.95">
              <animateMotion path="M300,-20 L300,820" dur="2.2s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle r="5" fill="#00a8e8" opacity="1">
              <animateMotion path="M420,820 L420,-20" dur="2.5s" repeatCount="indefinite" begin="1.1s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.85">
              <animateMotion path="M550,-20 L550,820" dur="1.7s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.9">
              <animateMotion path="M680,820 L680,-20" dur="2s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <circle r="3.5" fill="#00a8e8" opacity="0.85">
              <animateMotion path="M820,-20 L820,820" dur="1.9s" repeatCount="indefinite" begin="0.9s" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.95">
              <animateMotion path="M950,820 L950,-20" dur="2.3s" repeatCount="indefinite" begin="1.3s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.85">
              <animateMotion path="M1060,-20 L1060,820" dur="1.6s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle r="4" fill="#00a8e8" opacity="0.9">
              <animateMotion path="M1150,820 L1150,-20" dur="2.1s" repeatCount="indefinite" begin="1.5s" />
            </circle>

            {/* Branch - fast */}
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M180,150 L300,150" dur="1.4s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M420,300 L300,300" dur="1.3s" repeatCount="indefinite" begin="0.6s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M420,450 L550,450" dur="1.5s" repeatCount="indefinite" begin="0.9s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M680,300 L550,300" dur="1.4s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M680,150 L820,150" dur="1.6s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M950,450 L820,450" dur="1.5s" repeatCount="indefinite" begin="0.7s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M550,600 L680,600" dur="1.4s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M420,600 L300,600" dur="1.3s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M420,80 L420,220" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M550,450 L550,600" dur="1.4s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M680,300 L680,520" dur="1.6s" repeatCount="indefinite" begin="1.1s" />
            </circle>
            <circle r="3" fill="#00a8e8" opacity="0.8">
              <animateMotion path="M820,150 L820,300" dur="1.3s" repeatCount="indefinite" begin="0.4s" />
            </circle>

            {/* Orange */}
            <circle r="3" fill="#ff6b35" opacity="0.85">
              <animateMotion path="M80,520 L180,680" dur="2.2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle r="3" fill="#ff6b35" opacity="0.85">
              <animateMotion path="M1150,300 L1060,150" dur="2.5s" repeatCount="indefinite" begin="1.2s" />
            </circle>
            <circle r="3" fill="#ff6b35" opacity="0.85">
              <animateMotion path="M820,600 L950,750" dur="2.8s" repeatCount="indefinite" begin="0.8s" />
            </circle>

            {/* Fast white */}
            <circle r="2" fill="#ffffff" opacity="0.5">
              <animateMotion path="M-10,380 L1210,380" dur="1.3s" repeatCount="indefinite" />
            </circle>
            <circle r="2" fill="#ffffff" opacity="0.45">
              <animateMotion path="M180,810 L180,-10" dur="1.5s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle r="2" fill="#ffffff" opacity="0.4">
              <animateMotion path="M-10,520 L1210,520" dur="1.1s" repeatCount="indefinite" begin="0.7s" />
            </circle>
            <circle r="2" fill="#ffffff" opacity="0.45">
              <animateMotion path="M680,810 L680,-10" dur="1.4s" repeatCount="indefinite" begin="1s" />
            </circle>
          </g>

          {/* Spark flashes */}
          <g>
            <circle cx="300" cy="150" r="0" fill="#00a8e8" opacity="0">
              <animate attributeName="r" values="0;8;0" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="420" cy="300" r="0" fill="#00a8e8" opacity="0">
              <animate attributeName="r" values="0;10;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0;0.6;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <circle cx="550" cy="450" r="0" fill="#00a8e8" opacity="0">
              <animate attributeName="r" values="0;12;0" dur="3s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0;0.7;0" dur="3s" repeatCount="indefinite" begin="1s" />
            </circle>
            <circle cx="420" cy="450" r="0" fill="#00a8e8" opacity="0">
              <animate attributeName="r" values="0;8;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
              <animate attributeName="opacity" values="0;0.45;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
            </circle>
            <circle cx="820" cy="150" r="0" fill="#00a8e8" opacity="0">
              <animate attributeName="r" values="0;8;0" dur="2.8s" repeatCount="indefinite" begin="0.3s" />
              <animate attributeName="opacity" values="0;0.5;0" dur="2.8s" repeatCount="indefinite" begin="0.3s" />
            </circle>
            <circle cx="180" cy="680" r="0" fill="#ff6b35" opacity="0">
              <animate attributeName="r" values="0;10;0" dur="3.5s" repeatCount="indefinite" begin="1.5s" />
              <animate attributeName="opacity" values="0;0.5;0" dur="3.5s" repeatCount="indefinite" begin="1.5s" />
            </circle>
            <circle cx="950" cy="750" r="0" fill="#ff6b35" opacity="0">
              <animate attributeName="r" values="0;8;0" dur="3s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="opacity" values="0;0.4;0" dur="3s" repeatCount="indefinite" begin="0.8s" />
            </circle>
            <circle cx="680" cy="300" r="0" fill="#00a8e8" opacity="0">
              <animate attributeName="r" values="0;10;0" dur="2.5s" repeatCount="indefinite" begin="1.8s" />
              <animate attributeName="opacity" values="0;0.55;0" dur="2.5s" repeatCount="indefinite" begin="1.8s" />
            </circle>
          </g>

          {/* Dot grid */}
          <g opacity="0.04">
            {Array.from({ length: 40 }).map((_, i) =>
              Array.from({ length: 27 }).map((_, j) => (
                <circle key={`gd${i}-${j}`} cx={i * 30 + 15} cy={j * 30 + 15} r="0.6" fill="#00a8e8" />
              ))
            )}
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#140a0f] via-[#140a0f]/60 to-[#140a0f]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        {/* Bracket frame - smaller on mobile */}
        <div
          ref={bracketsRef}
          className="relative p-3 sm:p-6 md:p-10 lg:p-14"
          style={{ opacity: 0 }}
        >
          {/* Corner brackets - hidden on very small screens */}
          <div className="hidden sm:block absolute top-0 left-0 w-10 md:w-12 h-10 md:h-12 border-t-2 border-l-2 border-white/20 rounded-tl-[30px]" />
          <div className="hidden sm:block absolute top-0 right-0 w-10 md:w-12 h-10 md:h-12 border-t-2 border-r-2 border-white/20 rounded-tr-[30px]" />
          <div className="hidden sm:block absolute bottom-0 left-0 w-10 md:w-12 h-10 md:h-12 border-b-2 border-l-2 border-white/20 rounded-bl-[30px]" />
          <div className="hidden sm:block absolute bottom-0 right-0 w-10 md:w-12 h-10 md:h-12 border-b-2 border-r-2 border-white/20 rounded-br-[30px]" />

          <div className="glass-card p-5 sm:p-8 md:p-12">
            {/* Heading */}
            <div ref={headingRef} style={{ opacity: 0 }}>
              <h1 className="font-mono font-bold leading-[1.1] mb-4 sm:mb-8"
                style={{ fontSize: 'clamp(22px, 5vw, 56px)' }}
              >
                <MonospacedDecoder text="Bienvenue chez La" delay={0.8} className="block" triggerRef={sectionRef} />
                <span className="text-electric-blue">
                  <MonospacedDecoder text="Baze" delay={1.2} className="inline" triggerRef={sectionRef} />
                </span>
                <MonospacedDecoder text=" Repair" delay={1.4} className="inline" triggerRef={sectionRef} />
              </h1>
            </div>

            {/* Body - smaller text on mobile */}
            <div ref={bodyRef} className="max-w-2xl mx-auto space-y-2 sm:space-y-4" style={{ opacity: 0 }}>
              <p className="font-mono text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                Atelier indépendant de réparation électronique.
              </p>
              <p className="font-mono text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
                Téléphones, ordinateurs, consoles, cartes mères, microsoudure — tous appareils, tous diagnostics, avec soin et transparence.
              </p>
            </div>

            {/* Tagline */}
            <div ref={ctaRef} className="mt-4 sm:mt-8" style={{ opacity: 0 }}>
              <p className="font-mono text-sm sm:text-lg md:text-xl font-medium text-electric-blue">
                Donnez une seconde vie à vos appareils.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
