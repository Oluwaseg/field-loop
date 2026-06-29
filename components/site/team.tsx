'use client';

import { motion } from 'framer-motion';
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

import { urlFor } from '@/sanity/lib/image';
import type { TeamMember } from '@/sanity/types/team';
import { Container, Eyebrow } from './container';

type TeamProps = {
  team: TeamMember[];
};

const SOCIAL_ICON_MAP: Record<string, typeof FaLinkedin> = {
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  tiktok: FaTiktok,
  github: FaGithub,
};

const getSocialIcon = (icon?: string) => {
  if (!icon) return FaLinkedin;
  return SOCIAL_ICON_MAP[icon.toLowerCase()] ?? FaLinkedin;
};

export function Team({ team }: TeamProps) {
  return (
    <section id='team' className='section-pad bg-leaf-50/40'>
      <Container>
        <div className='max-w-2xl'>
          <Eyebrow>Our team</Eyebrow>
          <h2 className='mt-5 text-balance text-4xl leading-[1.08] text-leaf-900 sm:text-5xl'>
            The people behind FieldLoop.
          </h2>
          <p className='mt-5 text-base leading-relaxed text-muted-foreground'>
            A multidisciplinary team of agronomists, engineers, and data
            scientists united by one mission: making African agriculture smarter
            and more resilient.
          </p>
        </div>

        <div className='mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {team.map((member, i) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className='group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-leaf-500 hover:shadow-[0_30px_60px_-30px_oklch(0.4_0.15_150/0.35)]'
            >
              <div className='relative aspect-[4/5] w-full overflow-hidden bg-muted-foreground/5'>
                {member.image ? (
                  <img
                    src={urlFor(member.image)
                      .width(720)
                      .height(900)
                      .auto('format')
                      .url()}
                    alt={member.image.alt ?? member.name}
                    width={720}
                    height={900}
                    loading='lazy'
                    className='size-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                ) : (
                  <div className='grid h-full w-full place-items-center text-sm text-muted-foreground'>
                    No photo available
                  </div>
                )}
                <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-leaf-900/70 to-transparent' />
              </div>
              <div className='p-5'>
                <div className='text-base font-semibold text-leaf-900'>
                  {member.name}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {member.role}
                </div>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {member.socialLinks?.map((link) => {
                    const Icon = getSocialIcon(link.icon);
                    const label = link.icon
                      ? link.icon.charAt(0).toUpperCase() + link.icon.slice(1)
                      : 'Link';

                    return (
                      <a
                        key={`${link.icon}-${link.href}`}
                        href={link.href}
                        target='_blank'
                        rel='noreferrer noopener'
                        aria-label={label}
                        className='grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-leaf-700 hover:bg-leaf-700 hover:text-primary-foreground'
                      >
                        <Icon className='size-3.5' />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
