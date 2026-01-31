import prsten from "@/public/ring.png";

import Reveal from "./Reveal";
import BestekIcon from "./BestekIcon";

type ScheduleItemData = {
  href: string;
  icon: React.ReactNode;
  title: string;
  place: string;
  address: string;
};

function ScheduleItem({ href, icon, title, place, address }: ScheduleItemData) {
  return (
    <Reveal shrink={false}>
      <a href={href} className="">
        <div className="flex gap-4">
          <div className="mt-1 flex h-13 w-11 items-center justify-center text-(--heart-color) rounded-2xl  bg-white">
            {icon}
          </div>
          <div>
            <div className="text-[16px] font-bold text-(--heart-color)  tracking-wide font-della uppercase">
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
      icon: <img src={prsten.src} alt="ring" className="h-13 w-10" />,
      title: "18:00 VJENČANJE",
      place: "”UZNESENJE BLAŽENE DJEVICE MARIJE”",
      address: "Uskoplje",
    },
    {
      href: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x475f0bbd05ea9035:0x83474cb81240e05b?sa=X&ved=1t:8290&ictx=111",
      icon: <BestekIcon className="h-14 w-11 fill-current" />, // ili stroke-current
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
