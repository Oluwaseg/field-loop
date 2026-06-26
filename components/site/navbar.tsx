'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { HomeLink, SectionLink } from '@/components/site/section-link';
import { SiteLogoMark, SiteLogoText } from '@/components/site/site-logo';
import { NAV_LINKS } from '@/lib/site-routes';

type NavbarProps = {
  companyName?: string;
  logoUrl?: string;
};

export function Navbar({ companyName = 'FieldLoop', logoUrl }: NavbarProps) {
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
        <HomeLink className='flex items-center gap-2 text-base font-semibold tracking-tight text-foreground'>
          <SiteLogoMark logoUrl={logoUrl} companyName={companyName} />
          <SiteLogoText companyName={companyName} />
        </HomeLink>

        <nav className='hidden items-center gap-1 md:flex'>
          {NAV_LINKS.map((link) => (
            <SectionLink
              key={link.section}
              section={link.section}
              className='rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-leaf-50 hover:text-leaf-900 cursor-pointer'
            >
              {link.label}
            </SectionLink>
          ))}
          <Link
            href='/blog'
            className='rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-leaf-50 hover:text-leaf-900 cursor-pointer'
          >
            Blog
          </Link>
        </nav>

        <div className='flex items-center gap-2'>
          <SectionLink
            section='contact'
            className='group hidden items-center gap-1.5 rounded-full bg-leaf-900 px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-leaf-700 sm:inline-flex cursor-pointer'
          >
            Get in touch
            <ArrowUpRight className='size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </SectionLink>
          <button
            type='button'
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
              {NAV_LINKS.map((link) => (
                <SectionLink
                  key={link.section}
                  section={link.section}
                  onNavigate={() => setOpen(false)}
                  className='rounded-2xl px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-leaf-50 cursor-pointer'
                >
                  {link.label}
                </SectionLink>
              ))}
              <Link
                href='/blog'
                onClick={() => setOpen(false)}
                className='rounded-2xl px-4 py-3 text-sm font-medium text-foreground hover:bg-leaf-50 cursor-pointer'
              >
                Blog
              </Link>
              <SectionLink
                section='contact'
                onNavigate={() => setOpen(false)}
                className='mt-1 inline-flex items-center justify-between rounded-2xl bg-leaf-900 px-4 py-3 text-sm font-semibold text-primary-foreground cursor-pointer'
              >
                Get in touch <ArrowUpRight className='size-4' />
              </SectionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
