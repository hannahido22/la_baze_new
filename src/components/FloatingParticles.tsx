import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Particle {
  element: HTMLDivElement;
}

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = isTouchDevice ? 20 : 35;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement('div');
      const size = isTouchDevice ? Math.random() * 5 + 3 : Math.random() * 8 + 4;
      const isCircle = Math.random() > 0.35;
      const isBlue = Math.random() > 0.5;
      const opacity = Math.random() * 0.35 + 0.2;
      const glowSize = Math.random() * 12 + 6;

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
      `;

      container.appendChild(el);

      // Float movement
      gsap.to(el, {
        y: `+=${Math.random() * 80 - 40}`,
        x: `+=${Math.random() * 80 - 40}`,
        duration: Math.random() * 5 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 4,
      });

      // Pulse opacity
      gsap.to(el, {
        opacity: Math.random() * 0.2 + 0.15,
        scale: Math.random() * 0.4 + 0.9,
        duration: Math.random() * 2.5 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2,
      });

      // Slow rotation for non-circles
      if (!isCircle) {
        gsap.to(el, {
          rotation: Math.random() * 360,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          ease: 'none',
        });
      }

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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
    />
  );
}
