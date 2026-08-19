import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { dir, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawerRoot } from "@/components/cart/CartDrawerRoot";

// English — brand typeface for both display and body text.
const hkGrotesk = localFont({
  src: [
    { path: "../../fonts/hk-grotesk/HKGrotesk-Light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/hk-grotesk/HKGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/hk-grotesk/HKGrotesk-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../fonts/hk-grotesk/HKGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../fonts/hk-grotesk/HKGrotesk-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../fonts/hk-grotesk/HKGrotesk-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-hk",
  display: "swap",
});

// Arabic — brand typeface for both display and body text (regular + extra bold).
const alMohanad = localFont({
  src: [
    { path: "../../fonts/al-mohanad/AL-Mohanad.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/al-mohanad/AL-Mohanad-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-almohanad",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { default: dict.brand.full, template: `%s · ${dict.brand.name}` },
    description: dict.brand.tagline,
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={`${hkGrotesk.variable} ${alMohanad.variable} font-sans antialiased`}>
        <CartDrawerRoot locale={locale} dict={dict}>
          <TopBar locale={locale} dict={dict} />
          <Header locale={locale} dict={dict} />
          <main className="min-h-[60vh] pb-16 md:pb-0">{children}</main>
          <Footer locale={locale} dict={dict} />
          <MobileNav locale={locale} dict={dict} />
        </CartDrawerRoot>
      </body>
    </html>
  );
}
