import { draftMode } from 'next/headers';
import { getHomepage, HOMEPAGE_QUERY } from '@/sanity/queries/home';

import { COMMON_PARAMS, DEFAULT_EMPTY_PARAMS, POSTS } from '@/lib/constants';
import { LiveQueryWrapper } from '@/components/core/utils';
import {
  AboutSection,
  BlogSection,
  HeroSection,
  HowItWorksSection,
  WhyChooseSection,
} from '@/components/pages/home';
import { BannerSection } from '@/components/shared/sections';

interface Props {
  params: { language: string };
}

export default async function Home({ params }: Readonly<Props>) {
  const { language } = params;
  const queryParams = { ...COMMON_PARAMS, language };
  const { isEnabled } = draftMode();
  const homeInitial = await getHomepage(queryParams, isEnabled);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LiveQueryWrapper
        isEnabled={isEnabled}
        query={isEnabled ? HOMEPAGE_QUERY : ''}
        params={isEnabled ? queryParams : DEFAULT_EMPTY_PARAMS}
        initial={homeInitial}
      >
        <>
          <HeroSection
            overline={homeInitial.data.hero.overline}
            heading={homeInitial.data.hero.heading}
            description={homeInitial.data.hero.description}
            input={homeInitial.data.hero.input}
            button={homeInitial.data.hero.button}
            video={homeInitial.data.hero.video}
            companies={homeInitial.data.hero.companies}
          />
          <AboutSection
            heading={homeInitial.data.about.heading}
            benefits={homeInitial.data.about.benefits}
            description={homeInitial.data.about.description}
            ratings={homeInitial.data.about.ratings}
          />
          <BannerSection
            heading={homeInitial.data.banner.heading}
            image={homeInitial.data.banner.image}
            button={homeInitial.data.banner.button}
          />
          <HowItWorksSection
            heading={homeInitial.data.howItWorks.heading}
            description={homeInitial.data.howItWorks.description}
            button={homeInitial.data.howItWorks.button}
            funcionalities={homeInitial.data.howItWorks.funcionalities}
          />
          <WhyChooseSection
            heading={homeInitial.data.whyChoose.heading}
            reasons={homeInitial.data.whyChoose.reasons}
            images={homeInitial.data.whyChoose.images}
          />
          <BlogSection
            heading={homeInitial.data.blog.heading}
            button={homeInitial.data.blog.button}
            posts={POSTS}
          />
        </>
      </LiveQueryWrapper>
    </main>
  );
}
