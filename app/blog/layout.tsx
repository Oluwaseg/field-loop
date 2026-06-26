import type { Metadata } from 'next';

import { Navbar } from '@/components/site/navbar';
import { Footer } from '@/components/site/footer';

export const metadata: Metadata = {
  title: {
    default: 'Field Notes',
    template: '%s | FieldLoop',
  },
  description:
    'Stories, data, and field notes from FieldLoop on smart storage, IoT, drones, and AI for Nigerian agriculture.',
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-background'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
