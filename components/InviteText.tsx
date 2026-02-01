"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function InviteText() {
  const wrapRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      text,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
        } else {
          tl.reverse();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(wrap);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <section ref={wrapRef} className="mt-6">
      <p
        ref={textRef}
        className="text-[17px] font-della text-center max-w-lg mx-auto px-4 sm:px-0 [-webkit-font-smoothing:antialiased]"
      >
        POZIVAMO VAS DA SVOJIM DOLASKOM ULJEPŠATE NAŠE VJENČANJE
      </p>
    </section>
  );
}
