"use client";
import Hero from "@/components/Hero";
import EventDate from "@/components/EventDate";
import Schedule from "@/components/Schedule";
import RsvpInfo from "@/components/RsvpInfo";
import RsvpForm from "@/components/RsvpForm";
import FooterNote from "@/components/FooterNote";
import BgMusic from "@/components/bgMusic";
import Preloader from "@/components/Preloader";
import { useState } from "react";
import InviteText from "@/components/InviteText";

export default function HomePage() {
  const leftName = "Nikolina";
  const rightName = "Ivan";

  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  const [hideOverlay, setHideOverlay] = useState(false);

  function openEnvelope() {
    if (isOpen) return;

    setIsOpen(true); // otvori (flap + letter izlazi)

    // nakon što letter izađe, kuverta ide dolje
    setTimeout(() => setSlide(true), 1900);

    // i onda makni overlay da se pokaže prava pozivnica ispod
    setTimeout(() => setHideOverlay(true), 2700);
  }

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
        className=""
      >
        {/* <img
          src="/okvir.png"
          alt=""
          className="h-50 w-50 absolute -top-10 -right-10 rotate-180 -mb-10 -ml-10 z-10 opacity-40"
        /> */}
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
          <section className="mt-5">
            {/* <img src="/srce.png" alt="" className="opacity-50 w-full" /> */}
          </section>
          <section className="mt-6 relative max-w-xl  mx-auto">
            <RsvpForm />
            {/* <img
              src="/okvir.png"
              alt=""
              className="h-70 w-70 absolute bottom-0 left-0 -mb-10 -ml-10 -z-10 opacity-40"
            /> */}
          </section>
        </div>

        <div>
          <FooterNote />
        </div>
      </main>
    </>
  );
}
