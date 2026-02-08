"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  leftName: string;
  rightName: string;
  imageSrc: string;
  imageAlt?: string;
  imageWidth?: number;
  animate?: boolean;
};

function AnimatedText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  // Memo da ne radimo split svaki render
  const chars = useMemo(() => Array.from(text), [text]);

  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <span
          key={`${i}-${ch}`}
          data-letter
          className="inline-block iosFontFix"
        >
          {/* čuvamo razmake */}
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero({
  leftName,
  rightName,
  imageSrc,
  imageAlt = "",
  imageWidth = 350,
  animate = false,
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);

  const [heroScale, setHeroScale] = useState(1);

  // Scroll-based scale ONLY for image
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const maxShrink = 0.3; // 1 -> 0.7

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const total = el.offsetHeight || window.innerHeight;
        const scrolled = Math.min(window.scrollY, total);
        const progress = Math.max(0, Math.min(scrolled / total, 1));
        const scale = 1 - progress * maxShrink;

        setHeroScale(scale);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation (slova padaju)
  useEffect(() => {
    const imgEl = heroImgRef.current;
    const titleEl = heroTitleRef.current;
    if (!imgEl || !titleEl) return;

    // Image fade-in
    gsap.set(imgEl, { opacity: 0, y: -12 });
    gsap.to(imgEl, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    const letters = titleEl.querySelectorAll("[data-letter]");

    // reset (da radi i kad se vratiš na stranicu / re-render)
    gsap.set(letters, { clearProps: "transform,opacity" });

    gsap.from(letters, {
      opacity: 0,
      y: -60,
      rotation: () => gsap.utils.random(-10, 10),
      duration: 0.9,
      ease: "bounce.out",
      stagger: { each: 0.06, from: "center" },
      delay: 0.15,
    });
  }, [animate, leftName, rightName]);

  return (
    <section
      ref={heroRef}
      className="text-center flex flex-col items-center min-h-[85vh] sm:min-h-fit overflow-hidden "
    >
      <div
        className="mx-auto mb-6 pb-0.5 pt-10 min-h-[50vh] flex justify-center"
        ref={heroImgRef}
        style={{
          transform: `scale(${heroScale})`,
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageWidth}
          className="h-auto"
          priority
        />
      </div>

      <h1
        ref={heroTitleRef}
        className="text-[60px] font-great_vibes tracking-tight sm:text-4xl text-(--heart-color)"
      >
        <AnimatedText text={`${leftName} & ${rightName}`} />
      </h1>
    </section>
  );
}
