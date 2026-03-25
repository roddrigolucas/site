import React, { Fragment, ReactNode } from 'react';
import { FooterType, NavBarType, SocialType } from '@/sanity/queries/config';

import { Footer } from './Footer';
import { NavBar } from './NavBar';

interface Props {
  children: ReactNode;
  language: string;
  navbar: NavBarType;
  footer: FooterType;
  social: SocialType;
}

export function MainLayout({ navbar, footer, children, language, social }: Readonly<Props>) {
  return (
    <Fragment>
      <NavBar
        logo={navbar.logo}
        navigation={navbar.navigation}
        actions={navbar.actions}
        language={language}
      />
      {children}
      <Footer social={social} {...footer} />
    </Fragment>
  );
}
