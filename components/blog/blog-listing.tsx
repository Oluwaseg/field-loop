'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Search, Sprout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { formatBlogDate, estimateReadingTime } from '@/lib/blog-utils';
import type { PostListItem, PostListItemWithReadingTime } from '@/sanity/types';

export type BlogPostCard = PostListItemWithReadingTime & {
  imageUrl: string;
};

type BlogListingProps = {
  posts: BlogPostCard[];
  categories: string[];
};

export function BlogListing({ posts, categories }: BlogListingProps) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');

  const filterCategories = ['All', ...categories];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchCategory = active === 'All' || post.category === active;
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [active, posts, query]);

  const [featured, ...rest] = filtered;

  if (posts.length === 0) {
    return (
      <div className='container-x mx-auto max-w-[1200px] section-pad'>
        <div className='rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground'>
          <h2 className='text-2xl font-display tracking-tight text-foreground'>No posts yet</h2>
          <p className='mx-auto mt-3 max-w-md'>
            Publish your first article in{' '}
            <a href='/studio' className='font-medium text-leaf-700 underline underline-offset-4'>
              Sanity Studio
            </a>{' '}
            to see it appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className='relative overflow-hidden pt-32 pb-16 grain-bg'>
        <div className='container-x mx-auto max-w-[1200px]'>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='max-w-3xl'
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-leaf-100 bg-leaf-50/70 px-3 py-1 text-xs font-medium text-leaf-900'>
              <Sprout className='size-3.5 text-leaf-700' />
              Field Notes
            </div>
            <h1 className='mt-5 text-5xl font-display tracking-tight text-foreground sm:text-6xl md:text-7xl'>
              Dispatches from the <span className='text-leaf-700 italic'>farmland</span>.
            </h1>
            <p className='mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg'>
              Honest field notes, post-mortems, and data from FieldLoop&apos;s work with Nigerian
              farmers — written by the people doing it.
            </p>
          </motion.div>

          <div className='mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <div className='relative w-full md:max-w-sm'>
              <Search className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search field notes…'
                className='w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-leaf-600 focus:outline-none focus:ring-2 focus:ring-leaf-600/20'
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              {filterCategories.map((category) => (
                <button
                  key={category}
                  type='button'
                  onClick={() => setActive(category)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active === category
                      ? 'border-leaf-900 bg-leaf-900 text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground hover:border-leaf-600 hover:text-leaf-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured ? (
        <section className='container-x mx-auto max-w-[1200px] pb-12'>
          <Link
            href={`/blog/${featured.slug}`}
            className='group grid overflow-hidden rounded-3xl border border-border bg-card ring-soft md:grid-cols-5'
          >
            <div className='relative md:col-span-3'>
              <div className='aspect-[16/10] w-full overflow-hidden md:aspect-auto md:h-full'>
                <Image
                  src={featured.imageUrl}
                  alt={featured.featuredImage.alt || featured.title}
                  width={1200}
                  height={750}
                  className='size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]'
                  priority
                />
              </div>
              <div className='absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-leaf-900 backdrop-blur'>
                Featured · {featured.category}
              </div>
            </div>
            <div className='flex flex-col justify-between gap-6 p-7 md:col-span-2 md:p-10'>
              <div>
                <div className='flex items-center gap-3 text-xs text-muted-foreground'>
                  <Calendar className='size-3.5' />
                  {formatBlogDate(featured.publishedAt)} · {featured.readingTime} min read
                </div>
                <h2 className='mt-4 text-3xl font-display tracking-tight text-foreground md:text-4xl'>
                  {featured.title}
                </h2>
                <p className='mt-4 text-sm text-muted-foreground md:text-base'>{featured.excerpt}</p>
              </div>
              <div className='flex items-center justify-between'>
                {featured.author ? (
                  <div className='flex items-center gap-3'>
                    <div className='grid size-9 place-items-center rounded-full bg-leaf-50 text-sm font-semibold text-leaf-900'>
                      {featured.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className='text-sm font-medium text-foreground'>{featured.author.name}</div>
                      {featured.author.role ? (
                        <div className='text-xs text-muted-foreground'>{featured.author.role}</div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <span />
                )}
                <span className='inline-flex items-center gap-1 text-sm font-medium text-leaf-900 transition-transform group-hover:translate-x-0.5'>
                  Read <ArrowUpRight className='size-4' />
                </span>
              </div>
            </div>
          </Link>
        </section>
      ) : null}

      <section className='container-x mx-auto max-w-[1200px] section-pad pt-0'>
        {rest.length === 0 ? (
          <div className='rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground'>
            Nothing matches that yet. Try a different search.
          </div>
        ) : (
          <div className='grid gap-7 sm:grid-cols-2 lg:grid-cols-3'>
            {rest.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className='group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(15,50,32,0.25)]'
                >
                  <div className='relative aspect-[16/10] overflow-hidden'>
                    <Image
                      src={post.imageUrl}
                      alt={post.featuredImage.alt || post.title}
                      width={800}
                      height={500}
                      className='size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]'
                    />
                    <div className='absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[11px] font-medium text-leaf-900 backdrop-blur'>
                      {post.category}
                    </div>
                  </div>
                  <div className='flex flex-1 flex-col gap-3 p-6'>
                    <div className='text-xs text-muted-foreground'>
                      {formatBlogDate(post.publishedAt)} · {post.readingTime} min
                    </div>
                    <h3 className='text-xl font-display tracking-tight text-foreground'>{post.title}</h3>
                    <p className='line-clamp-3 text-sm text-muted-foreground'>{post.excerpt}</p>
                    <div className='mt-auto flex items-center justify-between pt-2'>
                      {post.author ? (
                        <span className='text-xs font-medium text-foreground'>{post.author.name}</span>
                      ) : (
                        <span />
                      )}
                      <span className='inline-flex items-center gap-1 text-xs font-medium text-leaf-700'>
                        Read <ArrowUpRight className='size-3.5' />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
