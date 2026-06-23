'use client';
import { About } from '@/components/site/about';
import { Contact } from '@/components/site/contact';
import { FAQ, roiFaqs } from '@/components/site/faq';
import { Footer } from '@/components/site/footer';
import { Hero } from '@/components/site/hero';
import { Impact } from '@/components/site/impact';
import { Navbar } from '@/components/site/navbar';
import { RoiCalculator } from '@/components/site/roi-calculator';
import { Solutions } from '@/components/site/solutions';
import { Stats } from '@/components/site/stats';
import { Stories } from '@/components/site/stories';
import { Team } from '@/components/site/team';
import { Ticker } from '@/components/site/ticker';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script
        id='organization-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'FieldLoop',
            url: 'https://fieldloop.org',
            logo: 'https://fieldloop.org/favicon.png',
            image: 'https://fieldloop.org/og-image.jpg',
            slogan: 'Greener farms. Smarter future.',
            description:
              'Lagos-based agritech using IoT, drones and AI to reduce post-harvest losses.',
            areaServed: {
              '@type': 'Country',
              name: 'Nigeria',
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Lagos',
              addressCountry: 'NG',
            },
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
      {/* Your page */}
      <Navbar />
      <Hero />
      <Ticker />
      <Stats />
      <About />
      <Solutions />
      <Impact />
      <Stories />
      <Team />
      <RoiCalculator />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
