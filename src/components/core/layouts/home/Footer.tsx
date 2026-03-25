import Image from 'next/image';
import Link from 'next/link';
import { baseConfig } from '@/sanity/lib/client';
import { FooterNavigationItemType, SocialType } from '@/sanity/queries/config';
import { SanityImage } from '@/sanity/queries/default';
import urlBuilder from '@sanity/image-url';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook, FaLinkedin, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';

interface Props {
  logo: SanityImage;
  description: string;
  navigation: Array<FooterNavigationItemType>;
  copyright: string;
  social: SocialType;
}

export function Footer(props: Readonly<Props>) {
  return (
    <footer className="inline-flex w-full flex-col items-center justify-start gap-9 border-t border-slate-800 bg-secondary px-6 pb-9 pt-16 md:px-8">
      <div className="container flex w-full flex-col gap-9 px-0">
        <div className="flex w-full flex-col items-start justify-between gap-9 md:flex-row">
          <FooterNewsletter {...props} />
          <FooterMenu {...props} />
        </div>
        <hr className="border border-slate-800" />
        <div className="flex w-full flex-col-reverse items-center justify-center gap-9 md:flex-row md:justify-between">
          <FooterCopyright {...props} />
          <FooterSocial {...props} />
        </div>
      </div>
    </footer>
  );
}

function FooterNewsletter({ logo }: Readonly<Props>) {
  return (
    <div className="inline-flex w-full flex-col items-start justify-start gap-9 md:w-fit">
      <div className="flex w-full flex-col items-start justify-start gap-3">
        <Image
          className="h-12 w-fit md:h-14"
          src={urlBuilder(baseConfig).image(logo).width(260).auto('format').url()}
          alt={logo.alt}
          width={260}
          height={48}
        />
        {/* <div className="text-sm text-slate-400 md:text-base">{description}</div> */}
      </div>
      {/* <div className="relative inline-flex w-full items-center gap-2">
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          className="h-14 w-full rounded-full border-slate-400 bg-transparent pl-6 pr-24 text-white placeholder:text-slate-400 md:w-fit"
        />
        <Button size="icon" className="absolute right-1.5 top-1.5 size-11 rounded-full">
          <ArrowRight className="size-5" />
        </Button>
      </div> */}
    </div>
  );
}

function FooterMenu({ navigation }: Readonly<Props>) {
  return (
    <div className="flex flex-col items-start justify-start gap-8 md:flex-row md:gap-16">
      {navigation.map((menu) => (
        <div
          key={menu._key}
          className="inline-flex w-full flex-col items-start justify-start gap-6"
        >
          <h5 className="text-sm font-bold text-slate-400 md:text-base">{menu.title}</h5>
          <div className="flex flex-col items-start justify-start gap-5">
            {menu.items.map((item) => (
              <div key={item._key} className="inline-flex w-full items-center gap-3">
                {item.icon && (
                  <Image
                    className="size-4 md:size-5"
                    src={urlBuilder(baseConfig).image(item.icon).width(20).auto('format').url()}
                    alt="Icon"
                    width={20}
                    height={20}
                  />
                )}
                <Link href={item.anchor.url} className="text-sm text-white md:text-base">
                  {item.anchor.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FooterCopyright({ copyright }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex w-full flex-col-reverse items-center justify-start gap-9 text-center md:flex-row md:gap-4">
      <p className="text-xs text-slate-400">
        © 2022-{currentYear} {copyright}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end md:gap-4">
        <p className="text-xs text-slate-400">Termos e Condições</p>
        <div className="size-1 rounded-full bg-slate-600" />
        <p className="text-xs text-slate-400">Política de Privacidade</p>
        <div className="size-1 rounded-full bg-slate-600" />
        <p className="text-xs text-slate-400">Cookies</p>
      </div>
    </div>
  );
}

function FooterSocial({ social }: Props) {
  const className = 'ease size-5 text-slate-400 transition-all duration-500 hover:text-white';

  return (
    <div className="inline-flex items-center justify-end gap-6">
      {social.twitter && (
        <a href={social.twitter} target="_blank" rel="noopener noreferrer">
          <FaXTwitter className={className} />
        </a>
      )}
      {social.linkedin && (
        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className={className} />
        </a>
      )}
      {social.facebook && (
        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
          <FaFacebook className={className} />
        </a>
      )}
      {social.instagram && (
        <a href={social.instagram} target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className={className} />
        </a>
      )}
      {social.youtube && (
        <a href={social.youtube} target="_blank" rel="noopener noreferrer">
          <FaYoutube className={className} />
        </a>
      )}
      {social.tiktok && (
        <a href={social.tiktok} target="_blank" rel="noopener noreferrer">
          <FaTiktok className={className} />
        </a>
      )}
    </div>
  );
}
