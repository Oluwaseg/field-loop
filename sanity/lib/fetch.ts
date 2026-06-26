import type { QueryParams } from 'next-sanity';

import { client } from '@/sanity/lib/client';

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
};

/**
 * Typed fetch helper with Next.js cache configuration.
 * Add content-type tags for targeted revalidation via webhooks later.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = ['sanity'],
}: SanityFetchOptions): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
