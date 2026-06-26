import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { ArrowUpRight } from 'lucide-react';

import { BlogPostCta } from '@/components/blog/blog-post-cta';
import { BlogPostHero } from '@/components/blog/blog-post-hero';
import { formatBlogDate, estimateReadingTime } from '@/lib/blog-utils';
import { PortableTextRenderer } from '@/sanity/components/portable-text';
import { sanityFetch } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/image';
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, RELATED_POSTS_QUERY } from '@/sanity/queries';
import type { PostDetail, PostListItem, PostListItemWithReadingTime } from '@/sanity/types';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = 'https://fieldloop.org';

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
      url: `/blog/${slug}`,
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

  const [post, related] = await Promise.all([
    sanityFetch<PostDetail | null>({
      query: POST_BY_SLUG_QUERY,
      params: { slug },
      tags: ['post', `post:${slug}`],
    }),
    sanityFetch<PostListItem[]>({
      query: RELATED_POSTS_QUERY,
      params: { slug },
      tags: ['post'],
    }),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = urlFor(post.featuredImage).width(1600).height(900).auto('format').url();
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const readingTime = estimateReadingTime(
    post.body
      .filter((block) => block._type === 'block')
      .map((block) =>
        'children' in block
          ? block.children?.map((child) => ('text' in child ? child.text : '')).join('')
          : '',
      )
      .join(' ') || post.excerpt,
  );

  const relatedWithReadingTime: PostListItemWithReadingTime[] = related.map((item) => ({
    ...item,
    readingTime: estimateReadingTime(item.excerpt),
  }));

  return (
    <>
      <Script
        id='article-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: imageUrl,
            datePublished: post.publishedAt,
            author: post.author
              ? { '@type': 'Person', name: post.author.name }
              : { '@type': 'Organization', name: 'FieldLoop' },
            mainEntityOfPage: articleUrl,
          }),
        }}
      />

      <BlogPostHero post={post} imageUrl={imageUrl} readingTime={readingTime} />

      <section className='container-x mx-auto max-w-[760px] py-16 sm:py-20'>
        <article className='space-y-8'>
          <PortableTextRenderer value={post.body} />
        </article>

        <div className='mt-16 rounded-3xl bg-leaf-900 p-10 text-center text-primary-foreground'>
          <h3 className='text-2xl font-display tracking-tight sm:text-3xl'>Want this on your farm?</h3>
          <p className='mt-3 text-sm text-primary-foreground/80'>
            Run our free ROI calculator or talk to the team — usually a 24 hour reply.
          </p>
          <BlogPostCta />
        </div>
      </section>

      {related.length > 0 ? (
        <section className='container-x mx-auto max-w-[1200px] pb-24'>
          <div className='mb-8 flex items-end justify-between'>
            <h3 className='text-2xl font-display tracking-tight text-foreground sm:text-3xl'>
              Keep reading
            </h3>
            <Link href='/blog' className='text-sm font-medium text-leaf-700 hover:text-leaf-900'>
              All posts →
            </Link>
          </div>
          <div className='grid gap-6 md:grid-cols-3'>
            {relatedWithReadingTime.map((item) => {
              const relatedImageUrl = urlFor(item.featuredImage)
                .width(800)
                .height(500)
                .auto('format')
                .url();

              return (
                <Link
                  key={item._id}
                  href={`/blog/${item.slug}`}
                  className='group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1'
                >
                  <div className='relative aspect-[16/10] overflow-hidden'>
                    <Image
                      src={relatedImageUrl}
                      alt={item.featuredImage.alt || item.title}
                      width={800}
                      height={500}
                      className='size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]'
                    />
                  </div>
                  <div className='p-5'>
                    <div className='text-xs text-muted-foreground'>
                      {formatBlogDate(item.publishedAt)} · {item.readingTime} min
                    </div>
                    <h4 className='mt-2 text-lg font-display tracking-tight text-foreground'>
                      {item.title}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
