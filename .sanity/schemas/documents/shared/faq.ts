import { MessageCircleQuestion } from 'lucide-react';
import { defineType } from 'sanity';

export const faqShared = defineType({
  name: 'FAQShared',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    {
      name: 'content',
      type: 'array',
      of: [
        {
          icon: MessageCircleQuestion,
          type: 'object',
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
