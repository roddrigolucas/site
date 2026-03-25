'use client';

import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/i18n/languages';
import { baseConfig } from '@/sanity/lib/client';
import { NavigationItemType } from '@/sanity/queries/config';
import { Anchor, SanityImage } from '@/sanity/queries/default';
import BrazilFlagAsset from '@assets/img/flags/brazil.svg';
import EuaFlagAsset from '@assets/img/flags/eua.svg';
import SpanFlagAsset from '@assets/img/flags/span.svg';
import urlBuilder from '@sanity/image-url';
import { CheckIcon, ChevronDownIcon, GlobeIcon, Menu, UserIcon, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';

interface Props {
  logo: SanityImage;
  navigation: Array<NavigationItemType>;
  actions: {
    cta: Anchor;
    register: Anchor;
  };
  language: string;
}
const languages = [
  { label: 'Português', value: 'pt-BR', flag: BrazilFlagAsset },
  { label: 'English', value: 'en', flag: EuaFlagAsset },
  { label: 'Español', value: 'es', flag: SpanFlagAsset },
] as const;

export function NavBar({ logo, navigation, actions, language }: Readonly<Props>) {
  const [sizeNavbar, setSizeNavbar] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [debounceScroll, setDebounceScroll] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';

    setSizeNavbar(currentScrollY >= 100);

    if (debounceScroll) window.clearTimeout(debounceScroll);

    const timeoutId = window.setTimeout(() => {
      if (direction === 'down' && currentScrollY > 700) {
        setHideNavbar(true);
      } else if (direction === 'up') {
        setHideNavbar(false);
      }
      setLastScrollY(currentScrollY);
    }, 150);

    setDebounceScroll(timeoutId);
  }, [lastScrollY, debounceScroll]);

  useLayoutEffect(() => {
    const throttledHandleScroll = () => {
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [handleScroll]);

  return (
    <Fragment>
      <div className="lg:hidden">
        <LanguageBar language={language} />
      </div>
      <header
        className={cn(
          'sticky top-0 z-50 px-0 bg-white/0 w-full items-center bg-[#FFD1BA] justify-center rounded-none border-0 border-orange-900/5 inline-flex gap-4 h-20 ',
          'transition-all duration-1000 ease',
          {
            'bg-white/90 backdrop-blur-[6px] lg:px-4 border-b-[1px] border-slate-100': sizeNavbar,
            '-translate-y-full ease-out': hideNavbar,
          },
        )}
      >
        <div className="container inline-flex w-full items-center justify-between gap-12 px-3 md:px-6">
          <Link href="/" passHref>
            <Image
              className="ease h-8 w-36 transition-all duration-1000 md:h-12 md:w-40"
              src={urlBuilder(baseConfig).image(logo).width(128).auto('format').url()}
              alt={logo.alt}
              width={156}
              height={40}
            />
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item._key}>
                  <Link href={item.url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'hover:bg-orange-500/5 hover:text-primary',
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:inline-flex">
            <Link href={actions.register.url} passHref>
              <Button disabled={actions.register.isDisabled} variant="ghostSecondary">
                <UserIcon className="mr-2 size-4" />
                {actions.register.label}
              </Button>
            </Link>
            <Link href={actions.cta.url} passHref>
              <Button
                disabled={actions.cta.isDisabled}
                variant="secondary"
                className="group relative"
              >
                <span className="absolute right-[-5px] top-[-5px] flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-indigo-300 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-indigo-300"></span>
                </span>
                {actions.cta.label}
              </Button>
            </Link>
            <LanguageBar language={language} />
          </div>
          <div className="inline-flex items-center gap-4 lg:hidden">
            <div className="inline-flex gap-2">
              <Link href={actions.register.url} passHref>
                <Button disabled={actions.register.isDisabled} size="sm" variant="default">
                  <UserIcon className="mr-2 size-5" />
                  {actions.register.label}
                </Button>
              </Link>
            </div>
            <MobileSheet logo={logo} navigation={navigation} actions={actions} />
          </div>
        </div>
      </header>
    </Fragment>
  );
}

const LanguageBar = ({ language }: { language: string }) => {
  const router = useRouter();

  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;

    return segments.join('/');
  };

  return (
    <div
      className={cn(
        'inline-flex w-full justify-center items-center border-b-[0px] border-orange-900/5  bg-[#FFD1BA] lg:bg-transparent h-11',
        'transition-transform duration-1000 ease',
      )}
    >
      <div className="container inline-flex w-full justify-end px-2 py-1 md:px-5 lg:px-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              size="sm"
              aria-label={
                language
                  ? languages.find((lang) => lang.value === language)?.label
                  : 'Nenhuma linguagem encontrada.'
              }
              className={cn(
                'w-fit justify-end',
                'hover:text-orange-600 hover:bg-transparent transition-all ease',
                !language && 'text-muted-foreground',
              )}
            >
              {language ? (
                <Image
                  src={languages.find((lang) => lang.value === language)?.flag}
                  alt="Idioma"
                  className="flex min-w-5 flex-col items-center justify-center"
                />
              ) : (
                <GlobeIcon className="mr-2 size-5 shrink-0 opacity-50" />
              )}

              <ChevronDownIcon className="ml-2  size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] justify-between p-0">
            <Command>
              <CommandEmpty>Nenhuma linguagem encontrada.</CommandEmpty>
              <CommandGroup>
                {languages.map((lang) => (
                  <CommandItem
                    className="inline-flex w-full cursor-pointer justify-between"
                    value={lang.label}
                    key={lang.value}
                    onSelect={() => {
                      router.push(redirectedPathName(lang.value));
                    }}
                  >
                    <div
                      className={cn(
                        'inline-flex items-center gap-2',
                        lang.value === language ? 'text-slate-700' : 'text-slate-500',
                      )}
                    >
                      <Image src={lang.flag} alt={lang.label} className="h-4 " />
                      {lang.label}
                    </div>
                    <CheckIcon
                      className={cn(
                        'ml-2 h-4 w-4',
                        lang.value === language ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const MobileSheet = ({ logo, navigation, actions }: Readonly<Omit<Props, 'language'>>) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghostPrimary" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full px-0">
        <SheetHeader className="border-b-[1px] border-slate-100 pb-3">
          <div className="container inline-flex w-full items-center justify-between gap-12 px-3 md:px-6">
            <SheetClose asChild>
              <Link href="/" passHref>
                <Image
                  className="ease h-8 w-36 transition-all duration-1000 md:h-12 md:w-40"
                  src={urlBuilder(baseConfig).image(logo).width(128).auto('format').url()}
                  alt={logo.alt}
                  width={156}
                  height={40}
                />
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Button size="icon" variant="ghostSecondary">
                <XIcon className="size-5" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <SheetFooter className="w-full p-4">
          <div className="flex w-full flex-col gap-2">
            <Link href={actions.register.url} passHref>
              <Button
                disabled={actions.register.isDisabled}
                variant="ghostSecondary"
                className="w-full"
                size="lg"
              >
                <UserIcon className="mr-2 size-4" />
                {actions.register.label}
              </Button>
            </Link>
            <Link href={actions.cta.url} passHref>
              <Button
                disabled={actions.cta.isDisabled}
                variant="secondary"
                className="relative w-full"
                size="lg"
              >
                <span className="absolute right-[-5px] top-[-5px] flex size-3">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-indigo-300 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-indigo-300"></span>
                </span>
                {actions.cta.label}
              </Button>
            </Link>
          </div>
        </SheetFooter>
        <SheetDescription asChild className="flex flex-col items-center justify-between">
          <nav className="flex w-full flex-col items-center justify-center gap-0 py-8">
            {navigation.map((item) => (
              <SheetClose key={item._key} asChild>
                <Link key={item._key} href={item.url} className="w-full">
                  <li
                    key={item._key}
                    className=" ease w-full list-none border-b-[1px] border-orange-900/10 px-8 py-4 text-lg font-medium text-slate-600 transition-all duration-1000 hover:bg-slate-100"
                  >
                    {item.label}
                  </li>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
