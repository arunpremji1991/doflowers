"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useWishlistStore } from "@/lib/store/wishlist";
import { products } from "@/lib/data";
import { ProductGrid } from "./ProductGrid";

export function WishlistView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const slugs = useWishlistStore((s) => s.slugs);
  const items = products.filter((p) => slugs.includes(p.slug));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="font-serif text-lg">{dict.wishlist.empty}</p>
        <p className="text-sm text-[var(--color-ink)]/60">{dict.wishlist.emptyBody}</p>
        <Link
          href={`/${locale}/collections/new`}
          className="focus-ring mt-3 border border-[var(--color-ink)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
        >
          {dict.cart.continueShopping}
        </Link>
      </div>
    );
  }

  return <ProductGrid products={items} locale={locale} dict={dict} />;
}
