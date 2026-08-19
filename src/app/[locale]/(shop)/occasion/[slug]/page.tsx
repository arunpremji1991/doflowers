import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getOccasionBySlug, getProductsForOccasion, categories } from "@/lib/data";

export default async function OccasionPage({
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
  const occasion = getOccasionBySlug(slug);
  if (!occasion) notFound();
  const sp = await searchParams;

  const baseProducts = getProductsForOccasion(slug);
  const relevantCategoryIds = new Set(baseProducts.flatMap((p) => p.categoryIds));

  return (
    <ProductListingPage
      locale={locale}
      dict={dict}
      title={occasion.name[locale]}
      description={occasion.description[locale]}
      heroSeed={`occ-${occasion.slug}`}
      breadcrumbLabel={occasion.name[locale]}
      baseProducts={baseProducts}
      categories={categories.filter((c) => relevantCategoryIds.has(c.id))}
      searchParams={sp}
    />
  );
}
