import { defineLive } from 'next-sanity/live';

import { apiVersion, dataset, projectId, readToken } from '@/sanity/env';
import { client } from '@/sanity/lib/client';

/**
 * Live Content API setup for real-time updates and draft previews.
 * Requires SANITY_API_READ_TOKEN in production for draft mode / Presentation.
 */
export const { sanityFetch: liveSanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
    useCdn: false,
  }),
  serverToken: readToken,
  browserToken: readToken,
});
