'use client';

import Script from 'next/script';

import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { FAQ, roiFaqs } from '@/components/site/faq';
import { Hero } from '@/components/site/hero';
import { HomeScrollHandler } from '@/components/site/home-scroll-handler';
import { Impact } from '@/components/site/impact';
import { Navbar } from '@/components/site/navbar';
import { RoiCalculator } from '@/components/site/roi-calculator';
import { Solutions } from '@/components/site/solutions';
import { Stats } from '@/components/site/stats';
import { Stories } from '@/components/site/stories';
import { Team } from '@/components/site/team';
import { Ticker } from '@/components/site/ticker';
import type { SiteSettings } from '@/sanity/types/site-settings';
import type { TeamMember } from '@/sanity/types/team';

type HomePageProps = {
  settings: SiteSettings;
  teamMembers: TeamMember[];
};

export function HomePage({ settings, teamMembers }: HomePageProps) {
  return (
    <>
      <Script
        id='organization-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: settings.companyName,
            url: 'https://fieldloop.org',
            logo: 'https://fieldloop.org/favicon.png',
            image: 'https://fieldloop.org/og-image.jpg',
            slogan: settings.tagline,
            description: settings.description,
            areaServed: {
              '@type': 'Country',
              name: 'Nigeria',
            },
            address: settings.address
              ? {
                  '@type': 'PostalAddress',
                  streetAddress: settings.address,
                  addressLocality: 'Lagos',
                  addressCountry: 'NG',
                }
              : undefined,
            email: settings.email,
            telephone: settings.phone?.split('\n')[0],
          }),
        }}
      />
      <Script
        id='faq-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: roiFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
      <HomeScrollHandler />
      <Navbar companyName={settings.companyName} logoUrl={settings.logoUrl} />
      <Hero />
      <Ticker />
      <Stats />
      <About />
      <Solutions />
      <Impact />
      <Stories />
      <Team team={teamMembers} />
      <RoiCalculator />
      <FAQ />
      <Contact
        settings={{
          address: settings.address,
          phone: settings.phone,
          email: settings.email,
        }}
      />
    </>
  );
}
