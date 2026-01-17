"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Reveal from "@/components/Reveal";

import { Plus, X, UtensilsCrossed, BellRing, Church } from "lucide-react";
import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/MapClient"), {
  ssr: false,
  loading: () => <div className="h-[320px] w-full rounded-2xl bg-black/5" />,
});
type Status = "YES" | "NO";

export default function HomePage() {
  const [status, setStatus] = useState<Status>("YES");
  const [guests, setGuests] = useState<string[]>([""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [heroScale, setHeroScale] = useState(1);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const maxShrink = 0.3; // shrink up to 70% of original

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

  function addGuest() {
    setGuests((prev) => (prev.length >= 20 ? prev : [...prev, ""]));
  }

  function updateGuest(i: number, value: string) {
    setGuests((prev) => prev.map((g, idx) => (idx === i ? value : g)));
  }

  function removeGuest(i: number) {
    setGuests((prev) => {
      const next = prev.filter((_, idx) => idx !== i);
      return next.length ? next : [""];
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrMsg(null);
    setOkMsg(null);

    const cleanedGuests = guests.map((g) => g.trim()).filter(Boolean);
    if (cleanedGuests.length === 0) {
      setErrMsg("Upiši barem jedno ime.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          guests: cleanedGuests,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrMsg("Greška pri slanju. Pokušaj ponovno.");
        return;
      }

      setOkMsg("Hvala! Vaš odgovor je spremljen.");
      setStatus("YES");
      setGuests([""]);
      setMessage("");
    } catch {
      setErrMsg("Greška na mreži. Pokušaj ponovno.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f3] ">
      <main className="mx-auto w-full max-w-4xl">
        <Card className="overflow-hidden rounded-3xl border-black/10 shadow-sm">
          <CardContent className="p-0 sm:p-5">
            {/* HERO */}
            <section
              ref={heroRef}
              className="text-center flex flex-col items-center   min-h-[70vh] sm:min-h-fit"
            >
              <div
                className="mx-auto mb-0 pt-22 flex justify-center"
                style={{
                  transform: `scale(${heroScale})`,
                  transformOrigin: "center",
                  willChange: "transform",
                }}
              >
                <Image
                  src="/crkva.png"
                  alt="Crkva"
                  width={310}
                  height={310}
                  className="h-auto w-[310px] sm:w-[410px]"
                  priority
                />
              </div>

              <h1
                className="text-6xl font-patrick tracking-tight sm:text-6xl"
                style={{
                  transform: `scale(${heroScale})`,
                  transformOrigin: "center",
                  willChange: "transform",
                }}
              >
                Nikolina <span className="font-cherish"> &amp;</span> Ivan
              </h1>
            </section>

            {/* GRID: Raspored + RSVP info */}
            <section className="mt-10 grid gap-4 md:grid-cols-1">
              {/* Left: schedule */}
              <Reveal>
                <Card className="rounded-3xl border-black/10">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white">
                          <Church className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-wide">
                            18:00 CRKVA
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-black/80">
                            “<strong>UZNESENJA BLAŽENE DJEVICE MARIJE</strong>”
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white">
                          <UtensilsCrossed className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold tracking-wide">
                            20:00 Svečana večera
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-black/80">
                            U svadbenom salonu “<strong>RITUAL</strong>”
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Right: RSVP info */}
              <Reveal delay={100}>
                <Card className="rounded-3xl border-black/10">
                  <CardContent className="p-6">
                    <p className="text-3xl font-patrick tracking-tight">
                      Veselimo se va
                      <span className="font-cherish text-lg">š</span>em dolasku
                    </p>
                    <p className="mt-1 text-xs text-black/70">
                      Molimo vas da svoj dolazak potvrdite do 10.07.2026
                    </p>

                    <div className="mt-5 grid gap-3">
                      <Button
                        asChild
                        variant="outline"
                        className="h-auto justify-between rounded-2xl border-black/10 bg-white px-4 py-3 text-left"
                      >
                        <a
                          href="tel:+436603956035"
                          aria-label="Nazovi Nikolina"
                        >
                          <span className="font-semibold">Nikolina</span>
                          <span className="text-sm opacity-70">
                            +43 660 3956035
                          </span>
                        </a>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="h-auto justify-between rounded-2xl border-black/10 bg-white px-4 py-3 text-left"
                      >
                        <a href="tel:+436601843086" aria-label="Nazovi Ivan">
                          <span className="font-semibold">Ivan</span>
                          <span className="text-sm opacity-70">
                            +43 660 1843086
                          </span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </section>

            {/* MAP */}
            <Reveal>
              <h3 className="mt-10 text-center text-lg font-semibold">
                Lokacije
              </h3>
            </Reveal>

            <section className="mt-4">
              <Reveal>
                <Card className="rounded-3xl border-black/10">
                  <CardContent className="p-4 sm:p-6">
                    <MapClient />
                  </CardContent>
                </Card>
              </Reveal>
            </section>

            {/* RSVP FORM */}
            <section className="mt-6">
              <Reveal>
                <Card className="rounded-3xl border-black/10">
                  <CardContent className="p-6">
                    <form onSubmit={onSubmit} className="space-y-6">
                      {/* Status */}
                      <div className="space-y-2">
                        <Label>Dolazak</Label>
                        <RadioGroup
                          value={status}
                          onValueChange={(v) => setStatus(v as Status)}
                          className="flex flex-wrap gap-6"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="YES" id="att_yes" />
                            <Label htmlFor="att_yes">Dolazimo</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="NO" id="att_no" />
                            <Label htmlFor="att_no">Ne dolazimo</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Guests multi-input */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <Label>Imena gostiju</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={addGuest}
                            className="rounded-xl border-black/10"
                            aria-label="Dodaj osobu"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {guests.map((g, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Input
                                value={g}
                                onChange={(e) => updateGuest(i, e.target.value)}
                                placeholder="Ime i prezime"
                                autoComplete="name"
                                className="h-12 rounded-2xl border-black/10 bg-white"
                                required={i === 0} // barem prvi required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeGuest(i)}
                                className="h-12 w-12 rounded-2xl border-black/10"
                                aria-label="Ukloni osobu"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <p className="text-xs text-black/70">
                          Klikni + za dodavanje još jedne osobe.
                        </p>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="note">Poruka (opcionalno)</Label>
                        <Textarea
                          id="note"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          className="rounded-2xl border-black/10 bg-white"
                        />
                      </div>

                      {errMsg ? (
                        <div className="rounded-2xl border border-red-500/30 bg-red-50 px-4 py-3 text-sm text-red-700">
                          {errMsg}
                        </div>
                      ) : null}

                      {okMsg ? (
                        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                          {okMsg}
                        </div>
                      ) : null}

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-2xl py-6 text-base"
                      >
                        {loading ? "Šaljem..." : "Potvrdi"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </Reveal>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
