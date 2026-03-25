import { SanityDocument } from 'next-sanity';

import { Anchor, SanityImage, SanityObject } from '../default';

export type HeroContactpageType = {
  heading: string;
  description: string;
  image: SanityImage;
  button: Anchor;
} & SanityDocument;

export type FAQType = {
  content: Array<FAQItemType>;
} & SanityDocument;

type FAQItemType = {
  title: string;
  description: string;
} & SanityObject;
