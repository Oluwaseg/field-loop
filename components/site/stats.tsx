import { motion } from "framer-motion";

const stats = [
  { n: "40%", l: "Reduction in operational costs" },
  { n: "60%", l: "Decrease in crop loss" },
  { n: "50%", l: "Improved resource efficiency" },
  { n: "10K+", l: "Farmers empowered" },
];

export function Stats() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-x mx-auto grid w-full max-w-7xl gap-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-leaf-500 hover:shadow-[0_20px_50px_-30px_oklch(0.4_0.15_150/0.5)]"
          >
            <div className="font-display text-5xl text-leaf-700">{s.n}</div>
            <div className="mt-3 text-sm text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}