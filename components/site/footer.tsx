import { Sprout } from 'lucide-react';
import { FaFacebook, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { Container } from './container';

const cols = [
  {
    h: 'Company',
    links: [
      'About us',
      'Our team',
      'Contact us',
      'Partners',
      'Press',
      'Careers',
    ],
  },
  {
    h: 'Solutions',
    links: [
      'Smart storage and logistics',
      'IoT soil monitoring',
      'Aerial diagnostics',
      'Market analytics',
      'FieldLoop ReGen',
    ],
  },
  {
    h: 'Support',
    links: [
      'Help centre',
      'Documentation',
      'System status',
      'Newsletter',
      'Blog',
    ],
  },
];

export function Footer() {
  return (
    <footer className='border-t border-border bg-leaf-900 text-primary-foreground'>
      <Container>
        <div className='grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]'>
          <div>
            <a
              href='#top'
              className='inline-flex items-center gap-2 text-lg font-semibold'
            >
              <span className='grid size-9 place-items-center rounded-full bg-amber-brand text-leaf-900'>
                <Sprout className='size-4' strokeWidth={2.4} />
              </span>
              Field<span className='text-amber-brand'>Loop</span>
            </a>
            <p className='mt-5 max-w-sm text-sm leading-relaxed text-white/65'>
              Building a future where African agriculture is sustainable,
              data-driven, and resilient, ensuring food security for generations
              to come.
            </p>
            <p className='mt-4 text-xs text-white/40'>
              Registered with the Corporate Affairs Commission (CAC), Lagos
              State.
            </p>
            <div className='mt-6 flex gap-2'>
              {[FaFacebook, FaXTwitter, FaLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href='#'
                  aria-label='Social'
                  className='grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-amber-brand hover:bg-amber-brand hover:text-leaf-900'
                >
                  <Icon className='size-3.5' />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h4 className='text-xs font-semibold uppercase tracking-[0.18em] text-amber-brand'>
                {c.h}
              </h4>
              <ul className='mt-5 space-y-3 text-sm'>
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href='#'
                      className='text-white/70 transition-colors hover:text-white'
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center'>
          <span>
            © {new Date().getFullYear()} FieldLoop. All rights reserved.
          </span>
          <div className='flex gap-5'>
            <a href='#' className='hover:text-white'>
              Privacy
            </a>
            <a href='#' className='hover:text-white'>
              Terms
            </a>
            <a href='#' className='hover:text-white'>
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
