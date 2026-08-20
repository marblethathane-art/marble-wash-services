import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import logo from "@/assets/logo.png";
import basket from "@/assets/basket.jpg";
import ironed from "@/assets/ironed.jpg";
import folded from "@/assets/folded.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Book Laundry | Marble Wash Services" },
      {
        name: "description",
        content:
          "Book your laundry with Marble Wash Services: choose washing, ironing, folding or all-inclusive, set drop-off and pick-up times, and see your total in rands.",
      },
      { property: "og:title", content: "Book Laundry | Marble Wash Services" },
      {
        property: "og:description",
        content:
          "Washing R30/kg, ironing R25/kg, folding R20/kg, all-inclusive R65/kg. Book drop-off and pick-up online.",
      },
    ],
  }),
  component: BookingPage,
});

type Service = {
  id: string;
  name: string;
  blurb: string;
  rate: number;
};

const SERVICES: Service[] = [
  { id: "wash", name: "Washing", blurb: "Machine washed and dried", rate: 30 },
  { id: "iron", name: "Ironing", blurb: "Crisp, professional pressing", rate: 25 },
  { id: "fold", name: "Folding", blurb: "Neatly folded and bundled", rate: 20 },
  {
    id: "all",
    name: "All-inclusive",
    blurb: "Washing, ironing and folding",
    rate: 65,
  },
];

const rand = (value: number) =>
  `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const GALLERY = [
  { src: basket, alt: "Laundry basket filled with fresh clean linen", caption: "Washing" },
  { src: ironed, alt: "Freshly ironed shirts hanging in a neat row", caption: "Ironing" },
  { src: folded, alt: "Neatly folded cotton towels stacked on a wooden surface", caption: "Folding" },
];

function BookingPage() {
  const [serviceId, setServiceId] = useState("all");
  const [kg, setKg] = useState(5);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickUp, setPickUp] = useState("");

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[3]!;
  const total = useMemo(() => service.rate * kg, [service, kg]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !dropOff || !pickUp) {
      toast.error("Please fill in your details and both times.");
      return;
    }
    toast.success(
      `Booking received, ${name}. ${service.name} for ${kg}kg — ${rand(total)}.`,
    );
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-40">
      <header className="px-6 pt-8 pb-6">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <img
            src={logo}
            alt="Marble Wash Services logo"
            width={512}
            height={512}
            className="size-12 rounded-2xl bg-linen p-1 ring-1 ring-border"
          />
          <div>
            <h1 className="font-serif text-2xl leading-none font-medium">
              Marble Wash Services
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Freshly pressed, neatly folded.
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={submit} className="mx-auto max-w-md space-y-8 px-4">
        <section className="space-y-4">
          <h2 className="px-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Select service
          </h2>
          <div className="grid gap-3">
            {SERVICES.map((s) => {
              const selected = s.id === serviceId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceId(s.id)}
                  aria-pressed={selected}
                  className={`flex items-center justify-between rounded-2xl p-4 text-left ring-1 transition-transform active:scale-[0.98] ${
                    selected
                      ? "bg-primary text-primary-foreground ring-primary shadow-lg"
                      : "bg-card ring-border"
                  }`}
                >
                  <div>
                    <h3 className="text-lg leading-none font-medium">{s.name}</h3>
                    <p
                      className={`mt-1 text-sm ${selected ? "opacity-75" : "text-muted-foreground"}`}
                    >
                      {s.blurb}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-medium">{rand(s.rate)}</span>
                    <span className="text-[10px] tracking-wider uppercase opacity-60">
                      per kg
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between px-2">
            <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Weight
            </h2>
            <span className="text-xs text-muted-foreground">Minimum 2 kg</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-card p-6 ring-1 ring-border">
            <button
              type="button"
              aria-label="Decrease weight"
              onClick={() => setKg((k) => Math.max(2, k - 1))}
              className="grid size-12 place-items-center rounded-full bg-linen text-xl font-medium ring-1 ring-border"
            >
              −
            </button>
            <div className="text-center">
              <span className="font-serif text-4xl font-medium">{kg}</span>
              <span className="ml-1 font-serif text-lg text-muted-foreground">kg</span>
            </div>
            <button
              type="button"
              aria-label="Increase weight"
              onClick={() => setKg((k) => Math.min(40, k + 1))}
              className="grid size-12 place-items-center rounded-full bg-linen text-xl font-medium ring-1 ring-border"
            >
              +
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="px-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Drop-off &amp; pick-up
          </h2>
          <div className="grid gap-3">
            <label className="block rounded-2xl bg-card p-4 ring-1 ring-border">
              <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                Drop-off time
              </span>
              <input
                type="datetime-local"
                value={dropOff}
                onChange={(e) => setDropOff(e.target.value)}
                className="mt-1 w-full bg-transparent font-medium outline-none"
              />
            </label>
            <label className="block rounded-2xl border-l-4 border-accent bg-card p-4 ring-1 ring-border">
              <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground">
                Pick-up time
              </span>
              <input
                type="datetime-local"
                value={pickUp}
                onChange={(e) => setPickUp(e.target.value)}
                className="mt-1 w-full bg-transparent font-medium outline-none"
              />
            </label>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl bg-card p-6 ring-1 ring-border">
          <h2 className="font-serif text-xl font-medium">Your details</h2>
          <label className="block">
            <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
              Full name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Thandi Mokoena"
              className="mt-1 w-full border-b border-border bg-transparent pb-2 font-medium outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
              Phone number
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="082 000 0000"
              className="mt-1 w-full border-b border-border bg-transparent pb-2 font-medium outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
              Address (optional)
            </span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="12 Marble Street"
              className="mt-1 w-full border-b border-border bg-transparent pb-2 font-medium outline-none focus:border-primary"
            />
          </label>
        </section>

        <section className="space-y-3">
          <h2 className="px-2 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            What you get
          </h2>
          <div className="grid gap-3">
            {GALLERY.map((item) => (
              <figure
                key={item.caption}
                className="overflow-hidden rounded-2xl bg-linen ring-1 ring-border"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="p-3 text-sm font-medium">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </form>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-card/90 p-4 pb-8 backdrop-blur-md">
        <div className="mx-auto max-w-md">
          <div className="mb-4 flex items-center justify-between px-2">
            <div>
              <p className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground">
                Total
              </p>
              <span className="font-serif text-2xl font-medium">{rand(total)}</span>
            </div>
            <p className="text-right text-xs text-muted-foreground">
              {kg}kg × {rand(service.rate)}
              <br />
              {service.name}
            </p>
          </div>
          <button
            type="submit"
            onClick={submit}
            className="w-full rounded-2xl bg-primary py-4 font-medium text-primary-foreground shadow-lg transition-transform active:scale-[0.98]"
          >
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  );
}
