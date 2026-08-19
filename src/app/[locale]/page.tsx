import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { HeroVideo } from "@/components/home/HeroVideo";
import { SectionHeading } from "@/components/home/SectionHeading";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { OccasionGrid } from "@/components/home/OccasionGrid";
import { Editorial } from "@/components/home/Editorial";
import { BrandStory } from "@/components/home/BrandStory";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { getProductsForCollection } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.brand.tagline };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  const bestSellers = getProductsForCollection("best-sellers");
  const newArrivals = getProductsForCollection("new");
  const signature = getProductsForCollection("signature");

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[86vh] min-h-[560px] w-full items-center justify-center overflow-hidden text-white">
        <HeroVideo />
        <div className="absolute inset-0 bg-[var(--color-ink)]/25" />
        <div className="relative flex flex-col items-center px-6 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em]">{dict.brand.full}</p>
          <h1 className="max-w-2xl font-serif text-[40px] leading-[1.1] sm:text-[64px]">{dict.brand.heroTitle}</h1>
          <p className="mt-5 max-w-md text-[15px] text-white/85 sm:text-base">{dict.brand.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/collections/new`}
              className="focus-ring bg-white px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-blush)]"
            >
              {dict.brand.heroCta}
            </Link>
            <Link
              href={`/${locale}/collections/signature`}
              className="focus-ring border border-white px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[var(--color-ink)]"
            >
              {dict.brand.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="container-luxe py-16 sm:py-20">
        <SectionHeading title={dict.home.shopByCategory} />
        <CategoryGrid locale={locale} />
      </section>

      {/* Shop by occasion */}
      <section className="container-luxe py-4 sm:py-8">
        <SectionHeading title={dict.home.shopByOccasion} cta={dict.nav.viewAll} href="/occasion" locale={locale} />
        <OccasionGrid locale={locale} />
      </section>

      {/* Best sellers */}
      <section className="container-luxe py-16 sm:py-20">
        <SectionHeading
          eyebrow={dict.nav.bestSellers}
          title={dict.home.mostLoved}
          subtitle={dict.home.mostLovedSub}
          cta={dict.nav.viewAll}
          href="/collections/best-sellers"
          locale={locale}
        />
        <ProductCarousel products={bestSellers} locale={locale} dict={dict} limit={8} />
      </section>

      {/* New arrivals */}
      <section className="container-luxe py-4 sm:py-8">
        <SectionHeading
          eyebrow={dict.nav.newArrivals}
          title={dict.home.newArrivals}
          subtitle={dict.home.newArrivalsSub}
          cta={dict.nav.viewAll}
          href="/collections/new"
          locale={locale}
        />
        <ProductCarousel products={newArrivals} locale={locale} dict={dict} limit={8} />
      </section>

      {/* Signature collection */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-luxe">
          <SectionHeading
            eyebrow={dict.nav.collections}
            title={dict.home.signature}
            subtitle={dict.home.signatureSub}
            cta={dict.nav.viewAll}
            href="/collections/signature"
            locale={locale}
          />
          <ProductCarousel products={signature} locale={locale} dict={dict} limit={8} />
        </div>
      </section>

      {/* Flowers editorial */}
      <section className="py-4 sm:py-8">
        <Editorial
          seed="editorial-flowers"
          eyebrow={dict.nav.flowers}
          title={dict.home.flowersEditorialTitle}
          body={dict.home.flowersEditorialBody}
          cta={dict.home.shopNow}
          href="/flowers"
          locale={locale}
        />
      </section>

      {/* Chocolate editorial */}
      <section className="py-4 sm:py-8">
        <Editorial
          seed="editorial-chocolate"
          eyebrow={dict.nav.chocolates}
          title={dict.home.chocolateEditorialTitle}
          body={dict.home.chocolateEditorialBody}
          cta={dict.home.shopNow}
          href="/chocolates"
          locale={locale}
          reverse
        />
      </section>

      {/* Combo highlight */}
      <section className="py-4 sm:py-8">
        <Editorial
          seed="editorial-combo"
          eyebrow={dict.nav.flowersAndChocolates}
          title={dict.home.comboTitle}
          body={dict.home.comboBody}
          cta={dict.home.shopNow}
          href="/flowers-chocolates"
          locale={locale}
        />
      </section>

      <BrandStory locale={locale} dict={dict} />
      <InstagramStrip locale={locale} dict={dict} />

      {/* Newsletter */}
      <section className="container-luxe flex flex-col items-center py-20 text-center sm:py-24">
        <h2 className="font-serif text-2xl sm:text-3xl">{dict.home.newsletterTitle}</h2>
        <p className="mt-2 max-w-sm text-sm text-[var(--color-ink)]/60">{dict.home.newsletterBody}</p>
        <div className="mt-6">
          <NewsletterForm dict={dict} tone="light" />
        </div>
      </section>
    </>
  );
}
