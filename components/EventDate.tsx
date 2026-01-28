"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type EventDateProps = {
  date: string;
};

export default function EventDate({ date }: EventDateProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const textEl = textRef.current;
    const lineEl = lineRef.current;
    if (!textEl || !lineEl) return;

    const letters = textEl.querySelectorAll("[data-letter]");

    // Animate divider line grow from center
    gsap.set(lineEl, { scaleX: 0, transformOrigin: "center" });
    gsap.to(lineEl, {
      scaleX: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.15,
    });

    // Falling letters animation with subtle bounce
    gsap.from(letters, {
      opacity: 0,
      y: -50,
      rotation: () => gsap.utils.random(-8, 8),
      duration: 0.8,
      ease: "bounce.out",
      stagger: { each: 0.04, from: "center" },
    });
  }, []);

  return (
    <div className="text-center mb-8 flex flex-col items-center">
      <p
        ref={textRef}
        className="mt-1 font-cherish text-3xl tracking-wide text-wedding-blue"
      >
        {date.split("").map((ch, i) => (
          <span key={`${ch}-${i}`} data-letter className="inline-block">
            {ch}
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
