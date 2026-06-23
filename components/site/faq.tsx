import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container, Eyebrow } from "./container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const roiFaqs = [
  {
    q: "How accurate is the FieldLoop ROI calculator?",
    a: "It produces an indicative year-one estimate based on early customer benchmarks across Lagos State. Real outcomes depend on crop type, current losses, storage conditions, and market access. Treat it as a directional starting point, not a quote. Our team gives you a firm projection after a free 30-minute farm assessment.",
  },
  {
    q: "What assumptions does the calculator use?",
    a: "Smart storage and logistics reduce post-harvest losses to roughly 20% of your current rate, floored by a per-crop minimum. Better market timing applies a crop-specific uplift (10–25%) to about 40% of harvest. Input savings are sized at ~6% of annual revenue via precision water and fertiliser. Platform cost is approximated at ₦18,000 per hectare per month for software, sensors (amortised), and support.",
  },
  {
    q: "Why is the platform cost included in the net result?",
    a: "Net year-one upside is gross savings and added revenue minus what you pay FieldLoop. ROI multiple compares gross upside to that cost, and payback months show how quickly the gross upside covers the investment. This way the number you see is what you actually keep.",
  },
  {
    q: "Do these numbers work for smallholders under 5 hectares?",
    a: "Yes. The same per-hectare economics apply, and smallholders often see the largest percentage gains because their starting loss rates are higher. We offer cooperative plans so neighbouring farms can share storage units and sensors to lower per-farm cost.",
  },
  {
    q: "Which crops does FieldLoop support today?",
    a: "We currently support tomatoes and vegetables, maize and corn, cassava and root crops, rice, and pepper or chillies. Other crops can still benefit from storage and market-timing modules. Talk to us about your specific crop mix.",
  },
  {
    q: "How quickly can I expect to see returns?",
    a: "Most farms hit payback within the first 4 to 8 months after installation, driven primarily by reduced spoilage in the first full harvest cycle. Market-timing gains and input savings compound from month two onwards as sensors learn your soil profile.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-pad bg-leaf-50/40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>ROI questions</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl">
              How the numbers work.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Six questions farmers ask us most about the calculator, the assumptions behind it, and what real returns look like in the first year.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-leaf-700 px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-leaf-900"
            >
              Still curious? Talk to us
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {roiFaqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border bg-card px-5 transition-colors hover:border-leaf-500/60 data-[state=open]:border-leaf-500"
                >
                  <AccordionTrigger className="group gap-4 py-5 text-left text-base font-semibold text-leaf-900 hover:no-underline [&>svg]:hidden">
                    <span className="flex-1">{f.q}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-leaf-700 transition-all group-data-[state=open]:rotate-45 group-data-[state=open]:border-leaf-700 group-data-[state=open]:bg-leaf-700 group-data-[state=open]:text-primary-foreground">
                      <Plus className="size-4" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 pr-12 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}