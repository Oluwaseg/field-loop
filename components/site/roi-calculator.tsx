import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Sparkles, ArrowRight, Leaf, Download, Info } from "lucide-react";
import { SECTION_IDS } from '@/lib/site-routes';
import { SectionLink } from '@/components/site/section-link';
import { Container, Eyebrow } from "./container";

const crops = [
  { value: "tomatoes", label: "Tomatoes / Vegetables", lossFloor: 6, upliftMultiplier: 1.25 },
  { value: "maize", label: "Maize / Corn", lossFloor: 4, upliftMultiplier: 1.15 },
  { value: "cassava", label: "Cassava / Root Crops", lossFloor: 3, upliftMultiplier: 1.1 },
  { value: "rice", label: "Rice", lossFloor: 4, upliftMultiplier: 1.18 },
  { value: "pepper", label: "Pepper / Chillies", lossFloor: 5, upliftMultiplier: 1.22 },
  { value: "other", label: "Other", lossFloor: 5, upliftMultiplier: 1.15 },
] as const;

const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(n)));

const formatN = (n: number) => formatNaira(n);

export function RoiCalculator() {
  const [hectares, setHectares] = useState(5);
  const [revenue, setRevenue] = useState(800_000);
  const [lossRate, setLossRate] = useState(30);
  const [crop, setCrop] = useState<(typeof crops)[number]["value"]>("tomatoes");

  const result = useMemo(() => {
    const selected = crops.find((c) => c.value === crop) ?? crops[0];
    const newLoss = Math.max(selected.lossFloor, lossRate * 0.2);
    const lossReduction = Math.max(0, lossRate - newLoss);
    const annualRevenue = revenue * 12;
    const recoveredRevenue = annualRevenue * (lossReduction / 100);
    const marketUplift = annualRevenue * (selected.upliftMultiplier - 1) * 0.4;
    const inputSavings = annualRevenue * 0.06;
    // Platform cost: ~₦18k/ha/month software + onboarding
    const platformCost = hectares * 18_000 * 12;
    const grossUpside = recoveredRevenue + marketUplift + inputSavings;
    const total = grossUpside - platformCost;
    const roiX = platformCost > 0 ? grossUpside / platformCost : 0;
    const paybackMonths = grossUpside > 0 ? Math.max(1, Math.round((platformCost / grossUpside) * 12)) : 0;
    return {
      total,
      grossUpside,
      platformCost,
      annualRevenue,
      roiX,
      paybackMonths,
      recoveredRevenue,
      marketUplift,
      inputSavings,
      newLoss: Math.round(newLoss),
      lossReduction: Math.round(lossReduction),
      cropLabel: selected.label,
    };
  }, [hectares, revenue, lossRate, crop]);

  const downloadSummary = () => {
    const lines = [
      "FieldLoop ROI Estimate",
      "======================",
      `Generated: ${new Date().toLocaleString("en-NG")}`,
      "",
      "INPUTS",
      `- Farm size: ${hectares} hectares`,
      `- Primary crop: ${result.cropLabel}`,
      `- Monthly revenue: ${formatN(revenue)}`,
      `- Annual revenue: ${formatN(result.annualRevenue)}`,
      `- Current post-harvest loss rate: ${lossRate}%`,
      "",
      "PROJECTED OUTCOMES (Year 1)",
      `- New loss rate with FieldLoop: ~${result.newLoss}% (down ${result.lossReduction} pts)`,
      `- Recovered harvest revenue: ${formatN(result.recoveredRevenue)}`,
      `- Better market timing uplift: ${formatN(result.marketUplift)}`,
      `- Input savings (water, fertiliser): ${formatN(result.inputSavings)}`,
      `- Gross upside: ${formatN(result.grossUpside)}`,
      `- FieldLoop platform cost: ${formatN(result.platformCost)}`,
      `- Net year-one upside: ${formatN(result.total)}`,
      `- ROI multiple: ${result.roiX.toFixed(1)}x`,
      `- Estimated payback: ${result.paybackMonths} months`,
      "",
      "ASSUMPTIONS",
      "- Smart storage + logistics cuts losses to ~20% of current rate, floored by crop type.",
      "- Market-timing uplift applies to ~40% of harvest, sized per crop (10–25%).",
      "- Input savings ≈ 6% of annual revenue via precision water and fertiliser.",
      "- Platform cost ≈ ₦18,000 / hectare / month (software, sensors amortised, support).",
      "- All figures are indicative estimates based on early customer benchmarks, not a quote.",
      "",
      "Contact: hello@fieldloop.ng",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fieldloop-roi-${hectares}ha-${crop}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="roi" className="section-pad">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <Eyebrow>ROI Calculator</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl">
              See your potential returns.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Enter your farm details to estimate how much FieldLoop could save, and earn, you in year one.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { Icon: Leaf, k: "Less waste", v: "up to 85% recovered" },
                { Icon: TrendingUp, k: "Higher prices", v: "+15–35% per harvest" },
                { Icon: Sparkles, k: "Lower inputs", v: "−25 to 40% water" },
              ].map(({ Icon, k, v }) => (
                <div key={k} className="rounded-2xl border border-border bg-card p-4">
                  <Icon className="size-5 text-leaf-700" />
                  <div className="mt-3 text-sm font-semibold text-leaf-900">{k}</div>
                  <div className="text-xs text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[2rem] border border-border bg-card ring-soft"
          >
            <div className="flex items-center gap-3 border-b border-border bg-leaf-50/60 px-6 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-leaf-700 text-primary-foreground">
                <Calculator className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-leaf-900">FieldLoop estimator</div>
                <div className="text-xs text-muted-foreground">Indicative, based on early customer benchmarks</div>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:p-8">
              <SliderField
                label="Farm size"
                suffix="hectares"
                min={1}
                max={100}
                value={hectares}
                onChange={setHectares}
                display={`${hectares} ha`}
              />

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="rev" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Monthly revenue</label>
                  <span className="text-sm font-semibold text-leaf-900">{formatNaira(revenue)}</span>
                </div>
                <input
                  id="rev"
                  type="number"
                  min={0}
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-leaf-600 focus:ring-2 focus:ring-leaf-600/20"
                />
              </div>

              <SliderField
                label="Current crop loss rate"
                suffix="%"
                min={0}
                max={60}
                value={lossRate}
                onChange={setLossRate}
                display={`${lossRate}%`}
              />

              <div className="grid gap-2">
                <label htmlFor="crop" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary crop</label>
                <select
                  id="crop"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as typeof crop)}
                  className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-leaf-600 focus:ring-2 focus:ring-leaf-600/20"
                >
                  {crops.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-border bg-leaf-900 p-6 text-primary-foreground sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-brand">Net year-one upside</div>
                  <motion.div
                    key={result.total}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 font-display text-3xl leading-none sm:text-4xl"
                  >
                    {formatNaira(result.total)}
                  </motion.div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 font-semibold text-white">
                      {result.roiX.toFixed(1)}x ROI
                    </span>
                    <span>Payback in ~{result.paybackMonths} months</span>
                    <span className="hidden sm:inline">·</span>
                    <span>Loss {lossRate}% → ~{result.newLoss}%</span>
                  </div>
                </div>
                <div className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
                  <SectionLink
                    section={SECTION_IDS.contact}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-amber-brand px-4 py-2.5 text-sm font-semibold text-leaf-900 transition-all hover:brightness-105"
                  >
                    Talk to us
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </SectionLink>
                  <button
                    type="button"
                    onClick={downloadSummary}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/85 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <Download className="size-3.5" /> Download summary
                  </button>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Year-one breakdown (NGN)
                </div>
                <dl className="mt-3 divide-y divide-white/10 text-sm">
                  {[
                    { l: "Recovered harvest", note: `Loss ${lossRate}% → ${result.newLoss}% on ${formatN(result.annualRevenue)} annual revenue`, v: result.recoveredRevenue, sign: "+" as const },
                    { l: "Better market timing", note: `${result.cropLabel} sells +${Math.round((crops.find(c=>c.value===crop)!.upliftMultiplier-1)*100)}% in optimal window (applied to ~40%)`, v: result.marketUplift, sign: "+" as const },
                    { l: "Input savings", note: "~6% lower water & fertiliser via precision agronomy", v: result.inputSavings, sign: "+" as const },
                    { l: "FieldLoop platform", note: `${hectares} ha × ₦18,000 / ha / month`, v: result.platformCost, sign: "−" as const },
                  ].map((b) => (
                    <div key={b.l} className="flex items-start justify-between gap-4 py-2.5">
                      <div className="min-w-0">
                        <dt className="text-white">{b.l}</dt>
                        <div className="mt-0.5 text-[11px] leading-snug text-white/55">{b.note}</div>
                      </div>
                      <dd className={`shrink-0 font-semibold tabular-nums ${b.sign === "−" ? "text-white/70" : "text-white"}`}>
                        {b.sign} {formatN(b.v)}
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-amber-brand">Net upside</dt>
                    <dd className="font-display text-xl tabular-nums text-white">{formatN(result.total)}</dd>
                  </div>
                </dl>
                <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-white/50">
                  <Info className="mt-0.5 size-3 shrink-0" />
                  Indicative estimates based on early customer benchmarks. All amounts in Nigerian Naira (₦), year-one horizon. Not a quote.
                </p>
                <button
                  type="button"
                  onClick={downloadSummary}
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 px-3 py-2 text-xs font-medium text-white/85 transition-colors hover:border-white/50 hover:text-white sm:hidden"
                >
                  <Download className="size-3.5" /> Download summary
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function SliderField({
  label, suffix, min, max, value, onChange, display,
}: {
  label: string; suffix: string; min: number; max: number; value: number; onChange: (n: number) => void; display: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label} <span className="normal-case text-muted-foreground/70">({suffix})</span>
        </label>
        <span className="text-sm font-semibold text-leaf-900">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-leaf-100 accent-leaf-700"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}