import { motion } from "framer-motion";
import { Container, Eyebrow } from "./container";

const pills = [
  "Climate-smart agriculture",
  "Post-harvest loss reduction",
  "Precision farming",
  "Agri-data analytics",
  "Supply chain innovation",
  "Urban food security",
  "Digital innovation",
];

const facts = [
  { n: "40%", h: "Of Nigerian harvests never reach consumers", b: "Post-harvest losses worth billions of naira annually, caused by poor storage, logistics gaps, and limited market connectivity. FieldLoop Smart Storage reduces this to under 5%." },
  { n: "30%", h: "Of Lagos' food is locally produced", b: "The city imports over 70% of what it consumes. Our precision tools help local farmers grow more, smarter, and more profitably, closing the gap from within." },
  { n: "30M", h: "Lagosians to feed by 2035", b: "Population growth makes food system innovation urgent. FieldLoop's scalable solutions are being built for this challenge right now, starting in Lagos." },
];

export function Impact() {
  return (
    <section id="impact" className="section-pad relative isolate overflow-hidden bg-leaf-900 text-primary-foreground">
      <div className="absolute inset-0 -z-10 opacity-60 [background:radial-gradient(700px_400px_at_85%_15%,oklch(0.5_0.15_150/0.4),transparent_60%),radial-gradient(600px_360px_at_10%_90%,oklch(0.82_0.17_88/0.18),transparent_60%)]" aria-hidden />
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-brand">
              <span className="size-1.5 rounded-full bg-amber-brand" />
              Lagos food security
            </span>
            <h2 className="mt-6 text-balance text-4xl leading-[1.05] text-white sm:text-5xl lg:text-[3.5rem]">
              Lagos has a food crisis.
              <br />
              <span className="italic text-amber-brand">FieldLoop is the fix.</span>
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-white/75">
              <p>
                Lagos, Nigeria's economic capital and Africa's largest city, consumes far more food than it
                produces. With less than 30% of its food supply grown locally and a population projected to
                surpass 30 million by 2035, the pressure on food systems grows every year.
              </p>
              <p>
                FieldLoop's integrated agritech ecosystem directly addresses this gap: reducing supply-chain
                losses, helping farmers produce more with fewer inputs, and connecting harvests to markets with
                speed and efficiency the traditional system cannot match.
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {pills.map((p) => (
                <li key={p} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/80">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {facts.map((f, i) => (
              <motion.div
                key={f.h}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-colors hover:border-amber-brand/40 sm:p-7"
              >
                <div className="font-display text-5xl leading-none text-amber-brand sm:text-6xl">{f.n}</div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">{f.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{f.b}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}