import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

import { i18n } from './i18n/languages';
import { env } from '@/env.mjs';

const supportedLanguages = i18n.languages.map((l) => l.id);
const redirectRoutes = [
  'authentication/sign-up',
  'authentication/sign-in',
  'certificates/create',
  'account/plans',
  'account/cards',
  'certificates/view',
  'account/profile',
];

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = { 'accept-language': 'pt-BR,en,es;q=0.5' };
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages() ?? [];

  // @ts-ignore locales are readonly
  const locales: string[] = supportedLanguages;

  return matchLocale(languages, locales, i18n.base);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      // Your other files in `public`
    ].includes(pathname)
  )
    return;

  const foundItem = redirectRoutes.find((item) => pathname.includes(item)) || false;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = supportedLanguages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (foundItem) {
    const currentUrl = new URL(request.nextUrl.origin);

    if (env.NEXT_PUBLIC_PLATFORM_URL) {
      if (pathnameIsMissingLocale) {
        return NextResponse.redirect(new URL(env.NEXT_PUBLIC_PLATFORM_URL + pathname));
      } else {
        return NextResponse.redirect(new URL(env.NEXT_PUBLIC_PLATFORM_URL + '/' + foundItem));
      }
    }

    if (pathnameIsMissingLocale) {
      var redirectUrl = new URL(currentUrl + pathname);
    } else {
      var redirectUrl = new URL(currentUrl + foundItem);
    }

    redirectUrl.hostname = `app.${redirectUrl.hostname}`;

    return NextResponse.redirect(redirectUrl);
  }

  const knownPaths = ['/', '/contact/'];
  if (!knownPaths.includes(pathname) && pathnameIsMissingLocale) {
    const currentUrl = new URL(request.nextUrl.origin);

    return NextResponse.redirect(currentUrl);
  }

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
