import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, CircuitBoard, ClipboardCheck, Wrench, Undo2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Diagnostic général',
    description: 'Vous décrivez le problème, je fais un premier diagnostic rapide et je vous donne une fourchette de prix approximative.',
    icon: Search,
    iconColor: '#1a4fd6',
    bgClass: 'bg-[#1a4fd6]/10',
    borderClass: 'border-[#1a4fd6]/20',
    hoverBgClass: 'group-hover:bg-[#1a4fd6]/20',
  },
  {
    number: '02',
    title: 'Prise en charge & diagnostic approfondi',
    description: 'Je récupère l\'appareil et effectue un diagnostic complet sur banc isolé. Test de tous les composants pour identifier la source exacte du problème.',
    icon: CircuitBoard,
    iconColor: '#f15a24',
    bgClass: 'bg-[#f15a24]/10',
    borderClass: 'border-[#f15a24]/20',
    hoverBgClass: 'group-hover:bg-[#f15a24]/20',
  },
  {
    number: '03',
    title: 'Devis final',
    description: 'Vous recevez un devis précis avec le prix final et le délai. Aucune réparation n\'est effectuée sans votre accord préalable.',
    icon: ClipboardCheck,
    iconColor: '#a855f7',
    bgClass: 'bg-[#a855f7]/10',
    borderClass: 'border-[#a855f7]/20',
    hoverBgClass: 'group-hover:bg-[#a855f7]/20',
  },
  {
    number: '04',
    title: 'Réparation',
    description: 'Intervention réalisée avec du matériel professionnel sur banc propre. Microsoudure, reballing, remplacement de composants — tout en atelier.',
    icon: Wrench,
    iconColor: '#10b981',
    bgClass: 'bg-[#10b981]/10',
    borderClass: 'border-[#10b981]/20',
    hoverBgClass: 'group-hover:bg-[#10b981]/20',
  },
  {
    number: '05',
    title: 'Restitution',
    description: 'Votre appareil réparé vous est rendu avec une garantie sur l\'intervention. Explication du travail effectué et conseils pour éviter que le problème ne revienne.',
    icon: Undo2,
    iconColor: '#f59e0b',
    bgClass: 'bg-[#f59e0b]/10',
    borderClass: 'border-[#f59e0b]/20',
    hoverBgClass: 'group-hover:bg-[#f59e0b]/20',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = stepsRef.current.filter(Boolean);

      els.forEach((el, i) => {
        const fromX = i % 2 === 0 ? -window.innerWidth : window.innerWidth;
        gsap.fromTo(
          el,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.13,
            ease: 'expo.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-electric-blue mb-3 sm:mb-4">
            Le Processus
          </div>
          <h2
            className="font-mono font-bold uppercase leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
          >
            Mon workflow<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">
              en 5 étapes.
            </span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/60 leading-relaxed max-w-lg mx-auto">
            Pas de frais cachés. Pas de remplacements inutiles. Chaque appareil passe par un diagnostic approfondi
            sur banc propre avant toute intervention.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5 sm:space-y-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                ref={(el) => { stepsRef.current[i] = el; }}
                className="glass-card p-5 sm:p-7 md:p-10 flex gap-4 sm:gap-6 items-start group"
              >
                <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${step.bgClass} border ${step.borderClass} flex items-center justify-center ${step.hoverBgClass} transition-colors`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: step.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <span className="font-mono text-[10px] sm:text-xs font-bold" style={{ color: step.iconColor, opacity: 0.6 }}>
                      {step.number}
                    </span>
                    <h3 className="font-mono text-sm sm:text-base md:text-lg font-bold uppercase text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-mono text-[10px] sm:text-xs md:text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
