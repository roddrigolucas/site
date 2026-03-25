import { BadgeCheck } from 'lucide-react';
import { defineType } from 'sanity';

export const whyChooseHomepage = defineType({
  name: 'whyChooseHomepage',
  title: 'Why Choose Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      type: 'blockContent',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'reasons',
      type: 'array',
      validation: (Rule) => [Rule.required()],
      of: [
        {
          icon: BadgeCheck,
          title: 'Reason',
          type: 'object',
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
              name: 'text',
              type: 'string',
              validation: (Rule) => [Rule.required()],
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      title: 'Images Elements',
      type: 'object',
      fields: [
        {
          name: 'image',
          title: 'Main Image',
          type: 'image',
          validation: (Rule) => [Rule.required()],
          options: {
            hotspot: true,
          },
        },
        {
          name: 'elements',
          title: 'Image Elements',
          type: 'array',
          validation: (Rule) => [
            Rule.required().length(4).error('Required field with at most 4 entries.'),
            Rule.unique(),
          ],
          of: [
            {
              title: 'Image Element',
              type: 'image',
              options: {
                hotspot: true,
              },
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
