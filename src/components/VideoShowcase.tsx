import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Youtube } from 'lucide-react';
import { hasVideo, youtubeThumb } from '@/lib/youtube';
import { videos, FEATURED_COUNT, type ShowcaseVideo } from '@/data/videos';
import VideoLightbox from './VideoLightbox';

gsap.registerPlugin(ScrollTrigger);

// Vidéos mises en avant sur l'accueil. La liste complète vit dans
// src/data/videos.ts et s'affiche sur la page /videos.
const featured = videos.slice(0, FEATURED_COUNT);

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<ShowcaseVideo | null>(null);

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
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.5, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 95%', toggleActions: 'play none none none' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (video: ShowcaseVideo) => {
    if (!hasVideo(video.youtubeId)) return;
    setLightbox(video);
  };

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

          {/* Grille de vidéos — miniatures légères, clic pour lire avec le son */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
            {featured.map((video, i) => {
              const live = hasVideo(video.youtubeId);
              return (
                <div
                  key={i}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#140a0f] transition-all duration-500 group ${live ? 'cursor-pointer hover:border-burnt-orange/40 hover:shadow-[0_0_20px_rgba(255,107,53,0.15)]' : ''}`}
                  style={{ opacity: 0 }}
                  onClick={() => openLightbox(video)}
                >
                  {/* Miniature 16:9 — nette, clic = lecture plein écran avec le son */}
                  <div className="relative aspect-video">
                    {live ? (
                      <>
                        <img
                          src={youtubeThumb(video.youtubeId)}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-burnt-orange/80 transition-colors">
                          <Play className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-white ml-0.5" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1c1013] to-[#140a0f] text-white/40">
                        <Youtube className="w-6 h-6 sm:w-8 sm:h-8 text-burnt-orange/60" />
                        <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest">Bientôt en ligne</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#140a0f]/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Titre sous la vidéo (complet) */}
                  <div className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                    <h3 title={video.title} className="font-mono text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold uppercase text-white line-clamp-2 leading-snug">
                      {video.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bouton « Voir plus » → page dédiée avec toutes les vidéos */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <Link
              to="/videos"
              className="flex items-center gap-2 rounded-full border border-burnt-orange/40 bg-burnt-orange/10 px-6 py-3.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-burnt-orange hover:bg-burnt-orange/20 hover:border-burnt-orange/60 transition-all"
            >
              Voir plus
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 cartes valeurs */}
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

      {/* ─── LIGHTBOX (vidéo en grand, avec son) ─── */}
      {lightbox && <VideoLightbox video={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
