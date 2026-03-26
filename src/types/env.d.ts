declare module '@/env.mjs' {
  export const env: {
    NODE_ENV: 'development' | 'test' | 'production';
    SANITY_API_TOKEN: string;
    SANITY_PREVIEW_SECRET: string;
    SANITY_WEBHOOK_SECRET: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_PLATFORM_URL?: string;
    NEXT_PUBLIC_SANITY_DATASET: string;
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
  };
}
