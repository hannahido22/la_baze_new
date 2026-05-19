import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const mediaItems = [
  {
    type: 'photo' as const,
    src: '/gallery-1.jpg',
    title: 'PS5 HDMI',
    subtitle: 'Reconstruction des pins HDMI endommagés — soudure microscopique sur port de connexion console',
  },
  {
    type: 'photo' as const,
    src: '/gallery-2.jpg',
    title: 'Chip I/O',
    subtitle: 'Réparation circuit entrée/sortie — remplacement du contrôleur de communication USB/Audio',
  },
  {
    type: 'video' as const,
    src: '/gallery-3.mp4',
    title: 'PS5 Southbridge',
    subtitle: 'Reballing IC southbridge — refonte des soudures BGA sous station infrarouge',
  },
  {
    type: 'video' as const,
    src: '/gallery-4.mp4',
    title: 'Asus RAM',
    subtitle: 'Reballing mémoire RAM téléphone — réparation soudures BGA chip mémoire sur carte mère',
  },
  {
    type: 'video' as const,
    src: '/gallery-5.mp4',
    title: 'iPhone 11',
    subtitle: 'Remplacement écran complet — démontage, transfert composants et assemblage précis',
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ type: 'photo' | 'video'; src: string; title: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.gallery-card') ?? [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightbox?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [lightbox]);

  const openLightbox = useCallback((item: typeof mediaItems[0]) => {
    setLightbox({ type: item.type, src: item.src, title: item.title });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeLightbox]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-6 sm:mb-10 text-center" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
              Galerie
            </span>
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
          </div>
          <h2
            className="font-mono font-bold uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
          >
            Nos<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">
              réparations
            </span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/50 mt-3 sm:mt-4 max-w-md mx-auto">
            Cliquez pour voir en grand.
          </p>
        </div>

        {/* Gallery Grid — all equal squares */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {mediaItems.map((item, i) => (
            <button
              key={i}
              onClick={() => openLightbox(item)}
              className="gallery-card group text-left"
              style={{ opacity: 0 }}
            >
              {/* Media container */}
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#140a0f] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-lg aspect-square">
                {item.type === 'photo' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      v.currentTime = 0.1;
                      v.pause();
                    }}
                  />
                )}

                {item.type === 'video' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                  </div>
                )}
              </div>

              {/* Title and description below the media */}
              <div className="mt-2 sm:mt-3 px-0.5">
                <div className="font-mono text-xs sm:text-sm font-bold uppercase text-white">
                  {item.title}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-[#140a0f]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300"
          style={{ opacity: 1 }}
          onClick={closeLightbox}
        >
          {/* Top X — desktop */}
          <button
            onClick={closeLightbox}
            className="hidden sm:flex absolute top-20 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 items-center justify-center transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Media */}
          <div
            className="relative max-w-5xl max-h-[80vh] sm:max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.type === 'photo' ? (
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl"
              />
            ) : (
              <video
                ref={videoRef}
                src={lightbox.src}
                className="max-w-full max-h-[75vh] rounded-xl"
                controls
                playsInline
                autoPlay
              />
            )}

            <div className="mt-3 sm:mt-4 text-center hidden sm:block">
              <div className="font-mono text-sm sm:text-base font-bold uppercase text-white">
                {lightbox.title}
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-1">
                Cliquez en dehors ou sur la croix pour fermer
              </div>
            </div>

            {/* Mobile bottom close bar — big thumb-friendly button */}
            <button
              onClick={closeLightbox}
              className="sm:hidden mt-4 flex items-center justify-center gap-2 w-full max-w-[200px] py-3 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
              <span className="font-mono text-sm font-bold uppercase text-white">Fermer</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
