"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type PreloaderProps = {
  leftName: string;
  rightName: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  duration?: number; // total animation duration approx
};

export default function Preloader({
  leftName,
  rightName,
  imageSrc = "/crkva.png",
  imageAlt = "",
  imageWidth = 220,
  duration = 1200,
}: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const overlayEl = overlayRef.current;
    const imgEl = imgRef.current;
    const titleEl = titleRef.current;
    if (!overlayEl || !imgEl || !titleEl) return;

    const letters = titleEl.querySelectorAll("[data-letter]");
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    gsap.set(overlayEl, { opacity: 1 });
    gsap.set(imgEl, { opacity: 0, y: -20 });
    gsap.set(letters, { opacity: 0, y: -60, rotate: 0 });

    tl.to(imgEl, { opacity: 1, y: 0, duration: 0.7 })
      .to(
        letters,
        {
          opacity: 1,
          y: 0,
          rotate: () => gsap.utils.random(-8, 8),
          duration: 0.9,
          ease: "bounce.out",
          stagger: { each: 0.06, from: "center" },
        },
        "<+0.1",
      )
      .to(
        overlayEl,
        { opacity: 0, duration: 0.5 },
        `+=${duration / 1000 - 1.2}`,
      )
      .add(() => setDone(true));

    return () => {
      tl.kill();
    };
  }, [duration]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf7f3]"
    >
      <div className="text-center">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageWidth}
          className="mx-auto h-auto"
        />
        <h1
          ref={titleRef}
          className="mt-4 text-4xl font-great_vibes tracking-tight"
        >
          {leftName.split("").map((ch, i) => (
            <span key={`pl-l-${i}-${ch}`} data-letter className="inline-block">
              {ch}
            </span>
          ))}
          <span data-letter className="font-cherish inline-block">
            &nbsp;&amp;&nbsp;
          </span>
          {rightName.split("").map((ch, i) => (
            <span key={`pl-r-${i}-${ch}`} data-letter className="inline-block">
              {ch}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
