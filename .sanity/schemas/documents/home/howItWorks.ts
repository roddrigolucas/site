import { Lightbulb } from 'lucide-react';
import { defineType } from 'sanity';

export const howItWorksHomepage = defineType({
  name: 'howItWorksHomepage',
  title: 'How It Works Section',
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
      name: 'button',
      type: 'anchor',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'funcionalities',
      type: 'array',
      validation: (Rule) => [Rule.required()],
      of: [
        {
          name: 'funcionality',
          icon: Lightbulb,
          type: 'object',
          validation: (Rule) => [Rule.required()],
          fields: [
            {
              name: 'title',
              type: 'string',
              validation: (Rule) => [Rule.required()],
            },
            {
              name: 'description',
              type: 'text',
              validation: (Rule) => [Rule.required()],
            },
            {
              name: 'slug',
              type: 'slug',
              validation: (Rule) => [Rule.required()],
            },
            {
              name: 'funcionalities',
              type: 'array',
              of: [
                {
                  name: 'funcionality',
                  icon: Lightbulb,
                  type: 'object',
                  fields: [
                    {
                      name: 'icon',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      validation: (Rule) => [Rule.required()],
                    },
                    {
                      name: 'title',
                      type: 'string',
                      validation: (Rule) => [Rule.required()],
                    },
                    {
                      name: 'description',
                      type: 'text',
                      validation: (Rule) => [Rule.required()],
                    },
                  ],
                },
              ],
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
