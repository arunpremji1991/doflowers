import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/brand/Logo";
import { PatternBackground } from "@/components/brand/Pattern";
import { NewsletterForm } from "./NewsletterForm";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  const shopLinks = [
    { label: dict.nav.flowers, href: "/flowers" },
    { label: dict.nav.chocolates, href: "/chocolates" },
    { label: dict.nav.flowersAndChocolates, href: "/flowers-chocolates" },
    { label: dict.nav.gifts, href: "/gifts" },
    { label: dict.nav.collections, href: "/collections/new" },
  ];
  const helpLinks = [
    { label: dict.footer.deliveryInfo, href: "/delivery-info" },
    { label: dict.footer.faq, href: "/faq" },
    { label: dict.footer.contact, href: "/contact" },
    { label: dict.account.trackOrder, href: "/track" },
  ];
  const companyLinks = [
    { label: dict.footer.about, href: "/about" },
    { label: dict.footer.terms, href: "/terms" },
    { label: dict.footer.privacy, href: "/privacy" },
  ];

  return (
    <>
      <div className="flex justify-center bg-[var(--color-cream)] pt-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/brand/border-botanical.svg"
          alt=""
          aria-hidden="true"
          className="h-auto w-full max-w-2xl opacity-80"
        />
      </div>
      <footer className="relative overflow-hidden bg-[var(--color-ink)] text-[var(--color-blush)]/85">
        <PatternBackground tone="cream" opacity={0.05} tileSize={160} className="hidden md:block" />
      <div className="container-luxe relative grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:py-20">
        <div className="space-y-4">
          <Logo tone="white" variant="full" subtitle={dict.brand.full.replace("DO ", "")} />
          <p className="max-w-xs text-sm leading-relaxed">{dict.brand.tagline}</p>
          <p className="pt-4 text-xs uppercase tracking-[0.12em] text-[var(--color-blush)]/60">{dict.footer.newsletter}</p>
          <NewsletterForm dict={dict} />
        </div>

        <FooterColumn title={dict.footer.shop} links={shopLinks} locale={locale} />
        <FooterColumn title={dict.footer.help} links={helpLinks} locale={locale} />
        <FooterColumn title={dict.footer.company} links={companyLinks} locale={locale} />
      </div>

      <div className="container-luxe relative flex flex-col gap-3 border-t border-[var(--color-blush)]/15 py-6 text-xs text-[var(--color-blush)]/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {dict.brand.full}. {dict.footer.rights}
        </p>
        <p>{dict.footer.currency}</p>
      </div>
      </footer>
    </>
  );
}

function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string;
  links: { label: string; href: string }[];
  locale: Locale;
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-blush)]/60">{title}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={`/${locale}${link.href}`} className="focus-ring text-sm transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
