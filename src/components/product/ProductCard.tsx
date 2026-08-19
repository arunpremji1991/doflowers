"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/lib/types";
import { Media } from "@/components/brand/Media";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";

export function ProductCard({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const hasWishlisted = useWishlistStore((s) => s.has(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const addLine = useCartStore((s) => s.addLine);

  return (
    <div className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-cream)]">
        <Link href={`/${locale}/p/${product.slug}`} className="focus-ring block h-full w-full">
          <Media
            seed={product.images[0]}
            alt={product.name[locale]}
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        </Link>

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
          <div className="flex flex-col gap-1.5">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="bg-white/90 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-terracotta)]"
              >
                {dict.badges[badge]}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            aria-label={hasWishlisted ? dict.product.wishlistRemove : dict.product.wishlistAdd}
            className="focus-ring flex h-8 w-8 items-center justify-center bg-white/90 text-[var(--color-ink)] transition-colors hover:text-[var(--color-terracotta)]"
          >
            <svg width="15" height="15" viewBox="0 0 18 18" fill={hasWishlisted ? "var(--color-terracotta)" : "none"}>
              <path
                d="M9 15.5S1.75 11.2 1.75 6.3C1.75 3.9 3.6 2 6 2c1.3 0 2.4.6 3 1.6C9.6 2.6 10.7 2 12 2c2.4 0 4.25 1.9 4.25 4.3 0 4.9-7.25 9.2-7.25 9.2Z"
                stroke={hasWishlisted ? "var(--color-terracotta)" : "currentColor"}
                strokeWidth="1.3"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={() =>
            addLine({
              productSlug: product.slug,
              quantity: 1,
              selectedOptions: {},
              addOnIds: [],
              unitPrice: product.price,
            })
          }
          disabled={!product.inStock}
          className={cn(
            "absolute inset-x-2.5 bottom-2.5 translate-y-2 bg-[var(--color-ink)] py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100",
            !product.inStock && "cursor-not-allowed opacity-60"
          )}
        >
          {product.inStock ? dict.product.quickAdd : dict.product.outOfStock}
        </button>
      </div>

      <div className="mt-3">
        <Link href={`/${locale}/p/${product.slug}`} className="focus-ring">
          <h3 className="font-serif text-[15px] leading-snug text-[var(--color-ink)]">{product.name[locale]}</h3>
        </Link>
        <p className="mt-1 text-[13px] text-[var(--color-ink)]/55">{product.subtitle[locale]}</p>
        <p className="mt-1.5 text-sm font-medium text-[var(--color-terracotta)]">
          {product.compareAtPrice && (
            <span className="me-2 text-[var(--color-ink)]/40 line-through">{formatPrice(product.compareAtPrice, locale)}</span>
          )}
          {formatPrice(product.price, locale)}
        </p>
      </div>
    </div>
  );
}
