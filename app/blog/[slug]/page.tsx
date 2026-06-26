import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarDays } from 'lucide-react';

import { Container } from '@/components/site/container';
import { PortableTextRenderer } from '@/sanity/components/portable-text';
import { sanityFetch } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/sanity/queries';
import type { PostDetail } from '@/sanity/types';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: POST_SLUGS_QUERY,
    tags: ['post'],
  });

  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<PostDetail | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['post', `post:${slug}`],
  });

  if (!post) {
    return { title: 'Post not found' };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : urlFor(post.featuredImage).width(1200).height(630).url();

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await sanityFetch<PostDetail | null>({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['post', `post:${slug}`],
  });

  if (!post) {
    notFound();
  }

  const imageUrl = urlFor(post.featuredImage).width(1600).height(900).auto('format').url();

  return (
    <article className='py-10 md:py-16'>
      <Container className='max-w-4xl'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 text-sm font-medium text-leaf-700 transition-colors hover:text-leaf-900'
        >
          <ArrowLeft className='size-4' />
          Back to blog
        </Link>

        <header className='mt-8'>
          <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
            <span className='inline-flex items-center gap-2'>
              <CalendarDays className='size-4 text-leaf-700' />
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </span>
            {post.author?.name ? (
              <>
                <span aria-hidden='true'>·</span>
                <span>{post.author.name}</span>
              </>
            ) : null}
          </div>

          <h1 className='mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl'>
            {post.title}
          </h1>

          <p className='mt-5 text-lg leading-relaxed text-muted-foreground'>{post.excerpt}</p>
        </header>

        <div className='relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-border'>
          <Image
            src={imageUrl}
            alt={post.featuredImage.alt || post.title}
            fill
            priority
            className='object-cover'
            sizes='(max-width: 896px) 100vw, 896px'
          />
        </div>

        <div className='prose-sanity mt-10 max-w-none'>
          <PortableTextRenderer value={post.body} />
        </div>
      </Container>
    </article>
  );
}
