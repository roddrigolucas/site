'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { baseConfig } from '@/sanity/lib/client';
import { Anchor, SanityObject } from '@/sanity/queries/default';
import { FuncionalityType } from '@/sanity/queries/home';
import { slideUp } from '@/utils/animations';
import urlBuilder from '@sanity/image-url';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { PortableText } from '@/components/core/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Props {
  heading: string;
  description: string;
  button: Anchor;
  funcionalities: Array<FuncionalityType & SanityObject>;
}

export function HowItWorksSection({
  heading,
  description,
  button,
  funcionalities,
}: Readonly<Props>) {
  return (
    <motion.section
      className="w-full bg-white py-12"
      variants={slideUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="container flex flex-col gap-8 md:gap-16">
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8"
          variants={slideUp}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <PortableText value={heading} components={components} />
            <PortableText value={description} components={components} />
          </div>
          <Link href={button.url} target={button.isExternal ? '_blank' : ''}>
            <Button size="lg" className="group md:w-fit" disabled={button.isDisabled}>
              {button.label}
              <ArrowRight className="ease ml-2 transition-transform duration-500 group-hover:translate-x-2" />
            </Button>
          </Link>
        </motion.div>
        <Tabs defaultValue={funcionalities[0].slug.current} className="flex flex-col gap-4">
          <TabsList className="w-full overflow-x-scroll lg:overflow-hidden">
            {funcionalities.map((funcionality) => (
              <TabsTrigger
                key={funcionality._key}
                value={funcionality.slug.current}
                className="w-full min-w-48"
              >
                {funcionality.title}
                <p className="text-sm font-normal text-slate-500 md:text-base">
                  {funcionality.description}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>
          {funcionalities.map((funcionality) => (
            <TabsContent key={funcionality._key} value={funcionality.slug.current}>
              <motion.div
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
                variants={slideUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {funcionality.funcionalities.map((item) => (
                  <motion.div
                    key={item._key}
                    className="inline-flex flex-col gap-4 rounded-lg border border-orange-200 bg-orange-50 px-6 py-9 transition-colors hover:bg-orange-50/45"
                    variants={slideUp}
                  >
                    <Image
                      src={urlBuilder(baseConfig).image(item.icon).width(24).auto('format').url()}
                      width={24}
                      height={24}
                      alt="Icon"
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
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
      <p className="text-sm leading-loose text-slate-500 md:text-base">{children}</p>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-2xl font-bold text-slate-900 md:text-5xl">{children}</h2>
    ),
  },
};
