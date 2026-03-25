'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { baseConfig } from '@/sanity/lib/client';
import { Anchor, SanityImage } from '@/sanity/queries/default';
import { CompanyType } from '@/sanity/queries/home';
import { slideLeft, slideRight, slideUp } from '@/utils/animations';
import HiAsset from '@assets/img/hi.gif';
import LineAsset from '@assets/img/line.svg';
import urlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion';

import { PortableText } from '@/components/core/utils/PortableText';
import { Dialog, DialogContent, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import { Button } from '../../ui/button';

interface Props {
  overline: string;
  heading: string;
  description: string;
  video: {
    thumbnail: SanityImage;
    url: string;
  };
  input: {
    placeholder: string;
    errorMessage: string;
  };
  button: Anchor;
  companies: {
    title: string;
    companies: Array<CompanyType>;
  };
}

export function HeroSection({
  overline,
  heading,
  description,
  input,
  button,
  video,
  companies,
}: Readonly<Props>) {
  const allCompanies = new Array(5).fill(companies.companies).flat();

  return (
    <motion.section className="relative mx-auto flex w-full flex-col justify-center gap-24 bg-gradient-to-b from-[#FFD1BA] via-[#FFE5D8] to-[#fffaf7] py-12 lg:pt-24">
      <div className="flex flex-col gap-24 p-0">
        <div className="container inline-flex items-center gap-16">
          <motion.div
            className="flex flex-col gap-12 text-left"
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="flex w-full max-w-5xl flex-col gap-4 md:gap-6 md:text-left">
              <div className="inline-flex items-center justify-start gap-2">
                <Image src={HiAsset} width={24} height={8} alt="Hi Emoji" />
                <span className="text-sm font-medium uppercase tracking-widest text-orange-950/60 md:text-base">
                  {overline}
                </span>
              </div>
              <PortableText components={components} value={heading} />
              <Image src={LineAsset} alt="orange line" />
              <PortableText components={components} value={description} />
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <Input placeholder={input.placeholder} />
              <Link href={button.url} target={button.isExternal ? '_blank' : ''}>
                <Button disabled={button.isDisabled}>{button.label}</Button>
              </Link>
            </div>
          </motion.div>
          <Dialog>
            <DialogTrigger asChild>
              <motion.button
                className="group relative hidden items-center justify-center rounded-3xl focus:outline-none focus-visible:ring focus-visible:ring-indigo-300 lg:flex"
                aria-label="Watch the video"
                variants={slideRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Image
                  className="rounded-3xl shadow-2xl transition-shadow duration-300 ease-in-out"
                  src={urlBuilder(baseConfig)
                    .image(video.thumbnail)
                    .width(800)
                    .auto('format')
                    .url()}
                  alt={video.thumbnail.alt || 'Modal video thumbnail'}
                  loading="lazy"
                  width={600}
                  height={200}
                />
                <svg
                  className="pointer-events-none absolute transition-transform duration-300 ease-in-out group-hover:scale-110"
                  xmlns="<http://www.w3.org/2000/svg>"
                  width="72"
                  height="72"
                >
                  <circle className="fill-white" cx="36" cy="36" r="36" fillOpacity=".6" />
                  <path
                    className="size-8 fill-indigo-800 drop-shadow-2xl"
                    d="M44 36a.999.999 0 0 0-.427-.82l-10-7A1 1 0 0 0 32 29V43a.999.999 0 0 0 1.573.82l10-7A.995.995 0 0 0 44 36V36c0 .001 0 .001 0 0Z"
                  />
                </svg>
              </motion.button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl border-0 bg-transparent p-0">
              <DialogDescription className="aspect-video max-h-full w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
                <video autoPlay controls>
                  <source src={video.url} width="100%" height="100%" type="video/mp4" />
                </video>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
        <motion.div
          className="flex flex-col gap-6 text-center md:gap-12 md:py-12"
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2 className="container text-xl font-bold text-slate-900 md:text-4xl">
            {companies.title}
          </h2>
          <div className="overflow-x-hidden">
            <div className="relative inline-flex gap-6 py-6 md:gap-12">
              <div className="inline-flex gap-6 overflow-hidden whitespace-nowrap md:gap-12">
                <div
                  className="animate-scroll flex gap-6 md:gap-12"
                  style={{
                    animation: 'scroll 20s linear infinite',
                    width: '200%',
                  }}
                >
                  {allCompanies.map((company, index) => (
                    <motion.div
                      key={company._key + index}
                      className="relative h-12 w-36 md:h-12 md:w-36"
                      variants={slideUp}
                    >
                      <Image
                        src={urlBuilder(baseConfig)
                          .image(company.image)
                          .width(192)
                          .auto('format')
                          .url()}
                        alt={company.name || ' '}
                        loading="lazy"
                        fill
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
      <h1 className="text-2xl font-semibold text-orange-950 md:text-5xl md:leading-[64px]">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
  },
};
