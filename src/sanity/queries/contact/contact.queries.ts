import { loadQuery, QueryResponseInitial } from '@sanity/react-loader';
import { groq } from 'next-sanity';

import { FAQType, HeroContactpageType } from './contact.types';

// Types
interface ContactQueryType {
  hero: HeroContactpageType;
  faq: FAQType;
}

// Queries
export const CONTACTPAGE_QUERY = groq`
  {
    "hero": *[ _type == "heroContactpage" && language == $language][0],
    "faq": *[ _type == "FAQShared" && language == $language][0],
  }
`;

// Functions
export async function getContactPage(
  queryParams: any,
  isEnabled: boolean,
): Promise<QueryResponseInitial<ContactQueryType>> {
  return await loadQuery<ContactQueryType>(CONTACTPAGE_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: { tags: ['heroContactpage', 'FAQShared'] },
  });
}
