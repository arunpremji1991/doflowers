import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, locale, dict }: { products: Product[]; locale: Locale; dict: Dictionary }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-sm text-[var(--color-ink)]/55">{dict.filters.noResults}</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} dict={dict} />
      ))}
    </div>
  );
}
