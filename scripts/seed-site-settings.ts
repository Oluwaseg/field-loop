/**
 * Seeds the Site Settings singleton with current FieldLoop defaults.
 *
 * Usage: pnpm seed:settings
 */

import { createClient } from 'next-sanity';

import { SITE_SETTINGS_DEFAULTS, socialLinksForSeed } from '../lib/site-settings-defaults';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity project config or API token.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

async function main() {
  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings' as const,
    title: SITE_SETTINGS_DEFAULTS.companyName,
    tagline: SITE_SETTINGS_DEFAULTS.tagline,
    description: SITE_SETTINGS_DEFAULTS.description,
    footerText: SITE_SETTINGS_DEFAULTS.footerText,
    legalNote: SITE_SETTINGS_DEFAULTS.legalNote,
    email: SITE_SETTINGS_DEFAULTS.email,
    phone: SITE_SETTINGS_DEFAULTS.phone,
    address: SITE_SETTINGS_DEFAULTS.address,
    socialLinks: socialLinksForSeed(SITE_SETTINGS_DEFAULTS.socialLinks ?? []),
  };

  await client.createOrReplace(doc);
  console.log('Site Settings seeded at document ID "siteSettings".');
  console.log('Edit anytime at /studio → Site Settings');
}

main().catch((error) => {
  console.error('Seed failed:', error instanceof Error ? error.message : error);
  process.exit(1);
});
