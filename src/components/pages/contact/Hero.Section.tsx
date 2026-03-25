'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { baseConfig } from '@/sanity/lib/client';
import { Anchor, SanityImage } from '@/sanity/queries/default';
import { slideLeft } from '@/utils/animations';
import urlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion';
import { MessageCircleQuestion } from 'lucide-react';

import { cn } from '@/lib/utils';
import { PortableText } from '@/components/core/utils/PortableText';

import { Button } from '../../ui/button';

interface Props {
  heading: string;
  description: string;
  image: SanityImage;
  button: Anchor;
}

export function HeroSection({ heading, description, image, button }: Readonly<Props>) {
  return (
    <motion.section className="relative flex w-full flex-col items-center justify-center gap-24 bg-gradient-to-b from-[#FFD1BA] via-[#FFE5D8] to-[#fffaf7] py-12 ">
      <div className="container flex flex-col items-center justify-center gap-24 md:flex-row">
        <motion.div
          className="flex w-full flex-col gap-6"
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-2">
            <PortableText components={components} value={heading} />
            <PortableText components={components} value={description} />
          </div>
          <Link
            href={button.url}
            target={button.isExternal ? '_blank' : '_self'}
            className={cn({ 'pointer-events-none': button.isDisabled })}
          >
            <Button className="w-full md:w-fit">
              <MessageCircleQuestion className="mr-2 size-5 text-white" />
              {button.label}
            </Button>
          </Link>
        </motion.div>
        <Image
          className="hidden h-[500px] rounded-3xl md:block"
          src={urlBuilder(baseConfig).image(image).width(400).auto('format').url()}
          alt={image.alt || 'Image'}
          loading="lazy"
          width={400}
          height={400}
        />
      </div>
    </motion.section>
  );
}

const components = {
  marks: {
    strong: ({ children }: { children: ReactNode }) => (
      <strong className="font-bold text-primary">{children}</strong>
    ),
  },
  block: {
    normal: ({ children }: { children: ReactNode }) => (
      <p className="text-sm leading-6 text-slate-600 md:text-xl md:leading-9">{children}</p>
    ),
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-2xl font-semibold text-orange-950 md:text-3xl">{children}</h1>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className=" text-3xl font-bold text-black md:py-10 md:text-4xl">{children}</h3>
    ),
  },
};
