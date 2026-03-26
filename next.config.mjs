import bundleAnalyzer from '@next/bundle-analyzer';

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
if (!process.env.SKIP_ENV_VALIDATION && !process.env.NEXT_PHASE?.includes('phase-production-build')) {
  await import('./src/env.mjs');
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'commondatastorage.googleapis.com',
        pathname: '**',
      },
    ],
  },
  webpack: (config) => {
    let modularizeImports = null;
    config.module.rules.some((rule) =>
      rule.oneOf?.some((oneOf) => {
        modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports;

        return modularizeImports;
      }),
    );
    if (modularizeImports?.['@headlessui/react']) delete modularizeImports['@headlessui/react'];

    return config;
  },
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig);
