import { defineQuery } from 'next-sanity';

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "category": coalesce(category, "Stories"),
  featuredImage {
    ...,
    "alt": coalesce(alt, asset->altText)
  },
  author->{
    _id,
    name,
    role,
    image
  }
`;

/** All published blog posts for the listing page. */
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }
`);

/** Slugs for static generation. */
export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`);

/** Related posts for a single article page. */
export const RELATED_POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current != $slug && defined(slug.current)] | order(publishedAt desc)[0...3] {
    ${postFields}
  }
`);

/** Distinct categories used across published posts. */
export const POST_CATEGORIES_QUERY = defineQuery(/* groq */ `
  array::unique(*[_type == "post" && defined(category)].category) | order(@ asc)
`);

/** Single post by slug. */
export const POST_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          "href": coalesce(href, @.url)
        }
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }
`);
