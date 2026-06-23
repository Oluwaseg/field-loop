import type { Metadata } from 'next';
import { Fraunces, Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const SITE_URL = 'https://fieldloop.org';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'FieldLoop | IoT, Drones & Smart Storage for Nigerian Farms',
    template: '%s | FieldLoop',
  },

  description:
    'Cut post-harvest losses from 40% to under 5% using IoT sensors, drones, smart cold storage and AI market insights.',

  keywords: [
    'Agritech Nigeria',
    'Precision Agriculture',
    'IoT Farming',
    'Drone Agriculture',
    'Cold Storage',
    'FieldLoop',
  ],

  authors: [{ name: 'FieldLoop' }],

  creator: 'FieldLoop',

  publisher: 'FieldLoop',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: SITE_URL,
    title: 'FieldLoop — Greener farms. Smarter future.',
    description:
      'Helping Nigerian farmers reduce post-harvest losses with IoT, drones and AI.',
    siteName: 'FieldLoop',

    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FieldLoop',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'FieldLoop',
    description: 'IoT, drones and smart storage for Nigerian farmers.',
    images: ['/og-image.jpg'],
  },

  themeColor: '#1f4a2f',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
