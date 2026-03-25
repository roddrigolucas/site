import { SmilePlus } from 'lucide-react';
import { defineField } from 'sanity';

export const social = defineField({
  name: 'social',
  type: 'document',
  icon: SmilePlus,
  fields: [
    {
      name: 'facebook',
      type: 'url',
    },
    {
      name: 'instagram',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    },
    {
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
    },
    {
      name: 'twitter',
      title: 'Twitter/X',
      type: 'url',
    },
    {
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Social Settings',
        subtitle: 'Facebook, Instagram, Linkedin, Twitter and others...',
      };
    },
  },
});
