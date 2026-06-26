import { Container } from '@/components/site/container';
import { Footer } from '@/components/site/footer';
import { Navbar } from '@/components/site/navbar';
import { ScrollText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — FieldLoop',
  description:
    "The terms that govern your use of FieldLoop's agritech products and services.",
  openGraph: {
    title: 'Terms of Service — FieldLoop',
    description:
      "The terms that govern your use of FieldLoop's agritech products and services.",
    url: 'https://www.fieldloop.org/terms',
  },
  alternates: {
    canonical: 'https://www.fieldloop.org/terms',
  },
};

const sections = [
  {
    h: '1. Agreement',
    p: 'By accessing FieldLoop you agree to these Terms. If you are using the service on behalf of an organisation, you confirm you have authority to bind that organisation.',
  },
  {
    h: '2. Accounts',
    p: 'You are responsible for safeguarding your credentials and for all activity under your account. Notify us immediately of unauthorised use.',
  },
  {
    h: '3. Acceptable use',
    p: 'Do not reverse-engineer the platform, attempt to disrupt service availability, or use FieldLoop for unlawful activity.',
  },
  {
    h: '4. Subscriptions & billing',
    p: 'Paid plans renew automatically unless cancelled before the renewal date. Refunds are governed by the plan you selected at checkout.',
  },
  {
    h: '5. Hardware',
    p: 'Sensors and field hardware ship with a 12-month limited warranty covering manufacturing defects, excluding tampering or environmental damage.',
  },
  {
    h: '6. Liability',
    p: "FieldLoop is provided 'as is'. We are not liable for indirect or consequential losses, including crop yield variation beyond our reasonable control.",
  },
  {
    h: '7. Termination',
    p: "Either party may terminate with 30 days' notice. We may suspend the service immediately for material breach of these Terms.",
  },
  {
    h: '8. Governing law',
    p: 'These Terms are governed by the laws of the Federal Republic of Nigeria. Disputes will be resolved in the courts of Lagos State.',
  },
];

export default function TermsPage() {
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
              <span className='grid size-11 place-items-center rounded-full bg-leaf-50 text-leaf-700'>
                <ScrollText className='size-5' />
              </span>
              <p className='text-xs uppercase tracking-[0.22em] text-leaf-700'>
                Legal
              </p>
            </div>
            <h1 className='mt-4 text-4xl md:text-5xl text-balance'>
              Terms of Service
            </h1>
            <p className='mt-3 text-sm text-muted-foreground'>
              Last updated:{' '}
              {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>

            <div className='mt-12 space-y-10'>
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className='text-xl font-semibold tracking-tight text-foreground'>
                    {s.h}
                  </h2>
                  <p className='mt-3 leading-relaxed text-muted-foreground'>
                    {s.p}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
