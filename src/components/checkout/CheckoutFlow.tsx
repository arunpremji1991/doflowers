"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cartLineTotal, useCartStore } from "@/lib/store/cart";
import { getProductBySlug, addOns } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { Media } from "@/components/brand/Media";

const addOnPrices = Object.fromEntries(addOns.map((a) => [a.id, a.price]));
const STEPS = ["info", "delivery", "gift", "payment", "confirm"] as const;
type Step = (typeof STEPS)[number];

export function CheckoutFlow({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [orderNumber, setOrderNumber] = useState("");
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const step: Step = STEPS[stepIndex];

  const subtotal = lines.reduce((sum, line) => sum + cartLineTotal(line, addOnPrices), 0);
  const deliveryFee = subtotal > 0 && subtotal < 30 ? 2 : 0;
  const total = subtotal + deliveryFee;

  if (lines.length === 0 && step !== "confirm") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="font-serif text-lg">{dict.cart.empty}</p>
        <Link
          href={`/${locale}/collections/new`}
          className="focus-ring mt-3 border border-[var(--color-ink)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
        >
          {dict.cart.continueShopping}
        </Link>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-blush)]/60 text-2xl text-[var(--color-terracotta)]">
          ✓
        </div>
        <h1 className="font-serif text-2xl">{dict.checkout.confirmedTitle}</h1>
        <p className="max-w-md text-sm text-[var(--color-ink)]/65">{dict.checkout.confirmedBody}</p>
        <p className="mt-2 text-sm">
          {dict.checkout.orderNumber}: <span className="font-medium">{orderNumber}</span>
        </p>
        <Link
          href={`/${locale}`}
          className="focus-ring mt-4 bg-[var(--color-ink)] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-terracotta)]"
        >
          {dict.checkout.backHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div>
        {/* Stepper */}
        <ol className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
          {STEPS.slice(0, 4).map((s, i) => (
            <li key={s} className={cn("flex items-center gap-2 text-xs font-medium uppercase tracking-[0.08em]", i <= stepIndex ? "text-[var(--color-terracotta)]" : "text-[var(--color-ink)]/35")}>
              <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border text-[10px]", i <= stepIndex ? "border-[var(--color-terracotta)]" : "border-[var(--color-ink)]/30")}>
                {i + 1}
              </span>
              {dict.checkout.steps[s]}
            </li>
          ))}
        </ol>

        {step === "info" && (
          <div className="space-y-4">
            <Field label={dict.checkout.fullName} />
            <Field label={dict.checkout.email} type="email" />
            <Field label={dict.checkout.phone} type="tel" />
          </div>
        )}

        {step === "delivery" && (
          <div className="space-y-4">
            <Field label={dict.checkout.address} />
            <Field label={dict.checkout.city} />
            <div className="grid grid-cols-2 gap-4">
              <Field label={dict.product.deliveryDate} type="date" />
              <Field label={dict.product.deliveryTime} />
            </div>
            <Field label={dict.checkout.notes} />
          </div>
        )}

        {step === "gift" && (
          <div className="space-y-4">
            <Field label={dict.product.recipientName} />
            <Field label={dict.product.senderName} />
            <div>
              <label className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.giftMessage}</label>
              <textarea rows={4} maxLength={240} className="focus-ring w-full resize-none border border-[var(--color-line)] px-3 py-2.5 text-sm" />
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/60">{dict.checkout.paymentMethod}</p>
            {["Credit / Debit Card", "Apple Pay", "Cash on Delivery"].map((method) => (
              <label key={method} className="flex cursor-pointer items-center gap-3 border border-[var(--color-line)] px-4 py-3 text-sm has-[:checked]:border-[var(--color-terracotta)]">
                <input type="radio" name="payment" defaultChecked={method === "Credit / Debit Card"} className="accent-[var(--color-terracotta)]" />
                {method}
              </label>
            ))}
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {stepIndex > 0 && (
            <button
              onClick={() => setStepIndex((i) => i - 1)}
              className="focus-ring border border-[var(--color-line)] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em]"
            >
              {dict.common.back}
            </button>
          )}
          <button
            onClick={() => {
              if (stepIndex === STEPS.length - 2) {
                setOrderNumber(`DO-${Math.floor(100000 + Math.random() * 900000)}`);
                clear();
              }
              setStepIndex((i) => i + 1);
            }}
            className="focus-ring flex-1 bg-[var(--color-ink)] py-3 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-terracotta)]"
          >
            {stepIndex === STEPS.length - 2 ? dict.checkout.placeOrder : dict.common.continue}
          </button>
        </div>
      </div>

      {/* Order summary */}
      <div className="h-fit border border-[var(--color-line)] p-6">
        <h2 className="mb-4 font-serif text-lg">{dict.checkout.orderSummary}</h2>
        <ul className="space-y-4">
          {lines.map((line) => {
            const product = getProductBySlug(line.productSlug);
            if (!product) return null;
            return (
              <li key={line.lineId} className="flex gap-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-[var(--color-cream)]">
                  <Media seed={product.images[0]} alt={product.name[locale]} sizes="56px" />
                </div>
                <div className="flex flex-1 items-center justify-between text-sm">
                  <span>
                    {product.name[locale]} × {line.quantity}
                  </span>
                  <span>{formatPrice(cartLineTotal(line, addOnPrices), locale)}</span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 space-y-2 border-t border-[var(--color-line)] pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--color-ink)]/60">{dict.cart.subtotal}</span>
            <span>{formatPrice(subtotal, locale)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-ink)]/60">{dict.cart.delivery}</span>
            <span>{deliveryFee === 0 ? "—" : formatPrice(deliveryFee, locale)}</span>
          </div>
          <div className="flex justify-between border-t border-[var(--color-line)] pt-2 text-base font-medium">
            <span>{dict.cart.total}</span>
            <span>{formatPrice(total, locale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{label}</span>
      <input type={type} className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm" />
    </label>
  );
}
