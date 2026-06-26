import heroImg from '@/assets/hero-farm.jpg';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';

import { SECTION_IDS } from '@/lib/site-routes';
import { SectionLink } from '@/components/site/section-link';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  return (
    <section
      id='top'
      className='relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28'
    >
      <div className='absolute inset-0 -z-10 grain-bg' aria-hidden />
      <div
        className='absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,oklch(0.97_0.05_150),transparent_70%)]'
        aria-hidden
      />

      <div className='container-x mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center'>
        <div>
          <motion.div
            initial='hidden'
            animate='show'
            variants={fadeUp}
            custom={0}
            className='inline-flex items-center gap-2 rounded-full border border-leaf-100 bg-card/70 px-3.5 py-1.5 text-xs font-medium text-leaf-700 backdrop-blur'
          >
            <MapPin className='size-3.5' />
            Lagos, Nigeria
            <span className='text-muted-foreground/60'>·</span>
            Est. 2024
          </motion.div>

          <motion.h1
            initial='hidden'
            animate='show'
            variants={fadeUp}
            custom={1}
            className='mt-6 text-balance text-[clamp(2.6rem,6vw,4.75rem)] font-normal leading-[1.02] text-leaf-900'
          >
            Greener farms.
            <br />
            <span className='italic text-leaf-700'>Smarter future.</span>
          </motion.h1>

          <motion.p
            initial='hidden'
            animate='show'
            variants={fadeUp}
            custom={2}
            className='mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground'
          >
            We combine IoT sensors, drone diagnostics, and AI-powered analytics
            to help Nigerian farmers reduce post-harvest losses, cut input
            costs, and build a more food-secure Lagos.
          </motion.p>

          <motion.div
            initial='hidden'
            animate='show'
            variants={fadeUp}
            custom={3}
            className='mt-9 flex flex-wrap items-center gap-3'
          >
            <SectionLink
              section={SECTION_IDS.solutions}
              className='group inline-flex items-center gap-2 rounded-full bg-leaf-900 px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-12px_oklch(0.4_0.15_150/0.6)] transition-all hover:bg-leaf-700'
            >
              Explore our solutions
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
            </SectionLink>
            <SectionLink
              section={SECTION_IDS.about}
              className='inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-leaf-500 hover:text-leaf-700'
            >
              Our story
            </SectionLink>
          </motion.div>

          <motion.dl
            initial='hidden'
            animate='show'
            variants={fadeUp}
            custom={4}
            className='mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-7'
          >
            {[
              { n: '40%', l: 'Cost reduction' },
              { n: '60%', l: 'Less crop loss' },
              { n: '10K+', l: 'Farmers reached' },
            ].map((s) => (
              <div key={s.l}>
                <dt className='text-2xl font-semibold tracking-tight text-leaf-900 sm:text-3xl'>
                  {s.n}
                </dt>
                <dd className='mt-1 text-xs text-muted-foreground'>{s.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className='relative'
        >
          <div className='relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border ring-soft'>
            <img
              src={heroImg.src}
              alt='Aerial view of Nigerian farmland at golden hour'
              className='size-full object-cover'
              width={1920}
              height={1280}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-leaf-900/55 via-leaf-900/10 to-transparent' />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className='absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-card/90 px-3 py-1.5 text-xs font-medium text-leaf-900 backdrop-blur'
            >
              <Sparkles className='size-3.5 text-amber-brand' />
              Live field telemetry
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className='absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-leaf-900/65 p-4 text-primary-foreground backdrop-blur-md'
            >
              <div className='flex items-center justify-between text-xs uppercase tracking-widest text-white/70'>
                <span>Soil moisture</span>
                <span className='text-amber-brand'>Optimal</span>
              </div>
              <div className='mt-3 flex items-end gap-1.5'>
                {[40, 52, 48, 60, 55, 64, 70, 66, 72, 80, 75, 82].map(
                  (v, i) => (
                    <motion.span
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${v}%` }}
                      transition={{
                        delay: 0.9 + i * 0.04,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                      className='block w-2 flex-1 rounded-sm bg-gradient-to-t from-amber-brand to-leaf-500'
                    />
                  )
                )}
              </div>
              <div className='mt-3 flex items-center justify-between text-sm'>
                <span className='font-semibold'>Ikorodu Plot 04</span>
                <span className='text-white/70'>Updated 1m ago</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
