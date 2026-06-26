import type { SectionId } from '@/lib/site-routes';

export function scrollToSection(sectionId: SectionId) {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  if (sectionId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
