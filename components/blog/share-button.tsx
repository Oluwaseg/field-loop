'use client';

import { Share2 } from 'lucide-react';

type ShareButtonProps = {
  title: string;
};

export function ShareButton({ title }: ShareButtonProps) {
  const onShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* fall through to clipboard */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* noop */
    }
  };

  return (
    <button
      type='button'
      onClick={onShare}
      className='inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-leaf-600 hover:text-leaf-900'
    >
      <Share2 className='size-3.5' /> Share
    </button>
  );
}
