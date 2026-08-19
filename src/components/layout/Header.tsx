"use client";

import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Logo } from "@/components/brand/Logo";
import { useUiStore } from "@/lib/store/ui";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const openSearch = useUiStore((s) => s.openSearch);
  const toggleMenu = useUiStore((s) => s.toggleMenu);
  const cartCount = useCartStore((s) => s.lines.reduce((sum, l) => sum + l.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.slugs.length);
  const openCart = useCartStore((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-white">
      <div className="container-luxe relative flex h-[70px] items-center justify-between gap-4 sm:h-20">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-5 sm:gap-7">
          <button type="button" onClick={toggleMenu} className="focus-ring flex items-center gap-2 text-[var(--color-ink)]">
            <MenuIcon />
            <span className="hidden text-[13px] font-medium sm:inline">{dict.header.menu}</span>
          </button>
          <button
            type="button"
            onClick={openSearch}
            className="focus-ring hidden items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-terracotta)] sm:flex"
          >
            <SearchIcon />
            <span className="text-[13px] font-medium">{dict.header.search}</span>
          </button>
        </div>

        {/* Center: logo */}
        <Link href={`/${locale}`} className="focus-ring absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2">
          <Logo variant="full" className="h-9 w-auto sm:h-11" subtitle={dict.brand.full.replace("DO ", "")} />
        </Link>

        {/* Right: wishlist, account, cart */}
        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href={`/${locale}/wishlist`}
            className="focus-ring relative hidden items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-terracotta)] sm:flex"
          >
            <HeartIcon />
            <span className="hidden text-[13px] font-medium lg:inline">{dict.header.wishlist}</span>
            {wishlistCount > 0 && <Badge count={wishlistCount} />}
          </Link>
          <Link
            href={`/${locale}/account`}
            className="focus-ring hidden items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-terracotta)] sm:flex"
          >
            <AccountIcon />
            <span className="hidden text-[13px] font-medium lg:inline">{dict.header.account}</span>
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="focus-ring relative flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-terracotta)]"
          >
            <BagIcon />
            <span className="hidden text-[13px] font-medium lg:inline">{dict.header.cart}</span>
            {cartCount > 0 && <Badge count={cartCount} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute -end-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-terracotta)] px-1 text-[10px] font-medium text-white">
      {count}
    </span>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
      <path d="M0 1H20M0 7H20M0 13H20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M16 16L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 15.5S1.75 11.2 1.75 6.3C1.75 3.9 3.6 2 6 2c1.3 0 2.4.6 3 1.6C9.6 2.6 10.7 2 12 2c2.4 0 4.25 1.9 4.25 4.3 0 4.9-7.25 9.2-7.25 9.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
function AccountIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 15.5C3.5 12 6 10.5 9 10.5C12 10.5 14.5 12 15.5 15.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4.5 6H13.5L13 16H5L4.5 6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6.5 6V5a2.5 2.5 0 0 1 5 0v1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
