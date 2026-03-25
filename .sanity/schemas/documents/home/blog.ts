import { BookCheck, Star } from 'lucide-react';
import { defineType } from 'sanity';

export const blogHomepage = defineType({
  name: 'blogHomepage',
  title: 'Blog Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      type: 'blockContent',
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
