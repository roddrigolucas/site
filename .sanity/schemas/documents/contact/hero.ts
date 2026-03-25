import { defineType } from 'sanity';

export const heroContactpage = defineType({
  name: 'heroContactpage',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'description',
      type: 'blockContent',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'image',
      type: 'mainImage',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'button',
      type: 'anchor',
      validation: (Rule) => [Rule.required()],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
});
