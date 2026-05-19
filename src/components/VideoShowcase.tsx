import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { X } from 'lucide-react';

const videos = [
  {
    src: '/gallery-ps4-hdmi.mp4',
    title: 'PS4 HDMI',
    subtitle: 'Reconstruction des pins HDMI endommagés — soudure microscopique sur port de connexion console',
  },
  {
    src: '/gallery-phone-ram.mp4',
    title: 'Asus RAM',
    subtitle: 'Reballing mémoire RAM téléphone — réparation soudures BGA chip mémoire sur carte mère',
  },
  {
    src: '/gallery-iphone11-screen.mp4',
    title: 'iPhone 11',
    subtitle: 'Remplacement écran complet — démontage, transfert composants et assemblage précis',
  },
  {
    src: '/nand_reball_new.mp4',
    title: 'NAND Reball',
    subtitle: 'Reballing puce NAND Flash — refonte complète des billes BGA sur mémoire de stockage',
  },
];

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inlineVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; title: string; subtitle: string } | null>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play all visible videos
  useEffect(() => {
    inlineVideoRefs.current.forEach((v) => {
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  }, []);

  useEffect(() => {
    if (lightbox && lightboxVideoRef.current) {
      lightboxVideoRef.current.play().catch(() => {});
    }
  }, [lightbox]);

  const openLightbox = (video: typeof videos[0]) => {
    setLightbox({ src: video.src, title: video.title, subtitle: video.subtitle });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
      lightboxVideoRef.current.currentTime = 0;
    }
    setLightbox(null);
    document.body.style.overflow = '';
    // Resume inline videos
    inlineVideoRefs.current.forEach((v) => {
      if (v) v.play().catch(() => {});
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0508] to-[#140a0f] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-6 sm:mb-8" style={{ opacity: 0 }}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-[2px] bg-burnt-orange" />
              <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-burnt-orange">
                En direct de l'atelier
              </span>
              <div className="w-8 sm:w-12 h-[2px] bg-burnt-orange" />
            </div>
            <h2
              className="font-mono font-bold uppercase leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
            >
              Mes réparations<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-burnt-orange to-orange-400">
                en vidéo
              </span>
            </h2>
          </div>

          {/* 4 equal video cards grid — always 2x2 even on phones */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {videos.map((video, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#140a0f] cursor-pointer hover:border-burnt-orange/40 hover:shadow-[0_0_20px_rgba(255,107,53,0.15)] transition-all duration-500 group"
                style={{ opacity: 0 }}
                onClick={() => openLightbox(video)}
              >
                {/* Video container — auto-playing */}
                <div className="relative aspect-video">
                  <video
                    ref={(el) => { inlineVideoRefs.current[i] = el; }}
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140a0f]/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-[#140a0f]/0 group-hover:bg-[#140a0f]/20 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Title only below */}
                <div className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                  <h3 className="font-mono text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold uppercase truncate text-white">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* 3 Value proposition cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
            {/* Card 1 — Garantie */}
            <div className="glass-card p-3 sm:p-4 md:p-6 text-center group hover:border-electric-blue/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-electric-blue/20 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-electric-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase text-white mb-0.5 sm:mb-1">2 mois de garantie</h3>
              <p className="font-mono text-[9px] sm:text-[10px] text-white/40 leading-relaxed hidden sm:block">Toutes les réparations sont garanties</p>
            </div>

            {/* Card 2 — Devis rapide */}
            <div className="glass-card p-3 sm:p-4 md:p-6 text-center group hover:border-burnt-orange/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-burnt-orange/10 border border-burnt-orange/20 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-burnt-orange/20 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-burnt-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase text-white mb-0.5 sm:mb-1">Devis rapide</h3>
              <p className="font-mono text-[9px] sm:text-[10px] text-white/40 leading-relaxed hidden sm:block">1h environ pour votre devis</p>
            </div>

            {/* Card 3 — Prix adaptés */}
            <div className="glass-card p-3 sm:p-4 md:p-6 text-center group hover:border-emerald-400/30 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-emerald-400/20 transition-colors">
                <span className="text-emerald-400 text-xl sm:text-2xl font-bold">€</span>
              </div>
              <h3 className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase text-white mb-0.5 sm:mb-1">Prix adaptés</h3>
              <p className="font-mono text-[9px] sm:text-[10px] text-white/40 leading-relaxed hidden sm:block">Tarifs justes et transparents</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIGHTBOX ─── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-[#140a0f]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close X — below nav on mobile, top-right on desktop */}
          <button
            onClick={closeLightbox}
            className="fixed top-[72px] right-4 md:top-6 md:right-6 flex w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 items-center justify-center transition-colors z-[80]"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={lightboxVideoRef}
              src={lightbox.src}
              className="max-w-full max-h-[75vh] rounded-xl w-full"
              controls
              playsInline
              autoPlay
            />
            <div className="mt-3 sm:mt-4 text-center">
              <div className="font-mono text-sm sm:text-base font-bold uppercase text-white">
                {lightbox.title}
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-1 max-w-lg mx-auto">
                {lightbox.subtitle}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
