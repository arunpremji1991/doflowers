"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { CartDrawer } from "./CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MegaPanel } from "@/components/layout/MegaPanel";

export function CartDrawerRoot({
  children,
  locale,
  dict,
}: {
  children: React.ReactNode;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <>
      {children}
      <CartDrawer locale={locale} dict={dict} />
      <SearchOverlay locale={locale} dict={dict} />
      <MegaPanel locale={locale} dict={dict} />
    </>
  );
}
