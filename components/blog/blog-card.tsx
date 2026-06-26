import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays } from 'lucide-react';

import { urlFor } from '@/sanity/lib/image';
import type { PostListItem } from '@/sanity/types';

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

type BlogCardProps = {
  post: PostListItem;
};

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = urlFor(post.featuredImage).width(800).height(500).auto('format').url();

  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[0_8px_30px_-12px_rgba(15,50,32,0.12)] transition-all hover:-translate-y-0.5 hover:border-leaf-100 hover:shadow-[0_16px_40px_-16px_rgba(15,50,32,0.18)]'>
      <Link href={`/blog/${post.slug}`} className='relative block aspect-[16/10] overflow-hidden'>
        <Image
          src={imageUrl}
          alt={post.featuredImage.alt || post.title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </Link>

      <div className='flex flex-1 flex-col p-6'>
        <div className='flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-leaf-700'>
          <CalendarDays className='size-3.5' />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </div>

        <h2 className='mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground'>
          <Link href={`/blog/${post.slug}`} className='hover:text-leaf-700'>
            {post.title}
          </Link>
        </h2>

        <p className='mt-3 flex-1 text-sm leading-relaxed text-muted-foreground'>{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className='mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-700 transition-colors hover:text-leaf-900'
        >
          Read article
          <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
        </Link>
      </div>
    </article>
  );
}
