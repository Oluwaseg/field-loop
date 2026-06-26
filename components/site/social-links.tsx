import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import type { SocialIcon, SocialLink } from '@/sanity/types/site-settings';

const SOCIAL_ICONS: Record<SocialIcon, typeof FaFacebook> = {
  facebook: FaFacebook,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
  github: FaGithub,
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
};

export function SocialLinks({ links, className }: SocialLinksProps) {
  if (!links.length) return null;

  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon] ?? FaLinkedin;
        const label = link.icon.charAt(0).toUpperCase() + link.icon.slice(1);

        return (
          <a
            key={`${link.icon}-${link.href}`}
            href={link.href}
            target='_blank'
            rel='noreferrer noopener'
            aria-label={label}
            className='grid size-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-amber-brand hover:bg-amber-brand hover:text-leaf-900'
          >
            <Icon className='size-3.5' />
          </a>
        );
      })}
    </div>
  );
}
