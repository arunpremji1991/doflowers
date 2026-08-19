"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Category, Badge } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { SortKey } from "@/lib/data";

const SORT_KEYS: SortKey[] = ["recommended", "newest", "bestselling", "price-asc", "price-desc"];
const SORT_LABEL_KEY: Record<SortKey, keyof Dictionary["filters"]> = {
  recommended: "sortRecommended",
  newest: "sortNewest",
  bestselling: "sortBestSelling",
  "price-asc": "sortPriceLow",
  "price-desc": "sortPriceHigh",
};
const BADGES: Badge[] = ["bestSeller", "new", "limited", "seasonal"];

export function FilterSortBar({
  locale,
  dict,
  categories,
  resultCount,
}: {
  locale: Locale;
  dict: Dictionary;
  categories: Category[];
  resultCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeCategory = searchParams.get("category");
  const activeBadge = searchParams.get("badge");
  const activeSort = (searchParams.get("sort") as SortKey) ?? "recommended";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="mb-8 flex items-center justify-between border-y border-[var(--color-line)] py-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="focus-ring flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em]"
        >
          <FilterIcon />
          {dict.filters.filters}
          {(activeCategory || activeBadge) && <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-terracotta)]" />}
        </button>
        <span className="hidden text-xs text-[var(--color-ink)]/45 sm:inline">
          {resultCount} {dict.filters.results}
        </span>
      </div>

      <select
        value={activeSort}
        onChange={(e) => updateParam("sort", e.target.value === "recommended" ? null : e.target.value)}
        className="focus-ring border-none bg-transparent text-xs font-medium uppercase tracking-[0.1em]"
      >
        {SORT_KEYS.map((key) => (
          <option key={key} value={key}>
            {dict.filters[SORT_LABEL_KEY[key]]}
          </option>
        ))}
      </select>

      {drawerOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-[var(--color-ink)]/40" onClick={() => setDrawerOpen(false)} />
          <aside className="fixed inset-y-0 start-0 z-50 w-full max-w-xs overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-lg">{dict.filters.filters}</h3>
              <button onClick={() => setDrawerOpen(false)} className="focus-ring text-sm" aria-label={dict.common.close}>
                ✕
              </button>
            </div>

            {categories.length > 0 && (
              <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/50">{dict.filters.category}</p>
                <ul className="space-y-2.5">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => updateParam("category", activeCategory === cat.slug ? null : cat.slug)}
                        className={cn(
                          "focus-ring text-sm",
                          activeCategory === cat.slug ? "font-medium text-[var(--color-terracotta)]" : "text-[var(--color-ink)]/75"
                        )}
                      >
                        {cat.name[locale]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/50">{dict.filters.availability}</p>
              <ul className="space-y-2.5">
                {BADGES.map((badge) => (
                  <li key={badge}>
                    <button
                      onClick={() => updateParam("badge", activeBadge === badge ? null : badge)}
                      className={cn(
                        "focus-ring text-sm",
                        activeBadge === badge ? "font-medium text-[var(--color-terracotta)]" : "text-[var(--color-ink)]/75"
                      )}
                    >
                      {dict.badges[badge]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                router.push(pathname, { scroll: false });
                setDrawerOpen(false);
              }}
              className="focus-ring w-full border border-[var(--color-ink)] py-3 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
            >
              {dict.filters.clearAll}
            </button>
          </aside>
        </>
      )}
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4H14M4.5 8H11.5M6.5 12H9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
