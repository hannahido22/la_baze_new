import { useRef, useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

interface MonospacedDecoderProps {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
  triggerRef?: RefObject<HTMLElement | null>;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function MonospacedDecoder({ text, className = '', delay = 0, onComplete, triggerRef }: MonospacedDecoderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const letters = text.split('');
    const spans: HTMLSpanElement[] = [];

    letters.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : chars[Math.floor(Math.random() * chars.length)];
      span.style.display = 'inline-block';
      span.style.minWidth = char === ' ' ? '0.3em' : '0';
      span.style.opacity = '0';
      container.appendChild(span);
      spans.push(span);
    });

    // Build timeline but don't play yet if scroll trigger is used
    const tl = gsap.timeline({
      delay,
      paused: !!triggerRef?.current,
    });

    tl.to(spans, {
      opacity: 1,
      duration: 0.01,
      stagger: 0.008,
    });

    spans.forEach((span, i) => {
      const finalChar = letters[i];
      if (finalChar === ' ') {
        tl.to(span, { opacity: 1, duration: 0.01 }, `-=${0.02}`);
        return;
      }

      const scrambleDuration = 0.08;
      const scrambleSteps = 2;

      for (let step = 0; step < scrambleSteps; step++) {
        tl.to(span, {
          duration: scrambleDuration / scrambleSteps,
          onStart: () => {
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
          },
          ease: 'none',
        });
      }

      tl.to(span, {
        duration: 0.05,
        onStart: () => {
          span.textContent = finalChar;
        },
      });
    });

    if (onComplete) {
      tl.eventCallback('onComplete', onComplete);
    }

    tlRef.current = tl;

    // If triggerRef provided, use ScrollTrigger to start
    let st: ScrollTrigger | null = null;
    if (triggerRef?.current) {
      st = ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none none',
        onEnter: () => {
          tl.play();
        },
      });
    }

    return () => {
      tl.kill();
      if (st) st.kill();
    };
  }, [text, delay, onComplete, triggerRef]);

  return (
    <div ref={containerRef} className={`font-mono ${className}`}>
      {text}
    </div>
  );
}
