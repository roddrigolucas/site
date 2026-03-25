import { LayoutGrid } from 'lucide-react';
import { defineType } from 'sanity';

export const category = defineType({
  name: 'category',
  icon: LayoutGrid,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'text',
    },
  ],
});
