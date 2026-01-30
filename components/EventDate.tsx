"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type EventDateProps = {
  day: string;
  month: string;
  year: string;
};

export default function EventDate({ day, month, year }: EventDateProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const textEl = textRef.current;
    const lineEl = lineRef.current;

    if (!wrapperEl || !textEl || !lineEl) return;

    const letters = textEl.querySelectorAll("[data-letter]");

    // initial state (sakriveno)
    gsap.set(lineEl, { scaleX: 0, transformOrigin: "center" });
    gsap.set(letters, { opacity: 0, y: -50 });

    const tl = gsap.timeline({ paused: true });

    tl.to(lineEl, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.out",
    }).to(
      letters,
      {
        opacity: 0.7,
        y: 0,
        rotation: () => gsap.utils.random(-1, 1),
        duration: 1.2,
        ease: "bounce.out",
        stagger: { each: 0.08, from: "center" },
      },
      "-=0.6",
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect(); // okini samo jednom
        }
      },
      { threshold: 0.5 }, // okine kad je 50% u viewportu
    );

    observer.observe(wrapperEl);

    return () => {
      observer.disconnect();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="text-center mb-8 flex flex-col items-center"
    >
      <p
        ref={textRef}
        className="mt-1 font-cherish text-5xl tracking-wide text-wedding-blue"
      >
        {[day, month, year].map((part, i) => (
          <span
            key={`${part}-${i}`}
            data-letter
            className="inline-block opacity-70"
          >
            {part}
            {i < 2 && <span className="mx-3 opacity-70">|</span>}
          </span>
        ))}
      </p>

      <div
        ref={lineRef}
        className="my-2 h-px w-24 mx-auto rounded-full"
        style={{ backgroundColor: "var(--rose-soft)" }}
      />
    </div>
  );
}
