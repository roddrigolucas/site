import { defineType } from 'sanity';

export const heroHomepage = defineType({
  name: 'heroHomepage',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'overline',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    },
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
      name: 'video',
      type: 'object',
      fields: [
        {
          name: 'thumbnail',
          type: 'image',
          validation: (Rule) => [Rule.required()],
          options: {
            hotspot: true,
          },
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
          validation: (Rule) => [Rule.required()],
        },
      ],
    },
    {
      name: 'input',
      type: 'object',
      validation: (Rule) => [Rule.required()],
      fields: [
        {
          name: 'placeholder',
          type: 'string',
          validation: (Rule) => [Rule.required()],
        },
        {
          name: 'errorMessage',
          title: 'Error Message',
          type: 'string',
          validation: (Rule) => [Rule.required()],
        },
      ],
    },
    {
      name: 'button',
      type: 'anchor',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'companies',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule) => [Rule.required()],
        },
        {
          name: 'companies',
          type: 'array',
          validation: (Rule) => [Rule.required()],
          of: [
            {
              title: 'Company',
              type: 'object',
              fields: [
                {
                  name: 'name',
                  type: 'string',
                  validation: (Rule) => [Rule.required()],
                },
                {
                  name: 'image',
                  type: 'image',
                  validation: (Rule) => [Rule.required()],
                  options: {
                    hotspot: true,
                  },
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
