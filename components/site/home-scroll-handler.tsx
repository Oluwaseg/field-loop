'use client';

import { useEffect } from 'react';

import { scrollToSection } from '@/lib/scroll-to-section';
import { SCROLL_STORAGE_KEY, type SectionId } from '@/lib/site-routes';

/** Runs once on the homepage to scroll after cross-page navigation. */
export function HomeScrollHandler() {
  useEffect(() => {
    const target = sessionStorage.getItem(SCROLL_STORAGE_KEY) as SectionId | null;
    if (!target) return;

    sessionStorage.removeItem(SCROLL_STORAGE_KEY);
    requestAnimationFrame(() => scrollToSection(target));
  }, []);

  return null;
}
