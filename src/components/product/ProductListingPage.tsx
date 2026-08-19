import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product, Category, Badge } from "@/lib/types";
import { filterProducts, sortProducts, type SortKey } from "@/lib/data";
import { Media } from "@/components/brand/Media";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FilterSortBar } from "./FilterSortBar";
import { ProductGrid } from "./ProductGrid";
import { getCategoryBySlug } from "@/lib/data";

export function ProductListingPage({
  locale,
  dict,
  title,
  description,
  heroSeed,
  breadcrumbLabel,
  baseProducts,
  categories,
  searchParams,
}: {
  locale: Locale;
  dict: Dictionary;
  title: string;
  description?: string;
  heroSeed: string;
  breadcrumbLabel: string;
  baseProducts: Product[];
  categories: Category[];
  searchParams: { category?: string; badge?: string; sort?: string };
}) {
  const categorySlug = searchParams.category;
  const categoryObj = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const badge = searchParams.badge as Badge | undefined;
  const sort = (searchParams.sort as SortKey) ?? "recommended";

  const filtered = filterProducts(baseProducts, {
    category: categoryObj ? [categoryObj.id] : undefined,
    badge: badge ? [badge] : undefined,
  });
  const sorted = sortProducts(filtered, sort);

  return (
    <div>
      <div className="relative h-52 w-full overflow-hidden sm:h-72">
        <Media seed={heroSeed} alt={title} priority sizes="100vw" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-ink)]/30 px-6 text-center text-white">
          <h1 className="font-serif text-[32px] sm:text-[44px]">{title}</h1>
          {description && <p className="mt-2 max-w-md text-sm text-white/85">{description}</p>}
        </div>
      </div>

      <div className="container-luxe py-8 sm:py-10">
        <Breadcrumb locale={locale} items={[{ label: breadcrumbLabel }]} />
        <FilterSortBar locale={locale} dict={dict} categories={categories} resultCount={sorted.length} />
        <ProductGrid products={sorted} locale={locale} dict={dict} />
      </div>
    </div>
  );
}
