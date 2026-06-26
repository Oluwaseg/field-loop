import { Container } from '@/components/site/container';
import { Footer } from '@/components/site/footer';
import { Navbar } from '@/components/site/navbar';
import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { CookiePreferencesButton } from './cookie-preferences-button';

export const metadata = {
  title: 'Cookie Policy — FieldLoop',
  description:
    'Learn how FieldLoop uses cookies and how to control your preferences.',
  openGraph: {
    title: 'Cookie Policy — FieldLoop',
    description:
      'Learn how FieldLoop uses cookies and how to control your preferences.',
    url: 'https://www.fieldloop.org/cookies',
  },
  alternates: {
    canonical: 'https://www.fieldloop.org/cookies',
  },
};

const categories = [
  {
    h: 'Strictly necessary',
    p: 'Keep the site secure, remember your session, and remember your cookie preferences. Cannot be disabled.',
  },
  {
    h: 'Analytics',
    p: 'Help us understand which pages and features matter so we can improve them. Aggregated and anonymised.',
  },
  {
    h: 'Marketing',
    p: 'Used to measure the performance of our campaigns and personalise messaging. Off by default.',
  },
];

export default function CookiesPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main className='pt-32 pb-24'>
        <Container>
          <div className='mx-auto max-w-3xl'>
            <Link
              href='/'
              className='text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground'
            >
              ← Back home
            </Link>
            <div className='mt-6 flex items-center gap-3'>
              <span className='grid size-11 place-items-center rounded-full bg-amber-soft text-leaf-900'>
                <Cookie className='size-5' />
              </span>
              <p className='text-xs uppercase tracking-[0.22em] text-leaf-700'>
                Legal
              </p>
            </div>
            <h1 className='mt-4 text-4xl md:text-5xl text-balance'>
              Cookie Policy
            </h1>
            <p className='mt-3 text-sm text-muted-foreground'>
              Last updated:{' '}
              {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            <p className='mt-8 leading-relaxed text-muted-foreground'>
              We use cookies and similar technologies to keep FieldLoop secure,
              measure how it performs, and tailor experiences. You can change
              your choices at any time.
            </p>

            <CookiePreferencesButton />

            <div className='mt-12 grid gap-4'>
              {categories.map((c) => (
                <div
                  key={c.h}
                  className='rounded-2xl border border-border bg-card p-6'
                >
                  <h2 className='text-lg font-semibold text-foreground'>
                    {c.h}
                  </h2>
                  <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                    {c.p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
