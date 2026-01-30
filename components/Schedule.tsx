import { Church, UtensilsCrossed, MapPin, LucideIcon } from "lucide-react";
import prsten from "@/public/prstenovi.png";
import bestek from "@/public/bestek.png";
import Reveal from "./Reveal";

type ScheduleItemData = {
  href: string;
  img: any;
  title: string;
  place: string;
  address: string;
};

function ScheduleItem({ href, img, title, place, address }: ScheduleItemData) {
  return (
    <Reveal shrink={false}>
      <a href={href} className="">
        <div className="flex gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl  bg-white">
            <img src={img.src} alt={title} className="h-9 w-10" />
          </div>
          <div>
            <div className="text-[16px] font-bold  tracking-wide font-della uppercase">
              {title}
            </div>
            <p className="mt-1 text-[16px] font-extrabold  leading-relaxed text-black/80 font-della">
              <strong>{place}</strong>
            </p>
            {/* <div className="flex flex-row items-center gap-1 mt-2">
                <MapPin className="w-4 h-4" style={{ color: "var(--blush)" }} />{" "}
                {address}
              </div> */}
          </div>
        </div>
      </a>
    </Reveal>
  );
}

type ScheduleProps = {
  items?: ScheduleItemData[];
};

export default function Schedule({ items }: ScheduleProps) {
  const defaults: ScheduleItemData[] = [
    {
      href: "https://www.google.com/maps/place/Crkva+Uznesenja+Bla%C5%BEene+Djevice+Marije/@43.9387542,17.5823687,1121m/data=!3m2!1e3!4b1!4m6!3m5!1s0x475f0cb9d14f3971:0x3eb86acfc5cc03c8!8m2!3d43.9387542!4d17.5823687!16s%2Fm%2F0q3y0jq?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D",
      img: prsten,
      title: "18:00 CRKVA",
      place: "”UZNESENJE BLAŽENE DJEVICE MARIJE”",
      address: "Uskoplje",
    },
    {
      href: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x47739790f76bb663:0x9844be468799f354?sa=X&ved=1t:8290&ictx=111",
      img: bestek,
      title: "20:00 Svečana večera",
      place: "U SVADBENOM SALONU ”RITUAL”",
      address: "Uskoplje",
    },
  ];

  const toRender = items && items.length ? items : defaults;

  return (
    <div className="space-y-10 flex flex-col gap-1">
      {toRender.map((it, idx) => (
        <ScheduleItem key={`${it.title}-${idx}`} {...it} />
      ))}
    </div>
  );
}
