import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  SECTION AVIS (Google + Trustpilot)
//
//  GOOGLE     → widget Elfsight (apparence réglable sur elfsight.com).
//  TRUSTPILOT → widget TrustBox (businessUnitId ci-dessous).
//               Pour changer l'apparence : Trustpilot → Showcase → TrustBox,
//               choisissez un gabarit et remplacez templateId / hauteur.
//
//  (Le script d'INVITATION Trustpilot — qui collecte les avis — est séparé,
//   il se trouve dans index.html.)
// ─────────────────────────────────────────────────────────────

// Avis Google — app Elfsight. Vide = masqué.
const ELFSIGHT_GOOGLE_APP = 'elfsight-app-191fd064-b825-477f-8c77-5732099b0a34';
const ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';

// Avis Trustpilot — TrustBox.
const TRUSTPILOT = {
  businessUnitId: 'IFzOYGi3O4CdjGiB',
  templateId: '53aa8912dec7e10d38f59f36', // gabarit « Carrousel »
  height: '240px',
  profileUrl: '', // optionnel : lien de secours vers la page Trustpilot
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

function GoogleMark() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function PlatformBlock({
  mark,
  label,
  children,
}: {
  mark: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        {mark}
        <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white">{label}</span>
      </div>
      <div className="relative w-full">{children}</div>
    </div>
  );
}

export default function ReviewsSection() {
  const hasGoogle = !!ELFSIGHT_GOOGLE_APP;
  const hasTrustpilot = !!TRUSTPILOT.businessUnitId;
  const tpRef = useRef<HTMLDivElement>(null);

  useExternalScript(hasGoogle ? ELFSIGHT_SRC : undefined);
  useExternalScript(hasTrustpilot ? TRUSTPILOT_SRC : undefined);

  // TrustBox : (ré)initialise le widget une fois le script prêt.
  useEffect(() => {
    if (!hasTrustpilot || !tpRef.current) return;
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
  }, [hasTrustpilot]);

  // Rien de configuré → invisible en production (visible en dev pour l'aperçu).
  if (!hasGoogle && !hasTrustpilot && !import.meta.env.DEV) return null;

  return (
    <section id="avis" className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto relative z-10">
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

        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Avis Google — Elfsight */}
          {hasGoogle && (
            <PlatformBlock mark={<GoogleMark />} label="Google">
              <div className={`${ELFSIGHT_GOOGLE_APP} w-full min-h-[120px]`} data-elfsight-app-lazy="" />
            </PlatformBlock>
          )}

          {/* Avis Trustpilot — TrustBox */}
          {hasTrustpilot && (
            <PlatformBlock
              mark={<Star className="w-5 h-5" style={{ color: '#00b67a', fill: '#00b67a' }} strokeWidth={0} />}
              label="Trustpilot"
            >
              <div
                ref={tpRef}
                className="trustpilot-widget w-full min-h-[120px]"
                data-locale="fr-FR"
                data-template-id={TRUSTPILOT.templateId}
                data-businessunit-id={TRUSTPILOT.businessUnitId}
                data-style-height={TRUSTPILOT.height}
                data-style-width="100%"
                data-theme="dark"
              >
                <a href={TRUSTPILOT.profileUrl || 'https://www.trustpilot.com'} target="_blank" rel="noopener noreferrer">Trustpilot</a>
              </div>
            </PlatformBlock>
          )}
        </div>
      </div>
    </section>
  );
}
