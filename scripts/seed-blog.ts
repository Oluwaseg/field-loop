/**
 * Seeds sample blog posts from sanity/seed/sample-posts.ts into Sanity.
 *
 * Usage:
 *   pnpm seed:blog
 *   pnpm seed:blog -- --force        # overwrite posts that share a slug
 *   pnpm seed:blog -- --author-id=…  # pick a specific person document
 *
 * Requires SANITY_API_TOKEN with Editor (write) access in .env.local.
 * Optional: SANITY_SEED_AUTHOR_ID — defaults to the first person in the dataset.
 */

import { createClient } from 'next-sanity';

import { sampleBodyToPortableText } from '../sanity/seed/body-to-portable-text';
import { DEFAULT_SAMPLE_BODY, SAMPLE_POSTS } from '../sanity/seed/sample-posts';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_READ_TOKEN;

const args = process.argv.slice(2);
const force = args.includes('--force');
const authorIdArg = args.find((arg) => arg.startsWith('--author-id='))?.split('=')[1];
const authorIdEnv = process.env.SANITY_SEED_AUTHOR_ID;

if (!projectId || !dataset) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET.');
  process.exit(1);
}

if (!token) {
  console.error(
    'Missing SANITY_API_TOKEN (or SANITY_API_WRITE_TOKEN). Create an Editor token at sanity.io/manage → API → Tokens.',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

type Person = { _id: string; name: string; role?: string };
type ExistingPost = { _id: string; slug: string };

async function resolveAuthorId(): Promise<string> {
  const people = await client.fetch<Person[]>('*[_type == "person"] | order(name asc) {_id, name, role}');

  if (people.length === 0) {
    throw new Error('No person documents found. Create an author in /studio first.');
  }

  const preferredId = authorIdArg || authorIdEnv;
  if (preferredId) {
    const match = people.find((person) => person._id === preferredId);
    if (!match) {
      throw new Error(`Author "${preferredId}" not found. Available: ${people.map((p) => p._id).join(', ')}`);
    }
    return match._id;
  }

  return people[0]._id;
}

async function uploadFeaturedImage(url: string, filename: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${url} (${response.status})`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get('content-type') || 'image/jpeg';

  return client.assets.upload('image', buffer, {
    filename,
    contentType,
  });
}

async function seedPost(
  sample: (typeof SAMPLE_POSTS)[number],
  authorId: string,
  existingBySlug: Map<string, string>,
) {
  const existingId = existingBySlug.get(sample.slug);

  if (existingId && !force) {
    console.log(`  skip  ${sample.slug} (already exists)`);
    return 'skipped';
  }

  console.log(`  ${existingId && force ? 'update' : 'create'} ${sample.slug}`);

  const asset = await uploadFeaturedImage(sample.featuredImage.url, `${sample.slug}.jpg`);
  const body = sampleBodyToPortableText(DEFAULT_SAMPLE_BODY);

  const doc = {
    _type: 'post' as const,
    title: sample.title,
    slug: { _type: 'slug' as const, current: sample.slug },
    excerpt: sample.excerpt,
    publishedAt: sample.publishedAt,
    category: sample.category,
    author: { _type: 'reference' as const, _ref: authorId },
    featuredImage: {
      _type: 'image' as const,
      alt: sample.featuredImage.alt,
      asset: { _type: 'reference' as const, _ref: asset._id },
    },
    body,
  };

  if (existingId) {
    await client.createOrReplace({ ...doc, _id: existingId });
    return 'updated';
  }

  await client.create(doc);
  return 'created';
}

async function main() {
  console.log('FieldLoop blog seed\n');

  const [authorId, people, existingPosts] = await Promise.all([
    resolveAuthorId(),
    client.fetch<Person[]>('*[_type == "person"] | order(name asc) {_id, name, role}'),
    client.fetch<ExistingPost[]>(
      '*[_type == "post" && defined(slug.current)]{_id, "slug": slug.current}',
    ),
  ]);

  const author = people.find((person) => person._id === authorId);
  console.log(`Author: ${author?.name ?? authorId}${author?.role ? ` (${author.role})` : ''}`);
  console.log(`Posts to seed: ${SAMPLE_POSTS.length}`);
  console.log(`Mode: ${force ? 'force (overwrite matching slugs)' : 'skip existing slugs'}\n`);

  const existingBySlug = new Map(existingPosts.map((post) => [post.slug, post._id]));

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const sample of SAMPLE_POSTS) {
    const result = await seedPost(sample, authorId, existingBySlug);
    if (result === 'created') created += 1;
    if (result === 'updated') updated += 1;
    if (result === 'skipped') skipped += 1;
  }

  console.log(`\nDone. created=${created}, updated=${updated}, skipped=${skipped}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes('Insufficient permissions')) {
    console.error(
      '\nSeed failed: your Sanity API token needs Editor (write) access.\n' +
        'Create one at sanity.io/manage → API → Tokens, then set SANITY_API_TOKEN in .env.local.',
    );
  } else {
    console.error('\nSeed failed:', message);
  }

  process.exit(1);
});
