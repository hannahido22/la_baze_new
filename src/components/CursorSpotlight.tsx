import { useEffect, useRef } from 'react';

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const SIZE = 1200;
const HALF = SIZE / 2;

export default function CursorSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice) return;

    let rafId: number | null = null;
    let pendingX = window.innerWidth / 2;
    let pendingY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        if (divRef.current) {
          divRef.current.style.transform = `translate(${pendingX - HALF}px, ${pendingY - HALF}px)`;
        }
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: 'none',
        zIndex: 20,
        background: `radial-gradient(${HALF}px circle at center, rgba(26, 79, 214, 0.12), transparent 60%)`,
        willChange: 'transform',
        transform: `translate(${(typeof window !== 'undefined' ? window.innerWidth / 2 : HALF) - HALF}px, ${(typeof window !== 'undefined' ? window.innerHeight / 2 : HALF) - HALF}px)`,
      }}
    />
  );
}
