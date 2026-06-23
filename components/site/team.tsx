import chiamaka from '@/assets/team-chiamaka.jpg';
import folake from '@/assets/team-folake.jpg';
import olumide from '@/assets/team-olumide.jpg';
import tunde from '@/assets/team-tunde.jpg';
import { motion } from 'framer-motion';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { Container, Eyebrow } from './container';

const team = [
  {
    img: olumide,
    name: 'Olumide Adebayo',
    role: 'Founder and CEO',
    twitter: true,
  },
  { img: chiamaka, name: 'Chiamaka Nwosu', role: 'CTO and Lead Engineer' },
  { img: tunde, name: 'Tunde Okonkwo', role: 'Head of Agronomy' },
  { img: folake, name: 'Folake Ibrahim', role: 'Head of Data and Analytics' },
];

export function Team() {
  return (
    <section id='team' className='section-pad bg-leaf-50/40'>
      <Container>
        <div className='max-w-2xl'>
          <Eyebrow>Our team</Eyebrow>
          <h2 className='mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl'>
            The people behind FieldLoop.
          </h2>
          <p className='mt-5 text-base leading-relaxed text-muted-foreground'>
            A multidisciplinary team of agronomists, engineers, and data
            scientists united by one mission: making African agriculture smarter
            and more resilient.
          </p>
        </div>

        <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className='group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-leaf-500 hover:shadow-[0_30px_60px_-30px_oklch(0.4_0.15_150/0.35)]'
            >
              <div className='relative aspect-[4/5] w-full overflow-hidden'>
                <img
                  src={m.img.src}
                  alt={m.name}
                  width={1024}
                  height={1280}
                  loading='lazy'
                  className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-leaf-900/70 to-transparent' />
              </div>
              <div className='p-5'>
                <div className='text-base font-semibold text-leaf-900'>
                  {m.name}
                </div>
                <div className='text-sm text-muted-foreground'>{m.role}</div>
                <div className='mt-4 flex gap-2'>
                  <a
                    href='#'
                    aria-label='LinkedIn'
                    className='grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-leaf-700 hover:bg-leaf-700 hover:text-primary-foreground'
                  >
                    <FaLinkedin className='size-3.5' />
                  </a>
                  {m.twitter && (
                    <a
                      href='#'
                      aria-label='Twitter'
                      className='grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-leaf-700 hover:bg-leaf-700 hover:text-primary-foreground'
                    >
                      <FaXTwitter className='size-3.5' />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
