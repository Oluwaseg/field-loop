const items = [
  "Up to 40% of Nigerian harvests lost before reaching consumers",
  "Lagos produces less than 30% of its own food",
  "FieldLoop reduces post-harvest losses from 35% to under 5%",
  "IoT sensors cut water usage by 25 to 40%",
  "Drone diagnostics detect crop disease weeks earlier than manual inspection",
  "Predictive analytics improve farmer revenue by 15 to 35%",
  "Lagos population projected to exceed 30 million by 2035",
  "Chemical sprays reduced by 60% with targeted drone intervention",
];

export function Ticker() {
  const all = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-leaf-900 py-4 text-primary-foreground">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-leaf-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-leaf-900 to-transparent" />
      <div className="flex w-max animate-marquee gap-12 pr-12 text-sm">
        {all.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-amber-brand" />
            <span className="text-white/80">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}