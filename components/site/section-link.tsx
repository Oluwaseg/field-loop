'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { scrollToSection } from '@/lib/scroll-to-section';
import { SCROLL_STORAGE_KEY, type SectionId } from '@/lib/site-routes';

type SectionLinkProps = {
  section: SectionId;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/**
 * Scrolls to a homepage section without putting #hash in the URL.
 * From other routes, navigates to / then scrolls via sessionStorage.
 */
export function SectionLink({ section, className, children, onNavigate }: SectionLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return (
      <button
        type='button'
        className={className}
        onClick={() => {
          scrollToSection(section);
          onNavigate?.();
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href='/'
      className={className}
      onClick={() => {
        sessionStorage.setItem(SCROLL_STORAGE_KEY, section);
        onNavigate?.();
      }}
    >
      {children}
    </Link>
  );
}

type HomeLinkProps = {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/** Link to homepage root without hash fragments. */
export function HomeLink({ className, children, onNavigate }: HomeLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return (
      <button
        type='button'
        className={className}
        onClick={() => {
          scrollToSection('top');
          onNavigate?.();
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <Link href='/' className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}
