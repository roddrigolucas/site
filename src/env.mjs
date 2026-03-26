import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * @t3-oss/env-nextjs will validate your environment variables
 * @see https://env.t3.gg/docs/nextjs
 */

const isSkip = !!process.env.SKIP_ENV_VALIDATION || process.env.NODE_ENV === 'production';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    SANITY_API_TOKEN: isSkip ? z.string().optional() : z.string().min(1),
    SANITY_PREVIEW_SECRET: isSkip ? z.string().optional() : z.string().min(1),
    SANITY_WEBHOOK_SECRET: isSkip ? z.string().optional() : z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: isSkip ? z.string().optional() : z.string().min(1),
    NEXT_PUBLIC_PLATFORM_URL: z.string().optional(),
    NEXT_PUBLIC_SANITY_DATASET: isSkip ? z.string().optional() : z.string().min(1),
    NEXT_PUBLIC_SANITY_PROJECT_ID: isSkip ? z.string().optional() : z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://31.97.91.29',
    NEXT_PUBLIC_PLATFORM_URL: process.env.NEXT_PUBLIC_PLATFORM_URL ?? 'http://31.97.91.29:3000',
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    SANITY_WEBHOOK_SECRET: process.env.SANITY_WEBHOOK_SECRET,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'staging',
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'cil3po11',
  },

  skipValidation: isSkip,
});
