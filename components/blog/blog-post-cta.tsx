'use client';

import { ArrowUpRight } from 'lucide-react';

import { SectionLink } from '@/components/site/section-link';

export function BlogPostCta() {
  return (
    <div className='mt-6 flex flex-wrap justify-center gap-3'>
      <SectionLink
        section='roi'
        className='inline-flex items-center gap-1.5 rounded-full bg-amber-brand px-5 py-2.5 text-sm font-medium text-leaf-900 hover:opacity-90'
      >
        Try the ROI calculator <ArrowUpRight className='size-4' />
      </SectionLink>
      <SectionLink
        section='contact'
        className='inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/30 px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/10'
      >
        Get in touch
      </SectionLink>
    </div>
  );
}
