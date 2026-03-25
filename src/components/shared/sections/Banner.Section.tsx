'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { baseConfig } from '@/sanity/lib/client';
import { Anchor, SanityImage } from '@/sanity/queries/default';
import urlBuilder from '@sanity/image-url';
import { ArrowRight } from 'lucide-react';

import { PortableText } from '@/components/core/utils/PortableText';

import { Button } from '../../ui/button';

interface Props {
  heading: string;
  button: Anchor;
  image: SanityImage;
}

export function BannerSection({ heading, button, image }: Readonly<Props>) {
  const imageUrl = urlBuilder(baseConfig).image(image).width(800).auto('format').url();

  return (
    <section className="inline-flex w-full items-center justify-center bg-white md:py-16">
      <div className="relative flex w-full flex-col items-center overflow-hidden border-indigo-900/10 py-16 md:max-w-screen-md  md:rounded-3xl md:border-4 lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl ">
        <div
          className="absolute left-0 top-0 size-full bg-cover bg-center"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-[rgba(19,27,53,0.64)] via-[rgba(16,25,51,0.8)] to-[rgba(19,22,58,0.82)]" />
        <div className="container z-20 my-auto flex flex-col items-center justify-center gap-8 text-center">
          <PortableText components={components} value={heading} />
          <Link href={button.url} target={button.isExternal ? '_blank' : ''}>
            <Button size="lg" className="group md:w-fit" disabled={button.isDisabled}>
              {button.label}
              <ArrowRight className="ease ml-2 transition-transform duration-500 group-hover:translate-x-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

const components = {
  marks: {
    strong: ({ children }: { children: ReactNode }) => (
      <strong className="text-2xl font-bold text-white md:text-4xl">{children}</strong>
    ),
  },
  block: {
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-2xl font-medium text-white md:text-4xl">{children}</h3>
    ),
  },
};
