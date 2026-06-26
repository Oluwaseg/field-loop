import Image from 'next/image';
import { Sprout } from 'lucide-react';

type SiteLogoMarkProps = {
  logoUrl?: string;
  companyName: string;
  size?: 'sm' | 'md';
  variant?: 'nav' | 'footer';
};

export function SiteLogoMark({
  logoUrl,
  companyName,
  size = 'sm',
  variant = 'nav',
}: SiteLogoMarkProps) {
  const boxClass = size === 'md' ? 'size-9' : 'size-8';
  const iconClass = size === 'md' ? 'size-4' : 'size-4';

  if (logoUrl) {
    return (
      <span
        className={`relative grid ${boxClass} shrink-0 overflow-hidden rounded-full ${
          variant === 'footer' ? 'bg-white' : 'bg-leaf-700'
        }`}
      >
        <Image src={logoUrl} alt={`${companyName} logo`} fill className='object-cover' />
      </span>
    );
  }

  return (
    <span
      className={`grid ${boxClass} place-items-center rounded-full ${
        variant === 'footer'
          ? 'bg-amber-brand text-leaf-900'
          : 'bg-leaf-700 text-primary-foreground'
      }`}
    >
      <Sprout className={iconClass} strokeWidth={2.4} />
    </span>
  );
}

type SiteLogoTextProps = {
  companyName: string;
  accentClassName?: string;
};

export function SiteLogoText({
  companyName,
  accentClassName = 'text-leaf-700',
}: SiteLogoTextProps) {
  if (companyName.startsWith('Field')) {
    return (
      <>
        Field<span className={accentClassName}>{companyName.slice(5) || 'Loop'}</span>
      </>
    );
  }

  return <>{companyName}</>;
}
