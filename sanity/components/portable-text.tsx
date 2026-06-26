import type { PortableTextComponents } from '@portabletext/react';
import { PortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity/lib/image';
import type { SanityImage } from '@/sanity/types';

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className='mt-12 text-3xl font-display tracking-tight text-foreground first:mt-0'>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className='mt-10 text-2xl font-display tracking-tight text-foreground'>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className='mt-8 text-xl font-semibold text-foreground'>{children}</h4>
    ),
    normal: ({ children }) => (
      <p className='text-lg leading-relaxed text-foreground/85'>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className='relative my-10 rounded-2xl border-l-4 border-leaf-700 bg-leaf-50/60 p-7 text-xl font-display italic text-leaf-900'>
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className='space-y-3'>{children}</ul>,
    number: ({ children }) => <ol className='list-decimal space-y-3 pl-6'>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className='flex gap-3 text-lg text-foreground/85'>
        <span className='mt-3 inline-block size-1.5 shrink-0 rounded-full bg-leaf-700' />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className='text-lg text-foreground/85'>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className='font-semibold text-foreground'>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className='rounded bg-leaf-50 px-1.5 py-0.5 font-mono text-sm text-leaf-900'>
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');

      if (isExternal) {
        return (
          <a
            href={href}
            className='font-medium text-leaf-700 underline underline-offset-4 hover:text-leaf-900'
            target={value?.openInNewTab ? '_blank' : undefined}
            rel={value?.openInNewTab ? 'noreferrer noopener' : undefined}
          >
            {children}
          </a>
        );
      }

      return (
        <Link
          href={href}
          className='font-medium text-leaf-700 underline underline-offset-4 hover:text-leaf-900'
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage;
      if (!image?.asset) return null;

      const imageUrl = urlFor(image).width(1200).auto('format').url();

      return (
        <figure className='my-10 overflow-hidden rounded-2xl border border-border bg-card'>
          <Image
            src={imageUrl}
            alt={image.alt || ''}
            width={1200}
            height={675}
            className='h-auto w-full object-cover'
          />
          {image.caption ? (
            <figcaption className='px-4 py-3 text-sm text-muted-foreground'>
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

type PortableTextRendererProps = {
  value: PortableTextBlock[];
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />;
}
