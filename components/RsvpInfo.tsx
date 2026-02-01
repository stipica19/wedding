import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export default function RsvpInfo() {
  return (
    <Reveal shrink={false} delay={100} className="relative">
      <div className="flex justify-center my-8"></div>
      <div className="rounded-3xl bg-transparent p-2 ">
        <p className="text-[40px] font-great_vibes tracking-tight text-center">
          Veselimo se va
          <span className="font-cherish text-lg">š</span>em dolasku
        </p>
        <Reveal shrink={false} delay={160}>
          <p className="mt-1 text-xs text-black/70 text-center">
            Molimo vas da svoj dolazak potvrdite do 10.07.2026
          </p>
        </Reveal>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button
            asChild
            variant="outline"
            className="h-auto flex-col justify-between rounded-2xl border-(--heart-color)/50 bg-white px-4 py-3 text-left"
          >
            <a href="tel:+436603956035" aria-label="Nazovi Nikolinu">
              <span className="font-semibold">Nikolina</span>
              <span className="text-sm opacity-70">+43 660 3956035</span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-auto flex-col justify-between rounded-2xl border-(--heart-color)/50 bg-white px-4 py-3 text-left"
          >
            <a href="tel:+436601843086" aria-label="Nazovi Ivana">
              <span className="font-semibold">Ivan</span>
              <span className="text-sm opacity-70">+43 660 1843086</span>
            </a>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
