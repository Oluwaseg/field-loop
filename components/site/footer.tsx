import Link from 'next/link';

import { SECTION_IDS, type SectionId } from '@/lib/site-routes';
import { getSiteSettings } from '@/sanity/lib/get-site-settings';
import { HomeLink, SectionLink } from '@/components/site/section-link';
import { SiteLogoMark, SiteLogoText } from '@/components/site/site-logo';
import { SocialLinks } from '@/components/site/social-links';
import { Container } from './container';

type FooterLink =
  | { label: string; section: SectionId }
  | { label: string; href: string };

const cols: { h: string; links: FooterLink[] }[] = [
  {
    h: 'Company',
    links: [
      { label: 'About us', section: SECTION_IDS.about },
      { label: 'Our team', section: SECTION_IDS.team },
      { label: 'Contact us', section: SECTION_IDS.contact },
      { label: 'Partners', section: SECTION_IDS.contact },
      { label: 'Press', section: SECTION_IDS.contact },
      { label: 'Careers', section: SECTION_IDS.contact },
    ],
  },
  {
    h: 'Solutions',
    links: [
      { label: 'Smart storage and logistics', section: SECTION_IDS.solutions },
      { label: 'IoT soil monitoring', section: SECTION_IDS.solutions },
      { label: 'Aerial diagnostics', section: SECTION_IDS.solutions },
      { label: 'Market analytics', section: SECTION_IDS.solutions },
      { label: 'FieldLoop ReGen', section: SECTION_IDS.solutions },
    ],
  },
  {
    h: 'Support',
    links: [
      { label: 'Help centre', section: SECTION_IDS.contact },
      { label: 'Documentation', section: SECTION_IDS.contact },
      { label: 'System status', section: SECTION_IDS.contact },
      { label: 'Newsletter', section: SECTION_IDS.contact },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const companyName = settings.companyName;

  return (
    <footer className='border-t border-border bg-leaf-900 text-primary-foreground'>
      <Container>
        <div className='grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]'>
          <div>
            <HomeLink className='inline-flex items-center gap-2 text-lg font-semibold'>
              <SiteLogoMark
                logoUrl={settings.logoUrl}
                companyName={companyName}
                size='md'
                variant='footer'
              />
              <SiteLogoText companyName={companyName} accentClassName='text-amber-brand' />
            </HomeLink>
            <p className='mt-5 max-w-sm text-sm leading-relaxed text-white/65'>
              {settings.footerText || settings.description}
            </p>
            {settings.legalNote ? (
              <p className='mt-4 text-xs text-white/40'>{settings.legalNote}</p>
            ) : null}
            <SocialLinks links={settings.socialLinks ?? []} className='mt-6 flex gap-2' />
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h4 className='text-xs font-semibold uppercase tracking-[0.18em] text-amber-brand'>
                {c.h}
              </h4>
              <ul className='mt-5 space-y-3 text-sm'>
                {c.links.map((link) => (
                  <li key={link.label}>
                    {'href' in link ? (
                      <Link
                        href={link.href}
                        className='text-white/70 transition-colors hover:text-white'
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <SectionLink
                        section={link.section}
                        className='text-white/70 transition-colors hover:text-white'
                      >
                        {link.label}
                      </SectionLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50 sm:flex-row sm:items-center'>
          <span suppressHydrationWarning>
            © {year} {companyName}. All rights reserved.
          </span>
          <div className='flex gap-5'>
            <Link href='/privacy' className='hover:text-white'>
              Privacy
            </Link>
            <Link href='/terms' className='hover:text-white'>
              Terms
            </Link>
            <Link href='/cookies' className='hover:text-white'>
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
