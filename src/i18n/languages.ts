export const languages = [
  { id: 'pt-BR', title: 'Portuguese', isDefault: true },
  { id: 'en', title: 'English' },
  { id: 'es', title: 'Spanish' },
];

export const locales = ['pt-BR', 'en', 'es'];

export const i18n = {
  languages,
  locales,
  base: 'pt-BR',
};

export type Locale = (typeof i18n)['locales'][number];
