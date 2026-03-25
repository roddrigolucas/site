import { Fragment } from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { baseConfig } from '@/sanity/lib/client';
import { CONTACTPAGE_QUERY, getContactPage } from '@/sanity/queries/contact';
import { getSeo } from '@/sanity/queries/default/default.queries';
import urlBuilder from '@sanity/image-url';

import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS } from '@/lib/constants';
import { LiveQueryWrapper } from '@/components/core/utils';
import { HeroSection } from '@/components/pages/contact';
import { FAQSection } from '@/components/shared/sections';

interface Props {
  params: { language: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const queryParams = { ...COMMON_PARAMS, language: params.language };
  const seo = await getSeo(queryParams, false);
  const openGraphImage = urlBuilder(baseConfig)
    .image(seo.data.seo.image)
    .width(1608)
    .auto('format')
    .url();

  return {
    robots: {
      follow: false,
      index: false,
    },
    openGraph: {
      locale: params.language,
      url: seo.data.canonical,
      title: 'HOMOLOGACAO',
      description: 'HOMOLOGACAO',
      type: 'website',
      images: [openGraphImage ?? `/opengraph-image.jpg`],
    },
  };
}

export default async function FAQ({ params }: Readonly<Props>) {
  const { language } = params;
  const queryParams = { ...COMMON_PARAMS, language };
  const { isEnabled } = draftMode();
  const contactInitial = await getContactPage(queryParams, isEnabled);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? CONTACTPAGE_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={contactInitial}
      >
        <Fragment>
          <HeroSection
            heading={contactInitial.data.hero.heading}
            description={contactInitial.data.hero.description}
            image={contactInitial.data.hero.image}
            button={contactInitial.data.hero.button}
          />
          <FAQSection faq={contactInitial.data.faq} />
        </Fragment>
      </LiveQueryWrapper>
    </main>
  );
}
