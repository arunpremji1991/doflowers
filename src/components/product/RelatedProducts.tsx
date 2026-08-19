import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/lib/types";
import { products as allProducts } from "@/lib/data";
import { ProductCarousel } from "./ProductCarousel";

export function RelatedProducts({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const related = allProducts
    .filter((p) => p.id !== product.id && (p.group === product.group || p.categoryIds.some((c) => product.categoryIds.includes(c))))
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="container-luxe border-t border-[var(--color-line)] py-16">
      <h2 className="mb-8 font-serif text-2xl">{dict.product.relatedTitle}</h2>
      <ProductCarousel products={related} locale={locale} dict={dict} />
    </section>
  );
}
