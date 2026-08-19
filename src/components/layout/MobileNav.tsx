"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useUiStore } from "@/lib/store/ui";
import { useCartStore } from "@/lib/store/cart";

export function MobileNav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const openSearch = useUiStore((s) => s.openSearch);
  const openCart = useCartStore((s) => s.open);
  const cartCount = useCartStore((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));

  const items = [
    { label: dict.mobileNav.home, href: `/${locale}`, icon: HomeIcon, type: "link" as const },
    { label: dict.mobileNav.shop, href: `/${locale}/collections/new`, icon: ShopIcon, type: "link" as const },
    { label: dict.mobileNav.search, icon: SearchIcon, type: "action" as const, onClick: openSearch },
    { label: dict.mobileNav.wishlist, href: `/${locale}/wishlist`, icon: HeartIcon, type: "link" as const },
    { label: dict.mobileNav.cart, icon: BagIcon, type: "action" as const, onClick: openCart, count: cartCount },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center justify-around border-t border-[var(--color-line)] bg-white/95 backdrop-blur md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <>
            <span className="relative">
              <Icon />
              {"count" in item && item.count ? (
                <span className="absolute -end-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--color-terracotta)] px-0.5 text-[9px] text-white">
                  {item.count}
                </span>
              ) : null}
            </span>
            <span className="text-[10px]">{item.label}</span>
          </>
        );
        if (item.type === "link") {
          return (
            <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1 text-[var(--color-ink)]/75">
              {content}
            </Link>
          );
        }
        return (
          <button key={item.label} onClick={item.onClick} className="flex flex-col items-center gap-1 text-[var(--color-ink)]/75">
            {content}
          </button>
        );
      })}
    </nav>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 9L10 3l7 6v8H3V9Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
function ShopIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 8h12l-1 9H5L4 8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M17.5 17.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 17S2.5 12.5 2.5 7.3C2.5 4.7 4.5 2.7 7 2.7c1.4 0 2.7.7 3 1.8.3-1.1 1.6-1.8 3-1.8 2.5 0 4.5 2 4.5 4.6 0 5.2-7.5 9.7-7.5 9.7Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7h10l-.8 10H5.8L5 7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7.3 7V5.7a2.7 2.7 0 0 1 5.4 0V7" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
