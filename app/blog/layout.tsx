import type { Metadata } from 'next';

import { BlogHeader } from '@/components/blog/blog-header';
import { Footer } from '@/components/site/footer';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on agritech, IoT farming, post-harvest innovation, and sustainable agriculture in Nigeria.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BlogHeader />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
