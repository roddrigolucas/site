import { defineField } from 'sanity';

export const seo = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title for SEO & Social Sharing',
      description:
        'Make it as enticing as possible to convert users in social feeds and Google searches. Ideally between 15 and 55 characters.',
      type: 'string',
      validation: (Rule) => [
        Rule.min(15).warning('A title of min. 15 characters is recommended'),
        Rule.max(55).warning('Longer titles may be truncated by search engines'),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Short paragraph for SEO & social sharing (Meta Description)',
      description:
        "⚡ Optional but highly encouraged as it'll help you convert more visitors from Google & social. Ideally between 70 and 160 characters.",
      type: 'text',
      rows: 3,
      validation: (Rule) => [
        Rule.min(70).warning('A description of min. 70 characters is recommended'),
        Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Open Graph Image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
