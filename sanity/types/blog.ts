import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageObject } from '@sanity/image-url';

export type SanityImage = SanityImageObject & {
  alt?: string;
  caption?: string;
};

export type PostAuthor = {
  _id: string;
  name: string;
  role?: string;
  image?: SanityImage;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  featuredImage: SanityImage;
  author?: PostAuthor;
};

export type PostListItemWithReadingTime = PostListItem & {
  readingTime: number;
};

export type PostDetail = PostListItem & {
  body: PortableTextBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
};
