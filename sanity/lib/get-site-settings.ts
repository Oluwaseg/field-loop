import { cache } from 'react';

import { SITE_SETTINGS_DEFAULTS } from '@/lib/site-settings-defaults';
import { sanityFetch } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries/site-settings';
import type { SanityImage } from '@/sanity/types/blog';
import type { SiteSettings, SocialLink } from '@/sanity/types/site-settings';

type RawSocialLink = {
  icon?: string;
  href?: string;
  platform?: string;
  url?: string;
};

type SanitySiteSettings = {
  companyName?: string;
  tagline?: string;
  description?: string;
  footerText?: string;
  legalNote?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: RawSocialLink[];
  logo?: SanityImage;
  defaultSeo?: SiteSettings['defaultSeo'];
} | null;

function normalizeSocialLinks(links?: RawSocialLink[]): SocialLink[] {
  if (!links?.length) return SITE_SETTINGS_DEFAULTS.socialLinks ?? [];

  const normalized = links
    .map((link) => ({
      icon: (link.icon || link.platform) as SocialLink['icon'],
      href: link.href || link.url || '',
    }))
    .filter((link): link is SocialLink => Boolean(link.icon && link.href));

  return normalized.length > 0 ? normalized : (SITE_SETTINGS_DEFAULTS.socialLinks ?? []);
}

function mergeSettings(cms: SanitySiteSettings): SiteSettings {
  const logoUrl =
    cms?.logo?.asset != null
      ? urlFor(cms.logo).width(256).height(256).auto('format').url()
      : undefined;

  return {
    ...SITE_SETTINGS_DEFAULTS,
    ...cms,
    companyName: cms?.companyName || SITE_SETTINGS_DEFAULTS.companyName,
    socialLinks: normalizeSocialLinks(cms?.socialLinks),
    logoUrl,
  };
}

/** Fetches the Site Settings singleton, merged with code defaults as fallback. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const cms = await sanityFetch<SanitySiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
    revalidate: 3600,
  });

  return mergeSettings(cms);
});
