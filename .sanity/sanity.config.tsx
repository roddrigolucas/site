import { dashboardTool, projectInfoWidget, projectUsersWidget } from '@sanity/dashboard';
import { documentInternationalization } from '@sanity/document-internationalization';
import { Card } from '@sanity/ui';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { media } from 'sanity-plugin-media';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';

import ProductionIcon from './components/icons/ProductionIcon';
import StagingIcon from './components/icons/StagingIcon';
import { enableUrl, locate } from './presentation';
import {
  ContactSchemas,
  HomeSchemas,
  schemaTypes,
  SettingsSchemas,
  SharedSchemas,
} from './schemas';
import { defaultDocumentNode, structure } from './src/structure';
import { getSchemaNames } from './utils/getSchemaName';
import { supportedLanguages } from './utils/translateDocument';

const { theme } = (await import(
  // @ts-expect-error -- TODO setup themer.d.ts to get correct typings
  'https://themer.sanity.build/api/hues?preset=stereofidelic&default=darkest:020617&primary=ff790d;darkest:0f172a&transparent=darkest:394a60'
)) as { theme: import('sanity').StudioTheme };

const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';

const plugins = [
  dashboardTool({
    widgets: [projectInfoWidget(), projectUsersWidget()],
  }),
  structureTool({
    structure,
    defaultDocumentNode,
  }),
  presentationTool({
    locate,
    previewUrl: {
      draftMode: {
        enable: enableUrl,
      },
    },
  }),
  documentInternationalization({
    supportedLanguages,
    schemaTypes: [
      ...getSchemaNames(HomeSchemas),
      ...getSchemaNames(ContactSchemas),
      ...getSchemaNames(SettingsSchemas),
      ...getSchemaNames(SharedSchemas),
    ],
  }),
  media(),
  visionTool(),
];

const defaultSettings = {
  theme,
  plugins,
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      navbar: (props: any) => <Card scheme="dark">{props.renderDefault(props)}</Card>,
    },
  },
};

export default defineConfig([
  {
    projectId: 'cil3po11',
    dataset: 'production',
    name: 'production',
    basePath: '/production',
    title: 'Production',
    icon: ProductionIcon,
    ...defaultSettings,
  },
  {
    projectId: 'cil3po11',
    dataset: 'staging',
    name: 'staging',
    basePath: '/staging',
    title: 'Staging',
    icon: StagingIcon,
    ...defaultSettings,
  },
]);
