import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getProductsForGroup, getCategoriesForGroup } from "@/lib/data";

export default async function FlowersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; badge?: string; sort?: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const sp = await searchParams;

  return (
    <ProductListingPage
      locale={locale}
      dict={dict}
      title={dict.nav.flowers}
      description={dict.home.flowersEditorialBody}
      heroSeed="group-flowers"
      breadcrumbLabel={dict.nav.flowers}
      baseProducts={getProductsForGroup("flowers")}
      categories={getCategoriesForGroup("flowers")}
      searchParams={sp}
    />
  );
}
