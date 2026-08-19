"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cartLineTotal, useCartStore } from "@/lib/store/cart";
import { getProductBySlug, addOns } from "@/lib/data";
import { Media } from "@/components/brand/Media";
import { formatPrice, cn } from "@/lib/utils";

const addOnPrices = Object.fromEntries(addOns.map((a) => [a.id, a.price]));

export function CartDrawer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const removeLine = useCartStore((s) => s.removeLine);
  const setQuantity = useCartStore((s) => s.setQuantity);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = lines.reduce((sum, line) => sum + cartLineTotal(line, addOnPrices), 0);

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
          "fixed inset-y-0 end-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        )}
        role="dialog"
        aria-label={dict.cart.title}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-line)] px-6 py-5">
          <h2 className="font-serif text-xl">{dict.cart.title}</h2>
          <button onClick={close} className="focus-ring text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-terracotta)]" aria-label={dict.common.close}>
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-serif text-lg">{dict.cart.empty}</p>
            <p className="text-sm text-[var(--color-ink)]/60">{dict.cart.emptyBody}</p>
            <button
              onClick={close}
              className="focus-ring mt-3 border border-[var(--color-ink)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
            >
              {dict.cart.continueShopping}
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[var(--color-line)] overflow-y-auto px-6">
              {lines.map((line) => {
                const product = getProductBySlug(line.productSlug);
                if (!product) return null;
                return (
                  <li key={line.lineId} className="flex gap-4 py-5">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--color-cream)]">
                      <Media seed={product.images[0]} alt={product.name[locale]} sizes="80px" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link href={`/${locale}/p/${product.slug}`} onClick={close} className="focus-ring font-serif text-[15px] hover:text-[var(--color-terracotta)]">
                          {product.name[locale]}
                        </Link>
                        {Object.keys(line.selectedOptions).length > 0 && (
                          <p className="mt-0.5 text-xs text-[var(--color-ink)]/55">{Object.values(line.selectedOptions).join(" · ")}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[var(--color-line)]">
                          <button
                            className="focus-ring h-7 w-7 text-sm"
                            onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                            aria-label="-"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">{line.quantity}</span>
                          <button
                            className="focus-ring h-7 w-7 text-sm"
                            onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                            aria-label="+"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(cartLineTotal(line, addOnPrices), locale)}</span>
                      </div>
                      <button
                        onClick={() => removeLine(line.lineId)}
                        className="focus-ring self-start text-xs text-[var(--color-ink)]/50 underline-offset-2 hover:text-[var(--color-terracotta)] hover:underline"
                      >
                        {dict.cart.remove}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-[var(--color-line)] px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-[var(--color-ink)]/70">{dict.cart.subtotal}</span>
                <span className="font-medium">{formatPrice(subtotal, locale)}</span>
              </div>
              <Link
                href={`/${locale}/checkout`}
                onClick={close}
                className="btn-textured focus-ring flex w-full items-center justify-center bg-[var(--color-terracotta)] px-5 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-terracotta-dark)]"
              >
                {dict.cart.checkout}
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
