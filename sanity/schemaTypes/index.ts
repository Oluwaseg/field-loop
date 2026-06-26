import type { SchemaTypeDefinition } from 'sanity';

import { person } from '@/sanity/schemaTypes/documents/person';
import { post } from '@/sanity/schemaTypes/documents/post';
import { siteSettings } from '@/sanity/schemaTypes/documents/siteSettings';
import { blockContent } from '@/sanity/schemaTypes/objects/blockContent';
import { seo } from '@/sanity/schemaTypes/objects/seo';

/**
 * Schema registry — add new document/object types here.
 *
 * Future content types (hero, features, testimonials, faq, services, team)
 * can be added as new files under documents/ or objects/ and registered below.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  person,
  siteSettings,

  // Objects
  blockContent,
  seo,
];
