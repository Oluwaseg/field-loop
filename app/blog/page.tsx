import type { Metadata } from 'next';

import { BlogCard } from '@/components/blog/blog-card';
import { Container, Eyebrow } from '@/components/site/container';
import { sanityFetch } from '@/sanity/lib/fetch';
import { POSTS_QUERY } from '@/sanity/queries';
import type { PostListItem } from '@/sanity/types';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stories and insights from FieldLoop on smart farming, IoT, drones, and reducing post-harvest losses.',
};

export default async function BlogPage() {
  const posts = await sanityFetch<PostListItem[]>({
    query: POSTS_QUERY,
    tags: ['post'],
  });

  return (
    <section className='py-16 md:py-24'>
      <Container>
        <div className='max-w-2xl'>
          <Eyebrow>Insights</Eyebrow>
          <h1 className='mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl'>
            FieldLoop Blog
          </h1>
          <p className='mt-4 text-base leading-relaxed text-muted-foreground md:text-lg'>
            Practical perspectives on agritech, precision farming, and building a more resilient food
            system across Nigeria.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className='mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3'>
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className='mt-12 rounded-3xl border border-dashed border-border bg-leaf-50/50 px-6 py-16 text-center'>
            <h2 className='font-heading text-2xl font-semibold text-foreground'>No posts yet</h2>
            <p className='mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground'>
              Publish your first article in{' '}
              <a href='/studio' className='font-medium text-leaf-700 underline underline-offset-4'>
                Sanity Studio
              </a>{' '}
              to see it appear here.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
