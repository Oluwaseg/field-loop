'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

import { ShareButton } from '@/components/blog/share-button';
import { formatBlogDate } from '@/lib/blog-utils';
import type { PostDetail } from '@/sanity/types';

type BlogPostHeroProps = {
  post: PostDetail;
  imageUrl: string;
  readingTime: number;
};

export function BlogPostHero({ post, imageUrl, readingTime }: BlogPostHeroProps) {
  return (
    <section className='relative pt-28'>
      <div className='container-x mx-auto max-w-[1100px]'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground'
        >
          <ArrowLeft className='size-4' /> All field notes
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mt-6 max-w-4xl'
        >
          <div className='flex flex-wrap items-center gap-3 text-xs text-muted-foreground'>
            <span className='rounded-full bg-leaf-50 px-2.5 py-1 font-medium text-leaf-900'>
              {post.category}
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <Calendar className='size-3.5' />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className='inline-flex items-center gap-1.5'>
              <Clock className='size-3.5' />
              {readingTime} min read
            </span>
          </div>

          <h1 className='mt-5 text-4xl font-display tracking-tight text-foreground sm:text-5xl md:text-6xl'>
            {post.title}
          </h1>
          <p className='mt-6 max-w-3xl text-lg text-muted-foreground'>{post.excerpt}</p>

          {post.author ? (
            <div className='mt-8 flex items-center justify-between border-t border-border pt-6'>
              <div className='flex items-center gap-3'>
                <div className='grid size-11 place-items-center rounded-full bg-leaf-50 text-base font-semibold text-leaf-900'>
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className='text-sm font-medium text-foreground'>{post.author.name}</div>
                  {post.author.role ? (
                    <div className='text-xs text-muted-foreground'>{post.author.role}</div>
                  ) : null}
                </div>
              </div>
              <ShareButton title={post.title} />
            </div>
          ) : (
            <div className='mt-8 flex justify-end border-t border-border pt-6'>
              <ShareButton title={post.title} />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='mt-10 overflow-hidden rounded-3xl border border-border ring-soft'
        >
          <Image
            src={imageUrl}
            alt={post.featuredImage.alt || post.title}
            width={1600}
            height={900}
            className='aspect-[16/9] w-full object-cover'
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
