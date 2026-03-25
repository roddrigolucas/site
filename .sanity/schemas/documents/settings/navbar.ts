import { PanelTop, Route } from 'lucide-react';
import { defineField } from 'sanity';

export const navbar = defineField({
  name: 'navbar',
  title: 'NavBar',
  type: 'document',
  icon: PanelTop,
  fields: [
    {
      name: 'logo',
      description: 'Best choice is to use an SVG where the color are set with currentColor',
      type: 'mainImage',
    },
    {
      name: 'navigation',
      type: 'array',
      of: [
        {
          type: 'anchor',
          icon: Route,
        },
      ],
    },
    {
      name: 'actions',
      type: 'object',
      fields: [
        {
          name: 'register',
          title: 'Register/Login Button',
          type: 'anchor',
        },
        {
          name: 'cta',
          title: 'Call to action',
          type: 'anchor',
        },
      ],
    },
  ],
});
