import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/product/ProductListingPage";
import { getProductsForGroup, getCategoriesForGroup } from "@/lib/data";

export default async function ComboPage({
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
      title={dict.nav.flowersAndChocolates}
      description={dict.home.comboBody}
      heroSeed="group-flowers-chocolates"
      breadcrumbLabel={dict.nav.flowersAndChocolates}
      baseProducts={getProductsForGroup("combo")}
      categories={getCategoriesForGroup("combo")}
      searchParams={sp}
    />
  );
}
