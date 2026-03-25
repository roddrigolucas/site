import { defineType } from 'sanity';

export const anchor = defineType({
  name: 'anchor',
  title: 'Anchor',
  type: 'object',
  initialValue: {
    isDisabled: false,
    isExternal: false,
  },
  fields: [
    {
      name: 'isDisabled',
      title: 'Is Disabled?',
      type: 'boolean',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'isExternal',
      title: 'Is External?',
      type: 'boolean',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    },
    {
      name: 'url',
      title: 'URL',
      description:
        'A Relative URL - points to a path inside like: /contact, Link to an element with a specified ID within the page like: #section2 and An External URL - Points to another website like: https://www.google.com.br/',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    },
  ],
});
