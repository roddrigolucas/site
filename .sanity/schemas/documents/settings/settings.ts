import { Settings2Icon } from 'lucide-react';
import { defineField } from 'sanity';

export const settings = defineField({
  name: 'settings',
  title: 'Settings',
  type: 'object',
  icon: Settings2Icon,
  fields: [
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gtag',
      type: 'string',
      title: 'Google Tag Manager ID',
      description:
        'Is a single tag you can implement onto your website in order to use a variety of Google products and services',
    },
  ],
  preview: {
    select: {
      title: 'url',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
