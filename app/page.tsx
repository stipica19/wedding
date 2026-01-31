"use client";
import Hero from "@/components/Hero";
import EventDate from "@/components/EventDate";
import Schedule from "@/components/Schedule";
import RsvpInfo from "@/components/RsvpInfo";
import RsvpForm from "@/components/RsvpForm";
import FooterNote from "@/components/FooterNote";
import BgMusic from "@/components/bgMusic";
import Preloader from "@/components/Preloader";
import { useEffect, useRef, useState } from "react";
import InviteText from "@/components/InviteText";

export default function HomePage() {
  const leftName = "Nikolina";
  const rightName = "Ivan";

  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  const autoOpenRef = useRef<number | null>(null);

  function openEnvelope() {
    if (isOpen) return;

    // ako je auto-open timer aktivan, ugasi ga
    if (autoOpenRef.current) {
      window.clearTimeout(autoOpenRef.current);
      autoOpenRef.current = null;
    }

    setIsOpen(true);
    setTimeout(() => setSlide(true), 1900);
    setTimeout(() => setHideOverlay(true), 2700);
  }
  // auto-open nakon 1.6 sekunde ako korisnik ništa ne napravi
  useEffect(() => {
    if (hideOverlay || isOpen) return;

    autoOpenRef.current = window.setTimeout(() => {
      openEnvelope();
    }, 1000);

    return () => {
      if (autoOpenRef.current) {
        window.clearTimeout(autoOpenRef.current);
        autoOpenRef.current = null;
      }
    };
  }, [hideOverlay, isOpen]);
  return (
    <>
      {!hideOverlay && (
        <div className={`envOverlay ${slide ? "envFadeOut" : ""}`}>
          <div className="envContainer">
            <div
              className={[
                "envelope-wrapper",
                isOpen ? "flap" : "",
                slide ? "slideDown" : "",
              ].join(" ")}
              onClick={openEnvelope}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && openEnvelope()
              }
            >
              <div className="envelope">
                <div className="letter">
                  <div className="text">
                    <img
                      src="/pozivnica.webp"
                      alt="Pozivnica"
                      className="letterImage"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="heart" /> */}
              <div className="seal font-patrick ">
                N <span className="font-cherish ">&</span>I
              </div>
            </div>
          </div>
        </div>
      )}
      <main
        style={{
          opacity: hideOverlay ? 1 : 0,
          transform: hideOverlay ? "translateY(0)" : "translateY(10px)",
          transition: "all 600ms ease",
        }}
        className="overflow-hidden"
      >
        <img
          src="/splash.png"
          alt=""
          className="absolute top-10 rotate-120 z-10 opacity-70 "
        />
        {/* <BgMusic /> */}
        <div className="rounded-3xl bg-transparent p-2 ">
          <Hero
            leftName={leftName}
            rightName={rightName}
            imageSrc="/crkva.png"
            imageAlt="Crkva"
            animate={hideOverlay}
          />
          <InviteText />
          <section className="mt-6">
            <EventDate day="03" month="08" year="2026" />
          </section>

          <section className="mt-0 grid gap-4 md:grid-cols-1 max-w-xl mx-auto">
            <div className="rounded-3xl bg-white p-2 ">
              <Schedule />
            </div>

            <RsvpInfo />
          </section>
          <section className="mt-5 relative">
            <img
              src="/splash.png"
              alt=""
              className=" absolute bottom-0  -z-10 opacity-90"
            />
          </section>
          <section className="mt-6 relative max-w-xl  mx-auto">
            <RsvpForm />
            <img
              src="/splash.png"
              alt=""
              className=" absolute bottom-0 left-0  -z-10 opacity-90"
            />
          </section>
        </div>

        <div>
          <FooterNote />
        </div>
      </main>
    </>
  );
}
