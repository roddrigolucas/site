export type SocialMediaItem = {
  _key: string;
  media: SocialMediaType;
  media_url: string;
} & SanityObject;

export type SocialMediaType =
  | 'Facebook'
  | 'Instagram'
  | 'Linkedin'
  | 'Tiktok'
  | 'Twitter'
  | 'Twitch'
  | 'Youtube';

export type SanityImage = {
  _id: string;
  _type: 'image';
  alt: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

export type SanityFile = {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

export type SanityBlockContent = {
  _type: 'block';
  children: Array<{
    _key: string;
    _type: string;
    marks: Array<string>;
    text: string;
  }>;
  style: string;
};

export type SanityDocument = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
};

export type SanityObject = {
  _key: string;
  _createdAt: string;
  _updatedAt: string;
};

export type Block = { children: Array<{ text: string }> };

export type Anchor = {
  url: string;
  isExternal: boolean;
  isDisabled: boolean;
  label: string;
};

export type SEO = {
  title: string;
  description: string;
  image: SanityImage;
};

export type SEOGlobal = {
  seo: {
    title: string;
    description: string;
    image: SanityImage;
  };
  keywords: string[];
  canonical: string;
};

export type ColorWithAlpha = {
  alpha: number;
  hex: string;
  hsl: {
    a: number;
    h: number;
    s: number;
    l: number;
  };
  hsv: {
    a: number;
    h: number;
    s: number;
    v: number;
  };
  rgb: {
    a: number;
    r: number;
    g: number;
    b: number;
  };
};

export type Color = {
  hex: string;
  hsl: {
    h: number;
    s: number;
    l: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
  };
  rgb: {
    r: number;
    g: number;
    b: number;
  };
};

export type ColorTheme = {
  title: string;
  text: ColorWithAlpha;
  background: ColorWithAlpha;
};
