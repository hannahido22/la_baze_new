import { useEffect } from 'react';
import { Star } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  SECTION AVIS
//   • GOOGLE     : widget Elfsight (AUTOMATIQUE — se met à jour tout seul
//                  une fois la fiche Google connectée dans elfsight.com).
//   • TRUSTPILOT : avis affichés en dur (MANUEL — ajoute une ligne dans
//                  reviews[] ; le texte des avis n'est pas dispo côté widget
//                  gratuit Trustpilot).
// ─────────────────────────────────────────────────────────────

// Widget Google (Elfsight). Vide = bloc Google masqué.
const ELFSIGHT_GOOGLE_APP = 'elfsight-app-191fd064-b825-477f-8c77-5732099b0a34';
const ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';

const TRUSTPILOT = {
  rating: 4.1,
  count: 5,
  profileUrl: 'https://www.trustpilot.com/review/labazerepair.be',
  reviewUrl: 'https://www.trustpilot.com/evaluate/labazerepair.be',
};

// Avis Trustpilot, du plus récent au plus ancien.
type Review = { author: string; rating: number; text: string; date: string };
const reviews: Review[] = [
  { author: 'Augustin Jonard', rating: 5, date: 'Août 2026', text: 'Contact rapide, professionnel et avisé. Qualité au top. Je recommande fortement !' },
  { author: 'George Hanna', rating: 5, date: 'Août 2026', text: 'Très bonne expérience, je recommande fortement !' },
  { author: 'Michle Malkoun', rating: 5, date: 'Août 2026', text: "Très bon service rapide et fiable. Il a changé le châssis de mon téléphone en même pas 2h, et il est revenu comme neuf." },
  { author: 'Hadi Diallo', rating: 5, date: 'Août 2026', text: "Excellent travail de micro soudure sur une carte de lave-vaisselle. Bon conseil pour renforcer l'interrupteur sur la carte avec du silicone. En prime une petite vidéo du travail réalisé. Je recommande fortement." },
  { author: 'Lebario Kuriakos', rating: 5, date: 'Juillet 2026', text: "Très bon réparateur, je recommande. J'ai réparé mon iPhone 14 Pro Max ainsi que mon ordinateur. Je suis très satisfait, impeccable 👌" },
];

function useExternalScript(src: string | undefined) {
  useEffect(() => {
    if (!src) return;
    if (document.querySelector(`script[src="${src}"]`)) return;
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
  }, [src]);
}

function Stars({ rating, color = '#f59e0b' }: { rating: number; color?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="w-4 h-4" style={{ color, fill: i < Math.round(rating) ? color : 'transparent' }} strokeWidth={1.5} />
      ))}
    </div>
  );
}

function GoogleMark({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

export default function ReviewsSection() {
  const hasGoogle = !!ELFSIGHT_GOOGLE_APP;
  useExternalScript(hasGoogle ? ELFSIGHT_SRC : undefined);

  return (
    <section id="avis" className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">Témoignages</span>
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
          </div>
          <h2 className="font-mono font-bold uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}>
            Ce que disent<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">mes clients</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/50 mt-3 sm:mt-4 max-w-md mx-auto">Avis vérifiés sur Google et Trustpilot.</p>
        </div>

        {/* ─── GOOGLE — widget automatique ─── */}
        {hasGoogle && (
          <div className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <GoogleMark />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Avis Google</span>
            </div>
            <div className={`${ELFSIGHT_GOOGLE_APP} w-full min-h-[120px]`} data-elfsight-app-lazy="" />
          </div>
        )}

        {/* ─── TRUSTPILOT — avis en dur ─── */}
        <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: '#00b67a', fill: '#00b67a' }} strokeWidth={0} />
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Avis Trustpilot</span>
          </div>
          <a
            href={TRUSTPILOT.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/70 hover:text-white transition-colors"
          >
            <span className="font-bold text-white">{TRUSTPILOT.rating.toFixed(1)}</span>
            <Stars rating={TRUSTPILOT.rating} color="#00b67a" />
            <span className="text-white/50">· {TRUSTPILOT.count} avis</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((r, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/10 p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-blue/30 to-burnt-orange/30 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white">
                    {initials(r.author)}
                  </div>
                  <div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-white">{r.author}</div>
                    <div className="font-mono text-[10px] text-white/40">{r.date}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50">
                  <Star className="w-3.5 h-3.5" style={{ color: '#00b67a', fill: '#00b67a' }} strokeWidth={0} /> Trustpilot
                </span>
              </div>
              <Stars rating={r.rating} />
              <p className="font-mono text-xs sm:text-sm text-white/70 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <a
            href={TRUSTPILOT.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#00b67a' }}
          >
            <Star className="w-4 h-4" fill="currentColor" strokeWidth={0} /> Laisser un avis Trustpilot
          </a>
        </div>
      </div>
    </section>
  );
}
