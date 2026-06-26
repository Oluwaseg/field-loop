import type { SiteSettings, SocialLink } from '@/sanity/types/site-settings';

export const SITE_SETTINGS_DEFAULTS: SiteSettings = {
  companyName: 'FieldLoop',
  tagline: 'Greener farms. Smarter future.',
  description:
    'Building a future where African agriculture is sustainable, data-driven, and resilient, ensuring food security for generations to come.',
  footerText:
    'Building a future where African agriculture is sustainable, data-driven, and resilient, ensuring food security for generations to come.',
  legalNote: 'Registered with the Corporate Affairs Commission (CAC), Lagos State.',
  email: 'hello@fieldloop.org',
  phone: '+234 704 362 9561\n+234 907 100 8244',
  address: 'Lateef Kayode Jakande Gardens, NYSC Bus-Stop, Lasu-Isheri Rd, Igando, Lagos.',
  socialLinks: [
    { icon: 'linkedin', href: 'https://www.linkedin.com/company/fieldloop' },
    { icon: 'twitter', href: 'https://x.com/fieldloop' },
    { icon: 'instagram', href: 'https://www.instagram.com/fieldloop' },
  ],
};

export function socialLinksForSeed(links: SocialLink[]) {
  return links.map((link, index) => ({
    _key: `social-${link.icon}-${index}`,
    _type: 'socialLink' as const,
    icon: link.icon,
    href: link.href,
  }));
}
