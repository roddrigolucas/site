import { BookCheck, Star } from 'lucide-react';
import { defineType } from 'sanity';

export const aboutHomepage = defineType({
  name: 'aboutHomepage',
  title: 'About Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      type: 'blockContent',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'description',
      type: 'blockContent',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'ratings',
      type: 'array',
      validation: (Rule) => [Rule.required()],
      of: [
        {
          name: 'rating',
          icon: Star,
          type: 'object',
          validation: (Rule) => [Rule.required()],
          fields: [
            {
              name: 'score',
              type: 'number',
              validation: (Rule) => [Rule.required()],
            },
            {
              name: 'name',
              type: 'string',
              validation: (Rule) => [Rule.required()],
            },
          ],
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      validation: (Rule) => [Rule.required()],
      of: [
        {
          name: 'benefit',
          icon: BookCheck,
          type: 'object',
          validation: (Rule) => [Rule.required()],
          fields: [
            {
              name: 'icon',
              type: 'image',
              validation: (Rule) => [Rule.required()],
              options: {
                hotspot: true,
              },
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule) => [Rule.required()],
            },
            {
              name: 'description',
              type: 'blockContent',
              validation: (Rule) => [Rule.required()],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
});
