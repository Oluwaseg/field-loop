import { defineField, defineType } from 'sanity';

/** Reusable social link: pick an icon + profile URL. */
export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon shown on the website.',
      options: {
        list: [
          { title: 'Facebook', value: 'facebook' },
          { title: 'X (Twitter)', value: 'twitter' },
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'GitHub', value: 'github' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Profile URL',
      type: 'url',
      description: 'Full link to your profile or page, e.g. https://linkedin.com/in/your-name',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'icon', subtitle: 'href' },
    prepare({ title, subtitle }) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Social link',
        subtitle,
      };
    },
  },
});
