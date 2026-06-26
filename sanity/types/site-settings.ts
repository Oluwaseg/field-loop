export type SocialIcon =
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'instagram'
  | 'youtube'
  | 'whatsapp'
  | 'tiktok'
  | 'github';

export type SocialLink = {
  icon: SocialIcon;
  href: string;
};

export type SiteSettings = {
  companyName: string;
  tagline?: string;
  description?: string;
  footerText?: string;
  legalNote?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: SocialLink[];
  logoUrl?: string;
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
};
