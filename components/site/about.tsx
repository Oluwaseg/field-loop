import aboutImg from '@/assets/about-farmers.jpg';
import { motion } from 'framer-motion';
import { Globe, Rocket, Users, Zap } from 'lucide-react';
import { Container, Eyebrow } from './container';

const values = [
  {
    icon: Globe,
    title: 'Sustainability',
    body: 'Protecting the environment and ensuring long-term agricultural resilience.',
  },
  {
    icon: Zap,
    title: 'Empowerment',
    body: 'Giving farmers the tools and data they need to make better decisions.',
  },
  {
    icon: Users,
    title: 'Community',
    body: 'Partnering directly with farmers to address their unique, localised needs.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    body: 'Embracing cutting-edge technology to solve stubborn old problems.',
  },
];

export function About() {
  return (
    <section id='about' className='section-pad'>
      <Container>
        <div className='grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20'>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            <div className='relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-soft'>
              <img
                src={aboutImg.src}
                alt='Nigerian farmers checking field data on a tablet'
                className='size-full object-cover'
                loading='lazy'
                width={1280}
                height={960}
              />
            </div>
            <div className='absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl border border-border bg-card p-5 shadow-[0_20px_50px_-30px_rgba(15,50,32,0.4)] sm:-right-6'>
              <div className='font-display text-3xl text-leaf-700'>2024</div>
              <p className='mt-1 text-xs leading-relaxed text-muted-foreground'>
                Founded in Lagos, Nigeria with one conviction: data creates
                smarter, greener farms.
              </p>
            </div>
          </motion.div>

          <div>
            <Eyebrow>About us</Eyebrow>
            <h2 className='mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl'>
              Transforming African agriculture through technology and data.
            </h2>
            <div className='mt-6 space-y-5 text-base leading-relaxed text-muted-foreground'>
              <p>
                FieldLoop is a pioneering agritech company dedicated to
                empowering the modern Nigerian farmer. We leverage cutting-edge
                technology, AI, IoT sensors, drone diagnostics, and data
                analytics, to solve the critical agricultural challenges holding
                back Africa's food systems.
              </p>
              <p>
                Founded to address one of Africa's most pressing challenges, we
                identified a critical need for localised, tech-driven solutions
                to help farmers overcome climate change, soil degradation, and
                massive post-harvest losses.
              </p>
              <p className='text-foreground'>
                <span className='font-semibold text-leaf-700'>Our vision</span>{' '}
                is to build a future where African agriculture is sustainable,
                data-driven, and resilient.{' '}
                <span className='font-semibold text-leaf-700'>Our mission</span>{' '}
                is to bridge the gap between technology and agriculture by
                developing smart farming solutions and empowering farmers with
                actionable data.
              </p>
            </div>

            <div className='mt-10 grid gap-3 sm:grid-cols-2'>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className='group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-leaf-500'
                >
                  <div className='grid size-10 place-items-center rounded-xl bg-leaf-50 text-leaf-700 transition-colors group-hover:bg-leaf-700 group-hover:text-primary-foreground'>
                    <v.icon className='size-5' />
                  </div>
                  <h3 className='mt-4 text-base font-semibold text-leaf-900'>
                    {v.title}
                  </h3>
                  <p className='mt-1.5 text-sm leading-relaxed text-muted-foreground'>
                    {v.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
