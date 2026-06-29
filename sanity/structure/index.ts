import type { StructureResolver } from 'sanity/structure';

/**
 * Customizes the Studio desk structure.
 * Singletons (site settings) and grouped lists keep content scalable.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      S.documentTypeListItem('post').title('Blog Posts'),
      S.documentTypeListItem('person').title('People'),
      S.documentTypeListItem('teamMember').title('Team Members'),

      // Future sections:
      // S.documentTypeListItem('service').title('Services'),
      // S.documentTypeListItem('testimonial').title('Testimonials'),
      // S.documentTypeListItem('faq').title('FAQs'),
    ]);
