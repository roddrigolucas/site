'use client';

import React from 'react';
import { FAQType } from '@/sanity/queries/contact';
import { slideDown, slideUp } from '@/utils/animations';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Props {
  faq: FAQType;
}

export function FAQSection({ faq }: Readonly<Props>) {
  return (
    <section
      id="faq"
      className="w-full bg-gradient-to-t from-[#fffdfb] via-[#fffcfb] to-[#fffaf7] py-10"
    >
      <Accordion type="single" className="container flex flex-col gap-4 p-5" collapsible>
        {faq.content.map((item, index) => (
          <motion.div
            key={item._key}
            variants={index < faq.content.length / 2 ? slideDown : slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <AccordionItem
              key={item._key}
              value={item.title}
              className="rounded-xl border-[1px] border-slate-200 bg-white transition-all duration-500"
            >
              <AccordionTrigger className="leading-7 text-slate-800 transition-all duration-500 md:p-8 md:text-xl">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-normal leading-[30px] text-slate-600 md:p-8 md:pt-4 md:text-lg">
                {item.description}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </section>
  );
}
