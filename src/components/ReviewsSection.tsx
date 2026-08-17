import { useEffect, useRef } from 'react';
import { Star, ArrowUpRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  SECTION AVIS (Google + Trustpilot)
//
//  GOOGLE     → widget Elfsight (déjà configuré ci-dessous).
//               Personnalisez l'apparence directement sur elfsight.com.
//  TRUSTPILOT → widget TrustBox : collez votre "businessUnitId" + liens
//               une fois le profil Trustpilot créé. Tant que c'est vide,
//               la carte affiche un emplacement (en dev) et se masque en prod.
// ─────────────────────────────────────────────────────────────

// Classe de l'app Elfsight (avis Google). Vide = non configuré.
const ELFSIGHT_GOOGLE_APP = 'elfsight-app-191fd064-b825-477f-8c77-5732099b0a34';
const ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';

const TRUSTPILOT = {
  profileUrl: '',            // lien vers votre page Trustpilot
  reviewUrl: '',             // lien "Laisser un avis" Trustpilot
  rating: 0,
  count: 0,
  businessUnitId: '',        // ID Trustpilot (TrustBox)
  templateId: '539adbd6dec7e10e686debee', // gabarit par défaut
  domain: '',                // votre domaine, ex : labazerepair.be
};
const TRUSTPILOT_SRC = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';

// Charge un script externe une seule fois.
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

function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className="w-4 h-4 sm:w-5 sm:h-5"
          style={{ color, fill: i < Math.round(rating) ? color : 'transparent' }}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function TrustpilotMark() {
  return (
    <div className="flex items-center gap-1.5">
      <Star className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#00b67a', fill: '#00b67a' }} strokeWidth={0} />
      <span className="font-mono text-sm sm:text-base font-bold text-white">Trustpilot</span>
    </div>
  );
}

// Carte Trustpilot : widget TrustBox si configuré, sinon emplacement.
function TrustpilotCard({ configured }: { configured: boolean }) {
  const tpRef = useRef<HTMLDivElement>(null);

  // TrustBox : (ré)initialise le widget une fois le script prêt.
  useEffect(() => {
    if (!configured || !tpRef.current) return;
    let tries = 0;
    const id = setInterval(() => {
      const tp = (window as unknown as { Trustpilot?: { loadFromElement: (el: HTMLElement, b: boolean) => void } }).Trustpilot;
      if (tp && tpRef.current) {
        tp.loadFromElement(tpRef.current, true);
        clearInterval(id);
      } else if (++tries > 40) {
        clearInterval(id);
      }
    }, 250);
    return () => clearInterval(id);
  }, [configured]);

  return (
    <div className="glass-card p-5 sm:p-6 flex flex-col gap-4 rounded-2xl border border-white/10">
      {/* En-tête : logo + note */}
      <div className="flex items-center justify-between gap-3">
        <TrustpilotMark />
        {configured ? (
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg sm:text-xl font-bold text-white">{TRUSTPILOT.rating.toFixed(1)}</span>
              <Stars rating={TRUSTPILOT.rating} color="#00b67a" />
            </div>
            <span className="font-mono text-[10px] sm:text-xs text-white/50 mt-0.5">{TRUSTPILOT.count} avis</span>
          </div>
        ) : (
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/40">Bientôt</span>
        )}
      </div>

      {/* Zone widget / emplacement */}
      <div className="min-h-[130px] rounded-xl border border-white/5 bg-black/20 flex items-center justify-center p-3">
        {configured ? (
          <div
            ref={tpRef}
            className="trustpilot-widget w-full"
            data-locale="fr-FR"
            data-template-id={TRUSTPILOT.templateId}
            data-businessunit-id={TRUSTPILOT.businessUnitId}
            data-style-height="130px"
            data-style-width="100%"
            data-theme="dark"
          >
            <a href={TRUSTPILOT.profileUrl} target="_blank" rel="noopener noreferrer">Trustpilot</a>
          </div>
        ) : (
          <p className="font-mono text-[11px] sm:text-xs text-white/40 text-center leading-relaxed">
            Les avis Trustpilot s'afficheront ici<br className="hidden sm:block" /> une fois le profil connecté.
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-2">
        <a
          href={TRUSTPILOT.reviewUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!TRUSTPILOT.reviewUrl}
          className={`flex items-center gap-1.5 rounded-full px-4 py-2.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] transition-all ${
            TRUSTPILOT.reviewUrl ? 'text-white hover:opacity-90' : 'text-white/30 pointer-events-none'
          }`}
          style={{ backgroundColor: TRUSTPILOT.reviewUrl ? '#00b67a' : 'rgba(255,255,255,0.05)' }}
        >
          Laisser un avis
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <a
          href={TRUSTPILOT.profileUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!TRUSTPILOT.profileUrl}
          className={`flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
            TRUSTPILOT.profileUrl ? 'text-white/80 hover:bg-white/10' : 'text-white/25 pointer-events-none'
          }`}
        >
          Voir les avis
        </a>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const hasGoogle = !!ELFSIGHT_GOOGLE_APP;
  const hasTrustpilot = !!TRUSTPILOT.businessUnitId;

  useExternalScript(hasGoogle ? ELFSIGHT_SRC : undefined);
  useExternalScript(hasTrustpilot ? TRUSTPILOT_SRC : undefined);

  // Rien de configuré → invisible en production (visible en dev pour l'aperçu).
  if (!hasGoogle && !hasTrustpilot && !import.meta.env.DEV) return null;

  return (
    <section id="avis" className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
              Avis clients
            </span>
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
          </div>
          <h2
            className="font-mono font-bold uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
          >
            Ils me font<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">
              confiance
            </span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/50 mt-3 sm:mt-4 max-w-md mx-auto">
            Avis vérifiés sur Google et Trustpilot.
          </p>
        </div>

        {/* Avis Google — widget Elfsight */}
        {hasGoogle && (
          <div className="mb-6 sm:mb-8">
            <div className={ELFSIGHT_GOOGLE_APP} data-elfsight-app-lazy="" />
          </div>
        )}

        {/* Avis Trustpilot — masqué en prod tant que non configuré */}
        {(hasTrustpilot || import.meta.env.DEV) && (
          <div className="max-w-2xl mx-auto">
            <TrustpilotCard configured={hasTrustpilot} />
          </div>
        )}
      </div>
    </section>
  );
}
