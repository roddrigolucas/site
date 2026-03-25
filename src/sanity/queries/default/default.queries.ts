import { loadQuery } from '@/sanity/lib/store';
import { QueryResponseInitial } from '@sanity/react-loader';
import { groq } from 'next-sanity';

import { FooterType, NavBarType, SocialType } from '../config';
import { SEOGlobal } from './default.types';

// Queries

export const SEO_QUERY = groq`*[ _type == "seo.global" && language == $language][0]`;
export const SETTINGS_QUERY = groq`
  {
    "navbar": *[ _type == "navbar" && language == $language][0],
    "footer": *[ _type == "footer" && language == $language][0],
    "social": *[ _type == "social"][0],
  }
`;

// Functions
export async function getSeo(
  queryParams: any,
  isEnabled: boolean,
): Promise<QueryResponseInitial<SEOGlobal>> {
  return await loadQuery<SEOGlobal>(SEO_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['seo.global'] },
  });
}

export async function getSettings(
  queryParams: any,
  isEnabled: boolean,
): Promise<QueryResponseInitial<{ navbar: NavBarType; footer: FooterType; social: SocialType }>> {
  return await loadQuery<{ navbar: NavBarType; footer: FooterType; social: SocialType }>(
    SETTINGS_QUERY,
    queryParams,
    {
      perspective: isEnabled ? 'previewDrafts' : 'published',
      next: { tags: ['navbar', 'footer', 'social'] },
    },
  );
}
