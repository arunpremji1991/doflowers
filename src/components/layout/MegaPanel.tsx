"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useUiStore } from "@/lib/store/ui";
import { groupMeta, getOccasionBySlug } from "@/lib/data";
import { Media } from "@/components/brand/Media";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

const FEATURED_TILES = [{ seedOcc: "love" }, { seedOcc: "birthday" }];

export function MegaPanel({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isOpen = useUiStore((s) => s.menuOpen);
  const close = useUiStore((s) => s.closeMenu);

  const rows = [
    { label: dict.megaMenu.shopByOccasion, href: "/occasion", seed: "occ-love" },
    { label: dict.megaMenu.shopByCollection, href: "/collections/signature", seed: "col-signature" },
    { label: dict.nav.bestSellers, href: "/collections/best-sellers", seed: "col-best-sellers" },
    { label: dict.nav.newArrivals, href: "/collections/new", seed: "col-new" },
  ];

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-[var(--color-ink)]/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 flex w-full max-w-md flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        )}
        role="dialog"
        aria-label={dict.megaMenu.title}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-5">
          <h2 className="font-serif text-2xl">{dict.megaMenu.title}</h2>
          <div className="flex items-center gap-3">
            <span className="sm:hidden">
              <LanguageSwitcher locale={locale} />
            </span>
            <button onClick={close} className="focus-ring text-sm" aria-label={dict.common.close}>
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Top-level category tiles */}
          <div className="grid grid-cols-2 gap-3">
            {Object.values(groupMeta).map((g) => (
              <Link
                key={g.slug}
                href={`/${locale}/${g.slug}`}
                onClick={close}
                className="focus-ring group relative block aspect-[4/5] overflow-hidden rounded-sm"
              >
                <Media seed={`group-${g.slug}`} alt={g.name[locale]} className="transition-transform duration-500 group-hover:scale-105" sizes="220px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-3 font-serif text-base text-white">{g.name[locale]}</span>
              </Link>
            ))}
          </div>

          {/* Simple nav rows with thumbnail */}
          <div className="mt-5 space-y-2.5">
            {rows.map((row) => (
              <Link
                key={row.href}
                href={`/${locale}${row.href}`}
                onClick={close}
                className="focus-ring group flex items-center justify-between rounded-sm bg-[var(--color-cream)] px-4 py-3 transition-colors hover:bg-[var(--color-blush)]/40"
              >
                <span className="flex items-center gap-2 text-[15px]">
                  {row.label}
                  <ArrowIcon />
                </span>
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Media seed={row.seed} alt="" sizes="40px" />
                </span>
              </Link>
            ))}
          </div>

          {/* Secondary featured tiles */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {FEATURED_TILES.map((tile) => {
              const occasion = getOccasionBySlug(tile.seedOcc);
              if (!occasion) return null;
              return (
                <Link
                  key={tile.seedOcc}
                  href={`/${locale}/occasion/${tile.seedOcc}`}
                  onClick={close}
                  className="focus-ring group relative block aspect-[4/5] overflow-hidden rounded-sm"
                >
                  <Media seed={`occ-${tile.seedOcc}`} alt={occasion.name[locale]} className="transition-transform duration-500 group-hover:scale-105" sizes="220px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-sm text-white">{occasion.name[locale]}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href={`/${locale}/about`}
            onClick={close}
            className="focus-ring mt-6 block border-t border-[var(--color-line)] pt-5 text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-terracotta)]"
          >
            {dict.megaMenu.aboutUs}
          </Link>
        </div>
      </aside>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="rtl:rotate-180">
      <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
