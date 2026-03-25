import { SanityDocument, SanityImage } from '../default';

export type AuthorType = {
  name: string;
  image: SanityImage;
  slug: {
    current: string;
  };
} & SanityDocument;

export type PostType = {
  title: string;
  body: string;
  mainImage: SanityImage;
  author: AuthorType;
  publishedAt: string;
  slug: {
    current: string;
  };
} & SanityDocument;
