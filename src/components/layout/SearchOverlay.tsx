"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useUiStore } from "@/lib/store/ui";
import { searchProducts } from "@/lib/data";
import { Media } from "@/components/brand/Media";
import { formatPrice, cn } from "@/lib/utils";

const POPULAR = ["Roses", "Truffle Box", "Anniversary", "Birthday", "Preserved Flowers"];

export function SearchOverlay({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isOpen = useUiStore((s) => s.searchOpen);
  const close = useUiStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchProducts(query, locale), [query, locale]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white">
      <div className="container-luxe flex items-center gap-4 border-b border-[var(--color-line)] py-5">
        <SearchIcon />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.header.searchPlaceholder}
          className="focus-ring flex-1 bg-transparent font-serif text-xl outline-none placeholder:text-[var(--color-ink)]/35"
        />
        <button onClick={close} className="focus-ring text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-terracotta)]">
          {dict.common.close}
        </button>
      </div>

      <div className="container-luxe flex-1 overflow-y-auto py-8">
        {query.trim() === "" ? (
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-ink)]/50">{dict.search.popular}</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="focus-ring border border-[var(--color-line)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="text-sm text-[var(--color-ink)]/60">
            {dict.search.noResults} “{query}”
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {results.slice(0, 12).map((product) => (
              <Link key={product.id} href={`/${locale}/p/${product.slug}`} onClick={close} className="focus-ring group">
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-cream)]">
                  <Media seed={product.images[0]} alt={product.name[locale]} className={cn("transition-transform duration-500 group-hover:scale-105")} />
                </div>
                <p className="mt-2 text-sm">{product.name[locale]}</p>
                <p className="text-sm text-[var(--color-terracotta)]">{formatPrice(product.price, locale)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-[var(--color-ink)]/50">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M18 18L13.8 13.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
