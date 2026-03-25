import { loadQuery } from '@/sanity/lib/store';
import { QueryResponseInitial } from '@sanity/react-loader';
import { groq } from 'next-sanity';

import { PostType } from '../blog';
import {
  AboutHomepageType,
  BannerHomepageType,
  BlogHomepageType,
  ContactHomepageType,
  HeroHomepageType,
  HowItWorksHomepageType,
  WhyChooseHomepageType,
} from './home.types';

// Types
interface HomepageQueryType {
  hero: HeroHomepageType;
  about: AboutHomepageType;
  banner: BannerHomepageType;
  howItWorks: HowItWorksHomepageType;
  whyChoose: WhyChooseHomepageType;
  blog: BlogHomepageType;
  posts: PostType[];
  contact: ContactHomepageType;
}

// Queries
export const HOMEPAGE_QUERY = groq`
  {
    "hero": *[ _type == "heroHomepage" && language == $language][0],
    "about": *[ _type == "aboutHomepage" && language == $language][0],
    "banner": *[ _type == "bannerShared" && language == $language][0],
    "howItWorks": *[ _type == "howItWorksHomepage" && language == $language][0],
    "whyChoose": *[ _type == "whyChooseHomepage" && language == $language][0],
    "blog": *[ _type == "blogHomepage" && language == $language][0],
    "posts": *[ _type == "blog"]{
      ...,
      author->
    },
    "contact": *[ _type == "contactShared" && language == $language][0],
  }
`;

// Functions
export async function getHomepage(
  queryParams: any,
  isEnabled: boolean,
): Promise<QueryResponseInitial<HomepageQueryType>> {
  return await loadQuery<HomepageQueryType>(HOMEPAGE_QUERY, queryParams, {
    perspective: isEnabled ? 'previewDrafts' : 'published',
    next: {
      tags: [
        'heroHomepage',
        'aboutHomepage',
        'bannerShared',
        'howItWorksHomepage',
        'whyChooseHomepage',
        'blogHomepage',
        'blog',
        'contactShared',
      ],
    },
  });
}
