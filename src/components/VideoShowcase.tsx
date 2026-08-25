import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import { type ShowcaseVideo } from '@/data/videos';
import VideoLightbox from './VideoLightbox';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
//  VIDÉOS D'ACCUEIL — 4 clips LOCAUX (.mp4) en lecture auto (boucle,
//  sans son) dès le chargement de la page. Au clic → vidéo complète
//  avec le son (YouTube) dans la fenêtre agrandie.
//
//  Les clips sont des versions courtes/allégées dans /public.
//  youtubeId = la vidéo complète correspondante (pour le clic).
// ─────────────────────────────────────────────────────────────
type FeaturedClip = { mp4: string; youtubeId: string; title: string };

const featured: FeaturedClip[] = [
  { mp4: '/clip-usbc.mp4', youtubeId: 'LdfEmJt5SXo', title: 'Port USB-C' },
  { mp4: '/clip-lenovo.mp4', youtubeId: 'q2Lr_aln87Y', title: 'Lenovo Thinkpad' },
  { mp4: '/clip-button.mp4', youtubeId: 'dQj3OuxqSII', title: 'Soudure bouton' },
  { mp4: '/clip-ps4-hdmi.mp4', youtubeId: 'JX4uQ7938zE', title: 'PS4 HDMI' },
  { mp4: '/clip-switch.mp4', youtubeId: '-vE22BsnhBQ', title: 'Nintendo Switch' },
  { mp4: '/clip-ps5.mp4', youtubeId: '3GK-CQlcYk4', title: 'PS5 Southbridge' },
];

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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

  // Lecture auto fiable en sourdine dès l'arrivée.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.muted = true;
      v.play().catch(() => {});
    });
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

          {/* Grille — clips locaux en lecture auto, clic = vidéo complète avec son */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {featured.map((clip, i) => (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#140a0f] cursor-pointer hover:border-burnt-orange/40 hover:shadow-[0_0_20px_rgba(255,107,53,0.15)] transition-all duration-500 group"
                style={{ opacity: 0 }}
                onClick={() => setLightbox({ youtubeId: clip.youtubeId, title: clip.title })}
              >
                <div className="relative aspect-video">
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={clip.mp4}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="auto"
                  />
                  {/* Voile + bouton lecture (indique qu'on peut ouvrir en grand avec le son) */}
                  <div className="absolute inset-0 bg-[#140a0f]/0 group-hover:bg-[#140a0f]/25 transition-colors duration-300" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140a0f]/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Titre */}
                <div className="p-1.5 sm:p-2 md:p-3 lg:p-4">
                  <h3 className="font-mono text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold uppercase truncate text-white">
                    {clip.title}
                  </h3>
                </div>
              </div>
            ))}
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
              <h3 className="font-mono text-[10px] sm:text-xs md:text-sm font-bold uppercase text-white mb-0.5 sm:mb-1">Travail avec garantie</h3>
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

      {/* ─── LIGHTBOX (vidéo complète avec son, via YouTube) ─── */}
      {lightbox && <VideoLightbox video={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
