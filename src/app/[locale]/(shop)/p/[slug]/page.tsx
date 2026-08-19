import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ProductInfoSections } from "@/components/product/ProductInfoSections";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { groupMeta } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name[locale],
    description: product.subtitle[locale],
  };
}

export default async function ProductPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const group = groupMeta[product.group];

  return (
    <div>
      <div className="container-luxe pt-6">
        <Breadcrumb
          locale={locale}
          items={[
            { label: group.name[locale], href: `/${group.slug}` },
            { label: product.name[locale] },
          ]}
        />
      </div>

      <div className="container-luxe grid gap-10 pb-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} alt={product.name[locale]} />
        <div>
          <PurchasePanel product={product} locale={locale} dict={dict} />
          <ProductInfoSections product={product} locale={locale} dict={dict} />
        </div>
      </div>

      <RelatedProducts product={product} locale={locale} dict={dict} />
    </div>
  );
}
