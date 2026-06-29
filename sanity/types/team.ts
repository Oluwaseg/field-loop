import type { SanityImage } from '@/sanity/types/blog';
import type { SocialLink } from '@/sanity/types/site-settings';

export type TeamMember = {
  _id: string;
  name: string;
  role?: string;
  image?: SanityImage;
  socialLinks?: SocialLink[];
};
