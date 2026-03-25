'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Anchor } from '@/sanity/queries/default';
import { slideLeft, slideRight } from '@/utils/animations';
import { motion } from 'framer-motion';

import { PortableText } from '@/components/core/utils';

import { Button } from '../../ui/button';

interface Props {
  heading: string;
  button: Anchor;
  posts: Array<{
    id: number;
    title: string;
    imageUrl: string;
    link: string;
  }>;
}

export function BlogSection({ heading, button, posts }: Readonly<Props>) {
  return (
    <section id="blog" className="mb-5  ">
      <PortableText components={components} value={heading} />
      <div className="mx-auto w-screen max-w-screen-2xl overflow-x-auto px-10 2xl:px-0">
        <div className="flex gap-4 overflow-x-auto py-4">
          {posts.map((post) => (
            <motion.div
              className=" "
              variants={post.id < 2 ? slideLeft : slideRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              key={post.id}
            >
              <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer">
                <PostCard key={post.id} post={post} />
              </a>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-row justify-center">
          <Link href={button.url} target={button.isExternal ? '_blank' : ''}>
            <Button disabled={button.isDisabled}>{button.label}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PostCard({
  post,
}: Readonly<{
  post: {
    id: number;
    title: string;
    imageUrl: string;
    link: string;
  };
}>) {
  return (
    <div className="z-90 flex cursor-pointer flex-col overflow-x-auto rounded-lg border bg-white p-5 shadow-sm hover:bg-gray-200">
      <div className="w-full">
        <img src={post.imageUrl} alt={post.title} className="h-80 max-w-md  object-cover " />
      </div>
      <div className=" py-2">
        <h3 className="text-md h-20  w-full max-w-md font-semibold">{post.title}</h3>
      </div>
      <div className="inline-flex">
        <img src="../assets/img/luciano.svg" />
        <div className=" my-auto flex px-3 text-slate-600">
          <h1>Professor Dr. Luciano Sathler</h1>
        </div>
      </div>
    </div>
  );
}

export default BlogSection;

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
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="mb-5 mt-10 text-center text-3xl font-semibold md:mt-16 md:text-5xl">
        {children}
      </h2>
    ),
  },
};
