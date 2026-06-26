'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Sprout, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#impact', label: 'Impact' },
  { href: '#stories', label: 'Stories' },
  { href: '#roi', label: 'ROI' },
  { href: '#faq', label: 'FAQ' },
  { href: '#team', label: 'Team' },
  { href: '/blog', label: 'Blog' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <div
        className={`mx-auto mt-3 flex w-[min(1200px,calc(100%-1.25rem))] items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-border/80 bg-background/80 shadow-[0_8px_30px_-12px_rgba(15,50,32,0.18)] backdrop-blur-xl'
            : 'border-transparent bg-background/40 backdrop-blur-md'
        }`}
      >
        <a
          href='#top'
          className='flex items-center gap-2 text-base font-semibold tracking-tight text-foreground'
        >
          <span className='grid size-8 place-items-center rounded-full bg-leaf-700 text-primary-foreground'>
            <Sprout className='size-4' strokeWidth={2.4} />
          </span>
          Field<span className='text-leaf-700'>Loop</span>
        </a>

        <nav className='hidden items-center gap-1 md:flex'>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className='rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-leaf-50 hover:text-leaf-900'
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <a
            href='#contact'
            className='group hidden items-center gap-1.5 rounded-full bg-leaf-900 px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-leaf-700 sm:inline-flex'
          >
            Get in touch
            <ArrowUpRight className='size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </a>
          <button
            aria-label='Toggle menu'
            onClick={() => setOpen((v) => !v)}
            className='grid size-10 place-items-center rounded-full border border-border bg-card text-foreground md:hidden'
          >
            {open ? <X className='size-4' /> : <Menu className='size-4' />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className='mx-auto mt-2 w-[min(1200px,calc(100%-1.25rem))] overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-xl md:hidden'
          >
            <nav className='grid'>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className='rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-leaf-50'
                >
                  {l.label}
                </a>
              ))}
              <a
                href='#contact'
                onClick={() => setOpen(false)}
                className='mt-1 inline-flex items-center justify-between rounded-2xl bg-leaf-900 px-4 py-3 text-sm font-semibold text-primary-foreground'
              >
                Get in touch <ArrowUpRight className='size-4' />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
