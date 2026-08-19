import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getCollectionBySlug, getProductsForCollection, categories } from "@/lib/data";

const KNOWN = ["new", "best-sellers", "signature", "seasonal"];

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ category?: string; badge?: string; sort?: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  if (!KNOWN.includes(slug)) notFound();
  const sp = await searchParams;

  const collection = getCollectionBySlug(slug);
  const title = collection ? collection.name[locale] : slug === "new" ? dict.nav.newArrivals : dict.nav.bestSellers;
  const description = collection?.description[locale];

  const baseProducts = getProductsForCollection(slug);
  const relevantCategoryIds = new Set(baseProducts.flatMap((p) => p.categoryIds));

  return (
    <ProductListingPage
      locale={locale}
      dict={dict}
      title={title}
      description={description}
      heroSeed={`col-${slug}`}
      breadcrumbLabel={title}
      baseProducts={baseProducts}
      categories={categories.filter((c) => relevantCategoryIds.has(c.id))}
      searchParams={sp}
    />
  );
}
