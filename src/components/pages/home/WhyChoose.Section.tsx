'use client';

import { ReactNode, useRef } from 'react';
import Image from 'next/image';
import { baseConfig } from '@/sanity/lib/client';
import { SanityImage } from '@/sanity/queries/default';
import { ReasonType } from '@/sanity/queries/home';
import { slideLeft, slideUp } from '@/utils/animations';
import urlBuilder from '@sanity/image-url';
import { motion, useScroll, useTransform } from 'framer-motion';

import { cn } from '@/lib/utils';
import MagneticFramer from '@/components/core/animated/Framer';
import { PortableText } from '@/components/core/utils/PortableText';

interface Props {
  heading: string;
  reasons: Array<ReasonType>;
  images: {
    image: SanityImage;
    elements: Array<SanityImage>;
  };
}

export function WhyChooseSection({ heading, reasons, images }: Readonly<Props>) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end start', 'start start'],
  });

  const y = useTransform(scrollYProgress, [1, 0], ['0%', '-100%']);

  return (
    <section
      ref={container}
      className="w-full border-y-[1px] border-orange-900/5 bg-slate-50/50 py-24"
    >
      <div className="container flex flex-col items-end gap-8 sm:gap-28 md:flex-row">
        <motion.div
          className="flex flex-col gap-12"
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <PortableText components={components} value={heading} />
          <div className="flex flex-col">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason._key}
                className={cn('inline-flex gap-4 md:gap-6 items-center py-8', {
                  'border-b-[1px] border-slate-200': index !== reasons.length - 1,
                })}
                variants={slideLeft}
              >
                <Image
                  className="size-6 md:size-8"
                  src={urlBuilder(baseConfig).image(reason.icon).width(48).auto('format').url()}
                  alt="Icone"
                  loading="lazy"
                  width={32}
                  height={32}
                />
                <p className="text-sm font-medium text-slate-600 md:text-base">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="container relative mt-12 flex size-full min-h-[400px] items-center p-12 md:h-full"
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Main Image */}
          <div className="absolute bottom-0 right-0 w-fit sm:right-[15%] md:bottom-[15%]">
            <Image
              className="max-h-full max-w-full rounded-lg md:max-h-[530px] md:max-w-[350px] lg:max-h-[530px] lg:max-w-[420px]"
              src={urlBuilder(baseConfig).image(images.image).width(600).auto('format').url()}
              alt="Notebook com lente de camera ao lado"
              loading="lazy"
              width={420}
              height={530}
            />
            {/* Elements */}
            <motion.div
              className="absolute left-[-24px] top-10 z-[1] w-60 sm:left-[-48px] sm:top-14 sm:w-80"
              style={{
                translateY: y,
                transition: 'all linear 1s',
              }}
            >
              <MagneticFramer>
                <Image
                  src={urlBuilder(baseConfig)
                    .image(images.elements[0])
                    .width(450)
                    .auto('format')
                    .url()}
                  alt="Elemento 1"
                  loading="lazy"
                  width={300}
                  height={48}
                />
              </MagneticFramer>
            </motion.div>
            <motion.div
              className="absolute right-[-24px] top-32 z-[1] sm:right-[-70px] sm:top-24"
              style={{
                translateY: y,
                transition: 'all linear 1s',
              }}
            >
              <MagneticFramer>
                <Image
                  src={urlBuilder(baseConfig)
                    .image(images.elements[1])
                    .width(160)
                    .auto('format')
                    .url()}
                  alt="Elemento 2"
                  loading="lazy"
                  width={148}
                  height={64}
                />
              </MagneticFramer>
            </motion.div>
            <motion.div
              className="absolute left-[-20px] top-[50%] z-[1] size-10  sm:left-[-24px] sm:size-12"
              style={{
                translateY: y,
                transition: 'all linear 1s',
              }}
            >
              <MagneticFramer>
                <Image
                  src={urlBuilder(baseConfig)
                    .image(images.elements[2])
                    .width(60)
                    .auto('format')
                    .url()}
                  alt="Elemento 3"
                  loading="lazy"
                  width={48}
                  height={48}
                />
              </MagneticFramer>
            </motion.div>
            <motion.div
              className="absolute bottom-[-40px] z-[1] sm:left-[-64px]"
              style={{
                translateY: y,
                transition: 'all linear 1s',
              }}
            >
              <MagneticFramer>
                <Image
                  src={urlBuilder(baseConfig)
                    .image(images.elements[3])
                    .width(260)
                    .auto('format')
                    .url()}
                  alt="Elemento 4"
                  loading="lazy"
                  width={256}
                  height={60}
                />
              </MagneticFramer>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const components = {
  marks: {
    strong: ({ children }: { children: ReactNode }) => (
      <strong className="font-bold text-emerald-500">{children}</strong>
    ),
  },
  block: {
    normal: ({ children }: { children: ReactNode }) => (
      <p className="text-sm leading-6  text-slate-600 md:text-lg">{children}</p>
    ),
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-2xl font-bold text-orange-950 md:text-5xl md:leading-[60px]">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-3xl font-bold text-slate-900 md:text-5xl md:leading-[64px]">
        {children}
      </h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4 className="text-2xl font-bold text-primary md:text-5xl md:leading-[60px]">{children}</h4>
    ),
  },
};
