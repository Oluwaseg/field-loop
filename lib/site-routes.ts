/** Section element IDs on the homepage — scroll targets, never shown in the URL. */
export const SECTION_IDS = {
  top: 'top',
  about: 'about',
  solutions: 'solutions',
  impact: 'impact',
  stories: 'stories',
  roi: 'roi',
  faq: 'faq',
  team: 'team',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_LINKS = [
  { section: SECTION_IDS.about, label: 'About' },
  { section: SECTION_IDS.solutions, label: 'Solutions' },
  { section: SECTION_IDS.impact, label: 'Impact' },
  { section: SECTION_IDS.stories, label: 'Stories' },
  { section: SECTION_IDS.roi, label: 'ROI' },
  { section: SECTION_IDS.faq, label: 'FAQ' },
  { section: SECTION_IDS.team, label: 'Team' },
] as const;

export const SCROLL_STORAGE_KEY = 'fieldloop-scroll-target';
