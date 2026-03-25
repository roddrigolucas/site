import { defineField, defineType } from 'sanity';

export const bannerShared = defineType({
  name: 'bannerShared',
  title: 'Banner Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    {
      name: 'button',
      type: 'anchor',
      validation: (Rule) => [Rule.required()],
    },
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => [Rule.required()],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
});
