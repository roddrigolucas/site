import { translateDocuments } from '../utils/translateDocument';
import { author, category, post } from './documents/blog';
import { heroContactpage } from './documents/contact';
import { aboutHomepage, heroHomepage, howItWorksHomepage } from './documents/home';
import { blogHomepage } from './documents/home/blog';
import { whyChooseHomepage } from './documents/home/whyChoose';
import { footer, navbar, settings } from './documents/settings';
import { seo } from './documents/settings/seo/default';
import { seoGlobal } from './documents/settings/seo/global';
import { seoPage } from './documents/settings/seo/page';
import { social } from './documents/settings/social';
import { bannerShared, contactShared, faqShared } from './documents/shared';
import { anchor, blockContent, mainImage, placeholderString } from './objects';

export const BlogSchemas = [author, category, post];
export const HomeSchemas = [
  heroHomepage,
  aboutHomepage,
  howItWorksHomepage,
  whyChooseHomepage,
  blogHomepage,
];
export const ContactSchemas = [heroContactpage];
export const SharedSchemas = [bannerShared, contactShared, faqShared];
export const SettingsSchemas = [seoGlobal, seoPage, seo, footer, navbar, settings];
export const TypesSchemas = [anchor, blockContent, mainImage, placeholderString];

export const schemaTypes = [
  ...BlogSchemas,
  ...translateDocuments(HomeSchemas),
  ...translateDocuments(ContactSchemas),
  ...translateDocuments(SettingsSchemas),
  ...translateDocuments(SharedSchemas),
  ...TypesSchemas,
  social,
];
