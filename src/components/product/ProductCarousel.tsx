import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({
  products,
  locale,
  dict,
  limit,
}: {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
  /** Caps items on the md+ grid (e.g. 8 = two rows of four). Mobile scroll strip is unaffected. */
  limit?: number;
}) {
  return (
    <div className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-x-10 md:gap-y-14 md:overflow-visible md:px-0 md:pb-0">
      {products.map((product, i) => (
        <div
          key={product.id}
          className={`w-[62vw] shrink-0 snap-start sm:w-[42vw] md:w-auto ${
            limit && i >= limit ? "md:hidden" : ""
          }`}
        >
          <ProductCard product={product} locale={locale} dict={dict} />
        </div>
      ))}
    </div>
  );
}
