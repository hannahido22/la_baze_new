import { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import TextScramble from './TextScramble';

type NavLink =
  | { label: string; id: string; kind: 'scroll' }
  | { label: string; to: string; kind: 'route' };

const navLinks: NavLink[] = [
  { label: 'Expertises', id: 'services', kind: 'scroll' },
  { label: 'Devis', id: 'devis', kind: 'scroll' },
  { label: 'Processus', id: 'process', kind: 'scroll' },
  { label: 'Galerie', id: 'gallery', kind: 'scroll' },
  { label: 'Vidéos', to: '/videos', kind: 'route' },
  { label: 'Contact', id: 'contact', kind: 'scroll' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Défile vers une section. Si on n'est pas sur l'accueil, on y retourne d'abord.
  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    const doScroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 350); // laisse l'accueil se rendre
    } else {
      setTimeout(doScroll, 300); // laisse le menu se fermer
    }
  }, [location.pathname, navigate]);

  const goHome = useCallback(() => {
    setMenuOpen(false);
    if (location.pathname !== '/') navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, navigate]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#140a0f]/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-1.5 sm:py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="cursor-pointer z-50" onClick={goHome}>
            <img
              src="/logo.jpg"
              alt="La Baze Repair"
              className="h-12 sm:h-14 w-auto rounded-xl border border-white/10"
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) =>
              item.kind === 'route' ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                >
                  <TextScramble text={item.label} />
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.id)}
                  className="font-mono text-xs font-medium uppercase tracking-wider text-white/70 hover:text-white transition-colors"
                >
                  <TextScramble text={item.label} />
                </button>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Menu mobile — plein écran, fond opaque */}
      <div
        className={`md:hidden fixed inset-0 z-[60] bg-[#140a0f] flex flex-col items-center justify-center gap-5 transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Bouton fermer */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Fermer le menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {navLinks.map((item, i) => {
          const style = {
            transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
            opacity: menuOpen ? 1 : 0,
            transition: `all 0.4s ease ${i * 0.08}s`,
          } as const;
          const cls = 'block font-mono text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white/90 hover:text-electric-blue transition-colors py-3 sm:py-4';
          return item.kind === 'route' ? (
            <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)} className={cls} style={style}>
              {item.label}
            </Link>
          ) : (
            <button key={item.label} onClick={() => scrollTo(item.id)} className={cls} style={style}>
              {item.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
