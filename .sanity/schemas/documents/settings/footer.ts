import { Menu, PanelBottom, Route } from 'lucide-react';
import { defineField } from 'sanity';

export const footer = defineField({
  name: 'footer',
  type: 'document',
  icon: PanelBottom,
  fields: [
    {
      name: 'logo',
      description: 'Best choice is to use an SVG where the color are set with currentColor',
      type: 'mainImage',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          icon: Menu,
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              name: 'items',
              type: 'array',
              of: [
                {
                  icon: Route,
                  type: 'object',
                  validation: (Rule) => Rule.required(),
                  fields: [
                    {
                      name: 'anchor',
                      type: 'anchor',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'icon',
                      type: 'image',
                    },
                  ],
                  preview: {
                    select: {
                      title: 'anchor.label',
                      subtitle: 'anchor.url',
                    },
                    prepare({ title, subtitle }) {
                      return {
                        title,
                        subtitle,
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
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
