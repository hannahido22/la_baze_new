import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X, Youtube } from 'lucide-react';
import { hasVideo, youtubeEmbedUrl, youtubeThumb } from '@/lib/youtube';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  MÉDIAS DE LA GALERIE
//  - Les PHOTOS restent locales (fichiers dans /public).
//  - Les VIDÉOS viennent de YouTube : collez l'ID dans "youtubeId"
//    (voir src/lib/youtube.ts). Laissez '' pour un emplacement « bientôt ».
// ─────────────────────────────────────────────────────────────
type MediaItem =
  | { type: 'photo'; src: string; title: string; subtitle: string }
  | { type: 'video'; youtubeId: string; title: string; subtitle: string };

const mediaItems: MediaItem[] = [
  {
    type: 'photo',
    src: '/gallery-1.jpg',
    title: 'PS5 HDMI',
    subtitle: 'Reconstruction des pins HDMI endommagés — soudure microscopique sur port de connexion console',
  },
  {
    type: 'photo',
    src: '/gallery-2.jpg',
    title: 'Chip I/O',
    subtitle: 'Réparation circuit entrée/sortie — remplacement du contrôleur de communication USB/Audio',
  },
  {
    type: 'video',
    youtubeId: '',
    title: 'PS5 Southbridge',
    subtitle: 'Reballing IC southbridge — refonte des soudures BGA sous station infrarouge',
  },
  {
    type: 'video',
    youtubeId: '',
    title: 'Asus RAM',
    subtitle: 'Reballing mémoire RAM téléphone — réparation soudures BGA chip mémoire sur carte mère',
  },
  {
    type: 'video',
    youtubeId: '',
    title: 'iPhone 11',
    subtitle: 'Remplacement écran complet — démontage, transfert composants et assemblage précis',
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

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

  const openLightbox = useCallback((item: MediaItem) => {
    if (item.type === 'video' && !hasVideo(item.youtubeId)) return; // emplacement vide
    setLightbox(item);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
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

        {/* Grille — carrés égaux */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {mediaItems.map((item, i) => {
            const live = item.type === 'photo' || hasVideo(item.youtubeId);
            return (
              <button
                key={i}
                onClick={() => openLightbox(item)}
                className={`gallery-card group text-left ${live ? '' : 'cursor-default'}`}
                style={{ opacity: 0 }}
              >
                {/* Conteneur média */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#140a0f] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-lg aspect-square">
                  {item.type === 'photo' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : live ? (
                    <img
                      src={youtubeThumb(item.youtubeId)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0d1420] to-[#140a0f] text-white/40">
                      <Youtube className="w-6 h-6 sm:w-7 sm:h-7 text-electric-blue/60" />
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest">Bientôt</span>
                    </div>
                  )}

                  {item.type === 'video' && live && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Titre + description */}
                <div className="mt-2 sm:mt-3 px-0.5">
                  <div className="font-mono text-xs sm:text-sm font-bold uppercase text-white">
                    {item.title}
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── LIGHTBOX ─── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-[#140a0f]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300"
          style={{ opacity: 1 }}
          onClick={closeLightbox}
        >
          {/* X — desktop */}
          <button
            onClick={closeLightbox}
            className="hidden sm:flex absolute top-20 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 items-center justify-center transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Média */}
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
              <div className="relative w-full aspect-video max-h-[75vh]">
                <iframe
                  src={youtubeEmbedUrl(lightbox.youtubeId, { autoplay: true, controls: true })}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  title={lightbox.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  frameBorder={0}
                />
              </div>
            )}

            <div className="mt-3 sm:mt-4 text-center hidden sm:block">
              <div className="font-mono text-sm sm:text-base font-bold uppercase text-white">
                {lightbox.title}
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-white/50 mt-1">
                Cliquez en dehors ou sur la croix pour fermer
              </div>
            </div>

            {/* Bouton fermer — mobile */}
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
