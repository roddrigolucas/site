import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { draftMode } from 'next/headers';

import '../../styles/globals.css';

import { i18n } from '@/i18n/languages';
import { baseConfig } from '@/sanity/lib/client';
import { getSeo, getSettings } from '@/sanity/queries/default/default.queries';
import urlBuilder from '@sanity/image-url';

import { env } from '@/env.mjs';
import { COMMON_PARAMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/components/core/layouts/home/Index';
import VisualEditing from '@/components/core/utils/VisualEditing';

const inter = Inter({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

interface Props {
  children: React.ReactNode;
  params: {
    language: string;
  };
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
    metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),

    robots: {
      follow: false,
      index: false,
    },
    formatDetection: {
      telephone: true,
      date: true,
      address: true,
      email: true,
      url: true,
    },

    openGraph: {
      locale: params.language,
      url: seo.data.canonical,
      title: 'Homologacao',
      description: 'Homologacao env',
      type: 'website',
      images: [openGraphImage ?? `/opengraph-image.jpg`],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({ params, children }: Readonly<Props>) {
  const queryParams = { ...COMMON_PARAMS, language: params.language };
  const { isEnabled } = draftMode();
  const settings = await getSettings(queryParams, isEnabled);

  return (
    <html lang={params.language}>
      <body className={cn(inter.className, 'overflow-x-hidden')}>
        <MainLayout
          language={params.language}
          navbar={settings.data.navbar}
          footer={settings.data.footer}
          social={settings.data.social}
        >
          {children}
        </MainLayout>
        {draftMode().isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
