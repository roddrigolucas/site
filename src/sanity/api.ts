import { env } from '@/env.mjs';

export const useCdn = false;
export const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const token = '';

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-06-21';

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
export const previewSecretId: `${string}.${string}` = 'preview.secret';
