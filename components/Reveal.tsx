"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import clsx from "clsx";

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
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

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
        "transform-gpu transition-all duration-700 ease-out will-change-[opacity,transform]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
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
