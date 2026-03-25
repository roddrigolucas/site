'use client';

import { ReactNode, useRef } from 'react';
import Image from 'next/image';
import { baseConfig } from '@/sanity/lib/client';
import { BenefitType, RatingType } from '@/sanity/queries/home';
import { slideUp } from '@/utils/animations';
import urlBuilder from '@sanity/image-url';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';

import MagneticFramer from '@/components/core/animated/Framer';
import { PortableText } from '@/components/core/utils/PortableText';

interface Props {
  heading: string;
  description: string;
  benefits: Array<BenefitType>;
  ratings: Array<RatingType>;
}

export function AboutSection({ heading, benefits, description, ratings }: Readonly<Props>) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end start', 'start start'],
  });

  const y = useTransform(scrollYProgress, [1, 0], ['-20%', '30%']);

  const renderStars = (score: number) => {
    const RoundedScore = Math.floor(score);

    return (
      <>
        {[...Array(RoundedScore)].map((_, index) => (
          <Star key={index} className="size-4 fill-amber-400 text-amber-400 md:size-6" />
        ))}
        <StarHalf className="size-4 fill-amber-400 text-amber-400 md:size-6" />
      </>
    );
  };

  return (
    <section
      ref={container}
      id="about"
      className="relative w-full items-center border-y-[1px] border-orange-900/5 bg-white/60 bg-gradient-to-b from-[#fffdfa]  via-slate-50 to-[#fff9f7] py-16"
    >
      <motion.div
        className="container flex w-full flex-col items-center "
        variants={slideUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          className="flex max-w-3xl flex-col gap-2 md:gap-6 md:text-center"
          variants={slideUp}
        >
          <PortableText components={components} value={heading} />
          <PortableText components={components} value={description} />
        </motion.div>

        <motion.div
          className="inline-flex w-full justify-start gap-8 pb-16 pt-8 md:justify-center md:gap-16"
          variants={slideUp}
        >
          {ratings.map((rating) => (
            <motion.div
              key={rating._key}
              className="flex flex-col gap-2 md:text-center"
              variants={slideUp}
            >
              <div className="inline-flex items-center space-x-1">{renderStars(rating.score)}</div>
              <span>
                <span className="font-bold">{rating.score}</span> / 5 Rating
              </span>
              <span className="text-sm font-semibold text-slate-400 md:text-base">
                {rating.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:py-12"
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit._key}
              className="inline-flex w-full items-start gap-3 md:gap-6"
              variants={slideUp}
            >
              <motion.div
                style={{
                  translateY: y,
                  transition: 'all linear 1s',
                }}
              >
                <MagneticFramer>
                  <Image
                    className="size-12 min-w-16 md:size-16"
                    src={urlBuilder(baseConfig).image(benefit.icon).width(280).auto('format').url()}
                    alt="Modal video thumbnail"
                    loading="lazy"
                    width={64}
                    height={64}
                  />
                </MagneticFramer>
              </motion.div>
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-bold md:text-2xl">{benefit.title}</h4>
                <p className="text-sm leading-6 text-slate-500 md:text-base md:leading-9">
                  {benefit.description[0].children[0].text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
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
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-2xl font-bold text-slate-900 md:text-5xl md:leading-9">{children}</h3>
    ),
  },
};
