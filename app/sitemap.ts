import type { MetadataRoute } from 'next';

import { sanityFetch } from '@/sanity/lib/fetch';
import { POST_SLUGS_QUERY } from '@/sanity/queries';

const SITE_URL = 'https://fieldloop.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityFetch<Array<{ slug: string }>>({
    query: POST_SLUGS_QUERY,
    tags: ['post'],
  });

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
