import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertises = [
  {
    title: 'Téléphone',
    subtitle: 'iPhone · Samsung · Xiaomi · Google · Autre',
    items: ['Écran cassé', 'Batterie faible', 'Caméra', 'Port de charge', 'Vitre arrière'],
    accentFrom: 'rgba(26, 79, 214, 0.2)',
    accentTo: 'rgba(34, 211, 238, 0.1)',
    iconColor: '#1a4fd6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="5" y="1" width="14" height="22" rx="3" />
        <line x1="10" y1="18" x2="14" y2="18" strokeWidth="2" />
      </svg>
    ),
    gridClass: 'md:col-span-2',
  },
  {
    title: 'Microsoudure',
    subtitle: 'Carte mère · Composants',
    items: ['Carte mère', 'Puces & composants', 'Court-circuit', 'Pistes brûlées', 'Connecteurs'],
    accentFrom: 'rgba(241, 90, 36, 0.2)',
    accentTo: 'rgba(239, 68, 68, 0.1)',
    iconColor: '#f15a24',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    gridClass: 'md:col-span-2',
  },
  {
    title: 'Tablette',
    subtitle: 'iPad · Galaxy Tab · Huawei · Autre',
    items: ['Écran tactile', 'Batterie', 'Connecteur de charge', 'Autre'],
    accentFrom: 'rgba(168, 85, 247, 0.2)',
    accentTo: 'rgba(236, 72, 153, 0.1)',
    iconColor: '#a855f7',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="3" y="2" width="18" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
    gridClass: '',
  },
  {
    title: 'PC & Mac',
    subtitle: 'Portable · Bureau · Apple',
    items: ['Écran LCD', 'Dommage liquide', 'Surchauffe', 'Clavier & pavé', 'Ne s\'allume pas'],
    accentFrom: 'rgba(16, 185, 129, 0.2)',
    accentTo: 'rgba(20, 184, 166, 0.1)',
    iconColor: '#10b981',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
    gridClass: '',
  },
  {
    title: 'Console de jeux',
    subtitle: 'PlayStation · Xbox · Nintendo · Steam Deck',
    items: ['Ne s\'allume pas', 'Écran cassé', 'Manettes', 'Surchauffe', 'Lecteur disque', 'Réparation HDMI'],
    accentFrom: 'rgba(245, 158, 11, 0.2)',
    accentTo: 'rgba(251, 191, 36, 0.1)',
    iconColor: '#f59e0b',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <circle cx="7.5" cy="12" r="2" />
        <path d="M15 10h5M15 13h5" />
        <circle cx="17.5" cy="12" r="0.5" fill="currentColor" />
      </svg>
    ),
    gridClass: 'md:col-span-2',
  },
  {
    title: 'Autre',
    subtitle: 'Carte électronique · Appareil divers',
    items: ['Tout type de microsoudure sur carte mère'],
    accentFrom: 'rgba(244, 63, 94, 0.2)',
    accentTo: 'rgba(217, 70, 239, 0.1)',
    iconColor: '#f43f5e',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 sm:w-10 sm:h-10">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" />
        <path d="M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    gridClass: '',
  },
];

const stats = [
  { value: '6+', label: 'Catégories de réparations' },
  { value: '71', label: 'Modèles couverts' },
  { value: '1h', label: 'Devis rapide' },
];

// Detect touch device
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function ExpertisesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      if (statsRef.current) {
        const statEls = Array.from(statsRef.current.querySelectorAll('.stat-item'));
        gsap.fromTo(statEls,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: statsRef.current, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }

      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (isTouchDevice) return;
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    if (isTouchDevice) return;
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section id="services" ref={sectionRef} className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-20 left-10 w-40 sm:w-64 h-40 sm:h-64 bg-electric-blue/5 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 sm:w-80 h-48 sm:h-80 bg-burnt-orange/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-6 sm:mb-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[2px] bg-electric-blue" />
            <span className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-electric-blue">
              Expertises
            </span>
          </div>
          <h2
            className="font-mono font-bold uppercase leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(28px, 6vw, 72px)' }}
          >
            Ce que je<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-400">
              sais réparer
            </span>
          </h2>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 sm:mb-12 max-w-md">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center p-3 sm:p-4 glass-card">
              <div className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-electric-blue">{stat.value}</div>
              <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bento Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          style={{ perspective: isTouchDevice ? 'none' : '1000px' }}
        >
          {expertises.map((exp, i) => (
            <div
              key={exp.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={exp.gridClass}
              style={{ opacity: 0, transformStyle: isTouchDevice ? 'flat' : 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className={`relative h-full glass-card p-5 sm:p-6 md:p-8 overflow-hidden group cursor-default transition-shadow duration-500 hover:shadow-lg ${exp.title === 'Microsoudure' ? 'micro-glow' : ''}`}>
                {/* Gradient bg on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to bottom right, ${exp.accentFrom}, ${exp.accentTo})`,
                  }}
                />

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                />

                <div className="relative z-10">
                  {exp.title === 'Microsoudure' && (
                    <div className="absolute -top-1 -right-1 sm:top-0 sm:right-0 z-20">
                      <span className="font-mono text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 rounded bg-[#f15a24]/30 text-[#ff9a70] border border-[#f15a24]/50 shadow-[0_0_8px_rgba(241,90,36,0.3)]">
                        Spécialité
                      </span>
                    </div>
                  )}
                  <div className="mb-3 sm:mb-4" style={{ color: exp.iconColor }}>
                    {exp.icon}
                  </div>

                  <h3 className="font-mono text-lg sm:text-xl md:text-2xl font-bold uppercase mb-1 tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="font-mono text-[10px] sm:text-[11px] text-white/40 mb-3 sm:mb-5 tracking-wider">
                    {exp.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.items.map((item, j) => (
                      <span
                        key={j}
                        className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 border border-white/10 rounded-full font-mono text-[9px] sm:text-[10px] text-white/60 group-hover:bg-white/10 group-hover:text-white/80 group-hover:border-white/20 transition-all duration-300"
                        style={{ transitionDelay: `${j * 40}ms` }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 w-6 sm:w-8 h-6 sm:h-8 rounded-full blur-md"
                    style={{ background: exp.accentFrom }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
