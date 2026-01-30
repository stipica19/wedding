"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Reveal from "@/components/Reveal";
import { Plus, X } from "lucide-react";

type Status = "YES" | "NO";

export default function RsvpForm() {
  const [status, setStatus] = useState<Status>("YES");
  const [guests, setGuests] = useState<string[]>([""]);
  const [message, setMessage] = useState("");
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [website, setWebsite] = useState("");

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

    const nameRegex = /^[A-Za-zÀ-žČĆĐŠŽčćđšž .'’-]{2,60}$/;

    for (const n of cleanedGuests) {
      if (!nameRegex.test(n)) {
        setErrMsg("Ime smije sadržavati samo slova i osnovne znakove (.-' ).");
        return;
      }
    }
    if (message.length > 40) {
      setErrMsg("Poruka može imati max 40 znakova.");
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

          website,
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
      setChildrenCount(0);
    } catch {
      setErrMsg("Greška na mreži. Pokušaj ponovno.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal shrink={false}>
      <div className="rounded-3xl mt-2 bg-trasparent p-2 ">
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Status */}
          <div className="space-y-6">
            <Label className="font-400 uppercase">Potvrda dolaska</Label>
            <RadioGroup
              value={status}
              onValueChange={(v) => setStatus(v as Status)}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="YES" id="att_yes" />
                <Label htmlFor="att_yes">Dolazim(o)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="NO" id="att_no" />
                <Label htmlFor="att_no">Ne dolazim(o)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Guests multi-input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label>Podaci o gostima</Label>
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

            <input
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="space-y-3">
              {guests.map((g, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={g}
                    onChange={(e) => updateGuest(i, e.target.value)}
                    placeholder="Ime i prezime"
                    autoComplete="name"
                    className="h-12 rounded-2xl border-black/10 bg-white"
                    required={i === 0}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeGuest(i)}
                    className="h-12 w-12 rounded-2xl border-black/10"
                    aria-label="Ukloni osobuu"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-xs text-black/70">
              Klikni + za dodavanje još jedne osobe
            </p>
          </div>

          {/* Children count */}
          {/* <div className="space-y-2">
            <Label htmlFor="childrenCount">Broj djece</Label>
            <Input
              id="childrenCount"
              type="number"
              min={0}
              step={1}
              value={childrenCount}
              onChange={(e) =>
                setChildrenCount(
                  Math.max(0, Math.floor(Number(e.target.value || 0))),
                )
              }
              className="h-12 rounded-2xl border-black/10 bg-white"
              style={{ maxWidth: "160px" }}
            />
          </div> */}

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
            className="w-full z-10 mb-10 rounded-2xl py-6 text-base bg-neutral-600 text-white  focus:ring-4 focus:ring-[var(--color-wedding-blue-soft)/30]"
          >
            {loading ? "Šaljem..." : "Potvrdi"}
          </Button>
        </form>
      </div>
    </Reveal>
  );
}
