import { defineField } from 'sanity';

export const supportedLanguages = [
  { id: 'es', title: 'Spanish' },
  { id: 'en', title: 'English' },
  { id: 'pt-BR', title: 'Portuguese', isDefault: true },
];

export const translateDocuments = (documents: Array<any>) => {
  return documents.map((document) => {
    const { _type, fields, ...rest } = document;

    return {
      _type,
      fields: [
        defineField({
          name: 'language',
          type: 'string',
          readOnly: true,
          hidden: true,
        }),
        ...fields,
      ],
      ...rest,
    };
  });
};
