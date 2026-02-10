'use client';
import Hero from '@/components/Hero';
import EventDate from '@/components/EventDate';
import Schedule from '@/components/Schedule';
import RsvpInfo from '@/components/RsvpInfo';
import RsvpForm from '@/components/RsvpForm';
import FooterNote from '@/components/FooterNote';
import BgMusic from '@/components/bgMusic';
import Preloader from '@/components/Preloader';
import { useEffect, useRef, useState } from 'react';
import InviteText from '@/components/InviteText';
import { is } from 'zod/locales';

export default function HomePage() {
  const leftName = 'Nikolina';
  const rightName = 'Ivan';

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
    }, 1200);

    return () => {
      if (autoOpenRef.current) {
        window.clearTimeout(autoOpenRef.current);
        autoOpenRef.current = null;
      }
    };
  }, [hideOverlay, isOpen]);

  useEffect(() => {
    if (!hideOverlay) {
      // lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      // unlock scroll
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [hideOverlay]);
  return (
    <>
      {!hideOverlay && (
        <div className="envOverlay">
          <div className={`wrapper ${isOpen ? 'open' : ''}`} onClick={openEnvelope}>
            <div className="lid one"></div>
            <div className="lid two"></div>
            <div className="envelope"></div>
            <div className="texture"></div>

            <div className="seal">
              <img src="/pecat.png" alt="pečat" className="seal-img" />
            </div>

            <img src="/pozivnica.webp" alt="Slika" className="letter-n" />
          </div>
        </div>
      )}
      <main
        style={{
          opacity: hideOverlay ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}
        className="overflow-hidden">
        <BgMusic />
        <div className="bg-white p-2">
          {' '}
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
            <img src="/splash.png" alt="" className=" absolute bottom-0 z-10 opacity-90" />
          </section>
          <section className="mt-6 relative max-w-xl  mx-auto">
            <RsvpForm />
            <img src="/splash.png" alt="" className=" absolute bottom-0 left-0  z-10 opacity-90" />
          </section>
        </div>

        <div>
          <FooterNote />
        </div>
      </main>
    </>
  );
}
