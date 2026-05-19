import { useRef, useEffect, useCallback } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function TextScramble({ text, className = '' }: TextScrambleProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const originalText = useRef(text);
  const frameRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  const scramble = useCallback(() => {
    if (!elRef.current) return;
    const el = elRef.current;
    let iteration = 0;
    const maxIterations = text.length * 3;

    const animate = () => {
      if (!isHovering.current) {
        el.textContent = originalText.current;
        return;
      }

      el.textContent = originalText.current
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) return originalText.current[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration++;

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        el.textContent = originalText.current;
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [text]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handleEnter = () => {
      isHovering.current = true;
      scramble();
    };

    const handleLeave = () => {
      isHovering.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      el.textContent = originalText.current;
    };

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [scramble]);

  return (
    <span ref={elRef} className={`cursor-pointer inline-block ${className}`}>
      {text}
    </span>
  );
}
