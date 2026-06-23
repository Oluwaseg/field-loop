import analyticsImg from '@/assets/sol-analytics.jpg';
import droneImg from '@/assets/sol-drone.jpg';
import iotImg from '@/assets/sol-iot.jpg';
import storageImg from '@/assets/sol-storage.jpg';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Cpu,
  LineChart,
  Recycle,
  Satellite,
  Warehouse,
} from 'lucide-react';
import { Container, Eyebrow } from './container';

const solutions = [
  {
    icon: Cpu,
    tag: 'Precision farming',
    title: 'Real-time IoT soil monitoring',
    body: "In-field sensors continuously track soil moisture, pH, and nutrient levels, transmitting hourly readings to farmers' devices. Receive precise alerts on when to irrigate and which nutrients to apply, cutting water by 25 to 40% and fertiliser by up to 30%. Solar-powered and built for durability.",
    img: iotImg,
  },
  {
    icon: Satellite,
    tag: 'Autonomous technology',
    title: 'Aerial disease diagnostics',
    body: 'Our drone fleet uses multispectral cameras to scan entire fields in minutes, detecting crop diseases, pests, and nutrient deficiencies weeks before they appear to the naked eye. Targeted treatment replaces blanket spraying, reducing chemical use by up to 60%.',
    img: droneImg,
  },
  {
    icon: LineChart,
    tag: 'AI and data analytics',
    title: 'Predictive market analytics',
    body: 'Our AI platform aggregates historical price trends, weather forecasts, planting patterns, and live market data across Nigeria. The result: clear guidance on what to plant, when to plant it, and the optimal window to sell. Early users report 15 to 35% revenue lift.',
    img: analyticsImg,
  },
];

export function Solutions() {
  return (
    <section id='solutions' className='section-pad bg-leaf-50/40'>
      <Container>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-2xl'>
            <Eyebrow>Our solutions</Eyebrow>
            <h2 className='mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl'>
              Integrated digital tools for modern farming.
            </h2>
          </div>
          <p className='max-w-md text-base leading-relaxed text-muted-foreground'>
            Four interconnected solutions that transform raw field data into
            actionable advice, from soil to shelf.
          </p>
        </div>

        {/* Flagship */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className='mt-14 overflow-hidden rounded-[2rem] border border-border bg-card ring-soft'
        >
          <div className='grid lg:grid-cols-[1.1fr_1fr]'>
            <div className='relative aspect-[16/11] lg:aspect-auto'>
              <img
                src={storageImg.src}
                alt='Smart storage warehouse with IoT monitoring'
                className='size-full object-cover'
                loading='lazy'
                width={1600}
                height={1100}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-leaf-900/30 to-transparent' />
            </div>
            <div className='flex flex-col justify-center gap-6 p-8 sm:p-12'>
              <div className='inline-flex w-fit items-center gap-2 rounded-full bg-amber-soft px-3 py-1 text-xs font-semibold text-leaf-900'>
                <Warehouse className='size-3.5' />
                Flagship product
              </div>
              <h3 className='text-3xl leading-tight text-leaf-900 sm:text-4xl'>
                Smart storage and logistics
              </h3>
              <p className='text-base leading-relaxed text-muted-foreground'>
                In Nigeria, up to 40% of harvested crops spoil before reaching
                consumers, a devastating loss for farmers and a direct driver of
                urban food insecurity. Our IoT-enabled storage monitors
                temperature and humidity continuously, alerting farmers the
                moment conditions drift from optimal ranges. Our digital
                logistics platform connects farmers directly to transporters and
                buyers, eliminating middlemen and putting significantly more
                money in farmers' pockets.
              </p>
              <dl className='grid grid-cols-3 gap-4 border-t border-border pt-6'>
                {[
                  { n: '35% → 5%', l: 'Post-harvest loss' },
                  { n: 'Real-time', l: 'Storage monitoring' },
                  { n: 'Direct', l: 'Farmer to buyer' },
                ].map((m) => (
                  <div key={m.l}>
                    <dt className='font-display text-xl text-leaf-700 sm:text-2xl'>
                      {m.n}
                    </dt>
                    <dd className='mt-1 text-xs text-muted-foreground'>
                      {m.l}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href='#contact'
                className='group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-leaf-700'
              >
                Request a demo
                <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </a>
            </div>
          </div>
        </motion.article>

        {/* Trio */}
        <div className='mt-8 grid gap-6 md:grid-cols-3'>
          {solutions.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className='group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-leaf-500 hover:shadow-[0_30px_60px_-30px_oklch(0.4_0.15_150/0.4)]'
            >
              <div className='relative aspect-[16/10] overflow-hidden'>
                <img
                  src={s.img.src}
                  alt={s.title}
                  className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
                  loading='lazy'
                />
              </div>
              <div className='flex flex-1 flex-col gap-4 p-6 sm:p-7'>
                <div className='inline-flex w-fit items-center gap-2 rounded-full bg-leaf-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-leaf-700'>
                  <s.icon className='size-3.5' />
                  {s.tag}
                </div>
                <h3 className='text-xl text-leaf-900'>{s.title}</h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {s.body}
                </p>
                <a
                  href='#contact'
                  className='mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700'
                >
                  Learn more{' '}
                  <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ReGen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='mt-8 flex flex-col gap-5 rounded-3xl border border-dashed border-leaf-500/50 bg-card p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-8'
        >
          <div className='grid size-14 shrink-0 place-items-center rounded-2xl bg-leaf-700 text-primary-foreground'>
            <Recycle className='size-6' />
          </div>
          <div className='min-w-0 flex-1'>
            <h4 className='text-lg font-semibold text-leaf-900'>
              FieldLoop ReGen: agricultural waste marketplace
            </h4>
            <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
              Our upcoming platform connects agricultural waste producers with
              buyers and processors, turning farm waste into a new revenue
              stream while reducing environmental impact across the Lagos agri
              value chain.
            </p>
          </div>
          <span className='inline-flex shrink-0 items-center rounded-full bg-amber-soft px-3 py-1.5 text-xs font-semibold text-leaf-900'>
            Coming soon
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
