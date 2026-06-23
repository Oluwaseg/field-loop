import amina from '@/assets/story-amina.jpg';
import coop from '@/assets/story-coop.jpg';
import ibrahim from '@/assets/story-ibrahim.jpg';
import ngozi from '@/assets/story-ngozi.jpg';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container, Eyebrow } from './container';

const stories = [
  {
    img: amina,
    tag: 'Smart storage and logistics',
    quote:
      'Before FieldLoop, I was losing almost a third of my tomatoes every season. Now my storage is monitored around the clock, and I sell directly to buyers in Lagos with no middlemen.',
    result: '32%',
    resultLabel:
      'Reduction in post-harvest losses, revenue up 40% in first season',
    name: 'Amina Bello',
    role: 'Tomato farmer, Badagry, Lagos State',
  },
  {
    img: ibrahim,
    tag: 'IoT soil monitoring',
    quote:
      'The sensors tell me exactly when my soil needs water and which nutrients are missing. I used to guess every time. Now I know. My fertiliser bill dropped by almost a third.',
    result: '28%',
    resultLabel: 'Reduction in fertiliser costs, yield up 35% season-on-season',
    name: 'Ibrahim Musa',
    role: 'Maize and cassava farmer, Ikorodu, Lagos State',
  },
  {
    img: ngozi,
    tag: 'Predictive market analytics',
    quote:
      'FieldLoop advised me to delay my cucumber harvest by two weeks. I was sceptical, but when I finally sold, the price was almost double. I made more money doing less.',
    result: '31%',
    resultLabel: 'Revenue increase, optimal selling window identified by AI',
    name: 'Ngozi Okafor',
    role: 'Vegetable farmer, Epe, Lagos State',
  },
  {
    img: coop,
    tag: 'Aerial disease diagnostics',
    quote:
      'The drone spotted a fungal infection on one section of our land before any of us noticed anything wrong. We treated just that patch and saved the entire harvest. It paid for itself instantly.',
    result: '60%',
    resultLabel: 'Reduction in chemical sprays, full harvest protected',
    name: 'Zaria Farmers Cooperative',
    role: 'Multi-crop cooperative, Lagos State',
  },
];

export function Stories() {
  return (
    <section id='stories' className='section-pad'>
      <Container>
        <div className='max-w-2xl'>
          <Eyebrow>Success stories</Eyebrow>
          <h2 className='mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl'>
            Farmers winning with FieldLoop.
          </h2>
        </div>

        <div className='mt-14 grid gap-6 md:grid-cols-2'>
          {stories.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className='group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-leaf-500 hover:shadow-[0_30px_60px_-30px_oklch(0.4_0.15_150/0.35)] sm:flex-row'
            >
              <div className='relative aspect-[4/5] w-full overflow-hidden sm:aspect-auto sm:w-[42%]'>
                <img
                  src={s.img.src}
                  alt={s.name}
                  className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
                  loading='lazy'
                />
              </div>
              <div className='flex flex-1 flex-col gap-5 p-6 sm:p-7'>
                <span className='inline-flex w-fit items-center rounded-full bg-leaf-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-leaf-700'>
                  {s.tag}
                </span>
                <Quote className='size-6 text-leaf-500' />
                <p className='text-base leading-relaxed text-foreground'>
                  {s.quote}
                </p>
                <div className='rounded-2xl border border-amber-soft bg-amber-soft/40 p-4'>
                  <div className='font-display text-3xl leading-none text-leaf-700'>
                    {s.result}
                  </div>
                  <div className='mt-1 text-xs text-muted-foreground'>
                    {s.resultLabel}
                  </div>
                </div>
                <div className='mt-auto border-t border-border pt-4'>
                  <div className='text-sm font-semibold text-leaf-900'>
                    {s.name}
                  </div>
                  <div className='text-xs text-muted-foreground'>{s.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
