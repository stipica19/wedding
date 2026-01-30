"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms for staggered animations */
  delay?: number;
  /** Enable shrink-on-scroll scaling */
  shrink?: boolean;
  /** Max ratio to shrink by (0.3 => 70% of original at max) */
  maxShrink?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  shrink = true,
  maxShrink = 0.3,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  // GSAP ScrollTrigger reveal with reverse on scroll up
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 24 });
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: (delay || 0) / 1000,
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        end: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  useEffect(() => {
    if (!shrink) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const h = rect.height || window.innerHeight;
      // progress: 0 when section top is at or below viewport top; 1 when we've scrolled past its full height
      const raw = (0 - rect.top) / h;
      const progress = Math.max(0, Math.min(raw, 1));
      const s = 1 - progress * maxShrink;
      setScale(s);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        compute();
        ticking = false;
      });
    };

    const onResize = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [shrink, maxShrink]);

  return (
    <div
      ref={ref}
      className={clsx(
        "transform-gpu will-change-[opacity,transform] overflow-hidden",
        className,
      )}
    >
      <div
        className="transform-gpu will-change-transform transition-transform duration-300 ease-out"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
