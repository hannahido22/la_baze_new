import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Particle {
  element: HTMLDivElement;
}

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Perf : désactivé sur mobile et en mode "réduire les animations".
    // Des particules animées derrière des cartes en flou forcent un recalcul
    // du flou à chaque frame — coûteux, surtout sur téléphone.
    if (isTouchDevice || reduceMotion) return;

    const particleCount = 14;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 7 + 4;
      const isCircle = Math.random() > 0.35;
      const isBlue = Math.random() > 0.5;
      const opacity = Math.random() * 0.3 + 0.18;
      const glowSize = Math.random() * 10 + 6;

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${isBlue ? `rgba(26, 79, 214, ${opacity})` : `rgba(241, 90, 36, ${opacity})`};
        border-radius: ${isCircle ? '50%' : '3px'};
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 ${glowSize}px ${isBlue ? `rgba(26, 79, 214, 0.5)` : `rgba(241, 90, 36, 0.5)`};
        will-change: transform;
      `;

      container.appendChild(el);

      // Déplacement doux (transform uniquement = composité, peu coûteux).
      gsap.to(el, {
        y: `+=${Math.random() * 70 - 35}`,
        x: `+=${Math.random() * 70 - 35}`,
        duration: Math.random() * 5 + 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 4,
      });

      // Pulsation d'opacité (composité). Pas de scale : éviterait de re-rasteriser
      // l'ombre portée à chaque frame.
      gsap.to(el, {
        opacity: Math.random() * 0.2 + 0.12,
        duration: Math.random() * 2.5 + 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });

      particles.push({ element: el });
    }

    particlesRef.current = particles;

    return () => {
      particles.forEach((p) => {
        gsap.killTweensOf(p.element);
        p.element.remove();
      });
    };
  }, []);

  if (isTouchDevice || reduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
    />
  );
}
