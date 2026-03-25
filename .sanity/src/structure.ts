import {
  AlignJustify,
  Home,
  Info,
  LayoutGrid,
  Lightbulb,
  Mail,
  MessageCircleQuestion,
  NotebookPen,
  PanelBottom,
  PanelTop,
  ScanSearch,
  Settings,
  Tags,
  ThumbsUp,
  Trophy,
  Users,
  Waypoints,
  Zap,
} from 'lucide-react';
import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure';

import preview from './preview';

export const structure: StructureResolver = (S, { getClient }) => {
  const client = getClient({ apiVersion: `2023-01-01` });

  return S.list()
    .title('Dashboard')
    .items([
      S.listItem()
        .title('Home')
        .icon(Home)
        .child(
          S.list()
            .title('Home')
            .items([
              S.listItem()
                .icon(Zap)
                .title('Hero')
                .child(
                  S.document()
                    .id('heroHomepage')
                    .schemaType('heroHomepage')
                    .views([S.view.form(), preview(S, client)]),
                ),
              S.listItem()
                .icon(Info)
                .title('About')
                .child(S.document().id('aboutHomepage').schemaType('aboutHomepage')),
              S.listItem()
                .icon(Tags)
                .title('Banner')
                .child(S.document().id('bannerHomepage').schemaType('bannerShared')),
              S.listItem()
                .icon(Lightbulb)
                .title('How It Works')
                .child(S.document().id('howItWorksHomepage').schemaType('howItWorksHomepage')),
              S.listItem()
                .icon(Trophy)
                .title('Why Choose')
                .child(S.document().id('whyChooseHomepage').schemaType('whyChooseHomepage')),
              S.listItem()
                .icon(NotebookPen)
                .title('Blog')
                .child(S.document().id('blogHomepage').schemaType('blogHomepage')),
              S.listItem()
                .icon(Mail)
                .title('Contact')
                .child(S.document().id('contactHomepage').schemaType('contactShared')),
            ]),
        ),
      S.listItem()
        .title('Contact')
        .icon(Mail)
        .child(
          S.list()
            .title('Contact')
            .items([
              S.listItem()
                .icon(Zap)
                .title('Hero')
                .child(S.document().id('heroContactpage').schemaType('heroContactpage')),
              S.listItem()
                .icon(MessageCircleQuestion)
                .title('FAQ')
                .child(S.document().id('FAQContactpage').schemaType('FAQShared')),
            ]),
        ),
      S.listItem()
        .title('Shared')
        .icon(Waypoints)
        .child(
          S.list()
            .title('Shared')
            .items([
              S.listItem().icon(Tags).title('Banner'),
              S.listItem().icon(Mail).title('Contact'),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Blog')
        .icon(NotebookPen)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .icon(NotebookPen)
                .title('Posts')
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .icon(NotebookPen)
                .title('Posts By Author')
                .child(
                  S.documentTypeList('author')
                    .title('Posts by Author')
                    .child((authorId: string) =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $authorId == author._ref')
                        .params({ authorId }),
                    ),
                ),
              S.listItem()
                .icon(NotebookPen)
                .title('Posts By Category')
                .child(
                  S.documentTypeList('category')
                    .title('Posts by Category')
                    .child((categoryId: string) =>
                      S.documentList()
                        .title('Posts')
                        .filter('_type == "post" && $categoryId == category._ref')
                        .params({ categoryId }),
                    ),
                ),
              S.divider(),
              S.listItem()
                .icon(Users)
                .title('Authors')
                .child(S.documentTypeList('author').title('Authors')),
              S.listItem()
                .icon(LayoutGrid)
                .title('Categories')
                .child(S.documentTypeList('category').title('Categories')),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(Settings)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .icon(Settings)
                .title('Settings')
                .child(S.document().id('settings').schemaType('settings')),
              S.listItem()
                .icon(ScanSearch)
                .title('SEO')
                .child(S.document().id('seo-global').schemaType('seo.global')),
              S.listItem()
                .icon(PanelTop)
                .title('Navbar')
                .child(S.document().id('navbar').schemaType('navbar')),
              S.listItem()
                .icon(PanelBottom)
                .title('Footer')
                .child(S.document().id('footer').schemaType('footer')),
              S.listItem()
                .icon(ThumbsUp)
                .title('Social')
                .child(S.document().id('social').schemaType('social')),
            ]),
        ),
    ]);
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType, getClient }) => {
  const client = getClient({ apiVersion: `2023-01-01` });

  switch (schemaType) {
    case 'heroHomepage':
      return S.document().views([S.view.form(), preview(S, client)]);
    case 'aboutHomepage':
      return S.document().views([S.view.form(), preview(S, client)]);
    default:
      return S.document();
  }
};
