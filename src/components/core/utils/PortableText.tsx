import { ReactNode } from 'react';
import { baseConfig } from '@/sanity/lib/client';
import { PortableText as PortableTextComponent } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

const SanityImage = ({ value }: any) => {
  if (!value.asset) {
    return null;
  }

  const { width, height } = getImageDimensions(value);

  return (
    <img
      src={urlBuilder(baseConfig).image(value).width(800).auto('format').url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{ aspectRatio: width / height }}
    />
  );
};

const components = {
  types: {
    image: SanityImage,
  },
  block: {
    normal: ({ children }: { children: ReactNode }) => <p>{children}</p>,
    h1: ({ children }: { children: ReactNode }) => <h1>{children}</h1>,
    h2: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children: ReactNode }) => <h3>{children}</h3>,
    h4: ({ children }: { children: ReactNode }) => <h4>{children}</h4>,
    h5: ({ children }: { children: ReactNode }) => <h5>{children}</h5>,
  },
};

// Set up Portable Text serialization
export const PortableText = (props: any) => (
  <PortableTextComponent components={components} {...props} />
);
