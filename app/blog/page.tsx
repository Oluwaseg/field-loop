import type { Metadata } from 'next';

import { BlogListing } from '@/components/blog/blog-listing';
import { estimateReadingTime } from '@/lib/blog-utils';
import { sanityFetch } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import { POST_CATEGORIES_QUERY, POSTS_QUERY } from '@/sanity/queries';
import type { PostListItem } from '@/sanity/types';

export const metadata: Metadata = {
  title: 'Field Notes',
  description:
    'Stories, data, and field notes from FieldLoop on smart storage, IoT, drones, and AI for Nigerian agriculture.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Field Notes — FieldLoop Blog',
    description: 'Stories, data, and field notes from FieldLoop.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Field Notes — FieldLoop Blog',
    description: 'Stories, data, and field notes from FieldLoop.',
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<PostListItem[]>({
      query: POSTS_QUERY,
      tags: ['post'],
    }),
    sanityFetch<string[]>({
      query: POST_CATEGORIES_QUERY,
      tags: ['post'],
    }),
  ]);

  const postsWithImages = posts.map((post) => ({
    ...post,
    readingTime: estimateReadingTime(post.excerpt),
    imageUrl: urlFor(post.featuredImage).width(1200).height(750).auto('format').url(),
  }));

  return <BlogListing posts={postsWithImages} categories={categories} />;
}
