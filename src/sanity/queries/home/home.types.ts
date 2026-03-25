import { Anchor, SanityDocument, SanityImage, SanityObject } from '../default';

export type HeroHomepageType = {
  overline: string;
  heading: string;
  description: string;
  video: {
    url: string;
    thumbnail: SanityImage;
  };
  input: {
    placeholder: string;
    errorMessage: string;
  };
  companies: {
    title: string;
    companies: Array<CompanyType>;
  };
  button: Anchor;
  toast: {
    success: {
      title: string;
      description: string;
    };
    error: {
      title: string;
      description: string;
    };
  };
} & SanityDocument;

export type CompanyType = {
  name: string;
  image: SanityImage;
} & SanityObject;

export type BenefitType = {
  title: string;
  description: Array<any>;
  icon: SanityImage;
} & SanityObject;

export type RatingType = {
  score: number;
  name: string;
} & SanityObject;

export type AboutHomepageType = {
  heading: string;
  description: string;
  benefits: Array<BenefitType>;
  ratings: Array<RatingType>;
} & SanityDocument;

export type FAQType = {
  title: string;
  description: string;
} & SanityObject;

export type FAQSharedType = {
  heading: string;
  headingPage: string;
  description: string;
  video: {
    url: string;
    thumbnail: SanityImage;
  };
  faq: Array<FAQType>;
} & SanityDocument;

export type BannerHomepageType = {
  heading: string;
  button: Anchor;
  image: SanityImage;
} & SanityDocument;

export type ReasonType = {
  icon: SanityImage;
  text: string;
} & SanityObject;

export type WhyChooseHomepageType = {
  heading: string;
  reasons: Array<ReasonType>;
  images: {
    image: SanityImage;
    elements: Array<SanityImage>;
  };
} & SanityDocument;

export type HowItWorksHomepageType = {
  heading: string;
  description: string;
  button: Anchor;
  funcionalities: Array<FuncionalityType>;
} & SanityDocument;

export type FuncionalityType = {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  funcionalities: Array<{ icon: SanityImage; title: string; description: string } & SanityObject>;
} & SanityObject;

export type BlogHomepageType = {
  heading: string;
  button: Anchor;
} & SanityDocument;

export type ContactHomepageType = {
  heading: string;
  description: string;
  quote: {
    text: string;
    author: string;
  };
} & SanityDocument;
