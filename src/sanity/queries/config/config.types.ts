import { Anchor, SanityDocument, SanityImage, SanityObject } from '../default';

export type SiteConfigType = {
  seo: {
    title: string;
    description: string;
    image: SanityImage;
  };
  keywords: Array<string>;
  url: string;
  gtag: string;
  headerLogo: SanityImage;
  footerLogo: SanityImage;
  footerCopyright: string;
} & SanityDocument;

export type NavBarType = {
  logo: SanityImage;
  navigation: Array<NavigationItemType>;
  actions: {
    register: Anchor;
    cta: Anchor;
  };
} & SanityDocument;

export type FooterType = {
  logo: SanityImage;
  description: string;
  navigation: Array<FooterNavigationItemType>;
  copyright: string;
} & SanityDocument;

export type NavigationItemType = Anchor & SanityObject;

export type FooterNavigationItemType = {
  title: string;
  items: Array<{ anchor: Anchor; icon?: SanityImage } & SanityObject>;
} & SanityObject;

export type SocialType = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
} & SanityDocument;
