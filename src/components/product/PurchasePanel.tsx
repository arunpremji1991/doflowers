"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/lib/types";
import { addOns as allAddOns } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

const TIME_SLOTS = ["09:00–12:00", "12:00–15:00", "15:00–18:00", "18:00–21:00"];

export function PurchasePanel({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.optionGroups?.forEach((g) => (initial[g.id] = g.options[0].id));
    return initial;
  });
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(TIME_SLOTS[0]);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const addLine = useCartStore((s) => s.addLine);
  const hasWishlisted = useWishlistStore((s) => s.has(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const productAddOns = allAddOns.filter((a) => product.addOnIds?.includes(a.id));

  const unitPrice = useMemo(() => {
    let price = product.price;
    product.optionGroups?.forEach((g) => {
      const chosen = g.options.find((o) => o.id === selectedOptions[g.id]);
      if (chosen) price += chosen.priceDelta;
    });
    return price;
  }, [product, selectedOptions]);

  const addOnsTotal = selectedAddOns.reduce((sum, id) => sum + (allAddOns.find((a) => a.id === id)?.price ?? 0), 0);
  const total = (unitPrice + addOnsTotal) * quantity;

  const today = new Date().toISOString().split("T")[0];

  function handleAddToCart() {
    addLine({
      productSlug: product.slug,
      quantity,
      selectedOptions: Object.fromEntries(
        Object.entries(selectedOptions).map(([groupId, optId]) => {
          const group = product.optionGroups?.find((g) => g.id === groupId);
          const opt = group?.options.find((o) => o.id === optId);
          return [groupId, opt ? opt.label[locale] : optId];
        })
      ),
      addOnIds: selectedAddOns,
      unitPrice,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-terracotta)]">{product.subtitle[locale]}</p>
      <h1 className="mt-2 font-serif text-[32px] leading-tight sm:text-[38px]">{product.name[locale]}</h1>
      <div className="mt-3 flex items-center gap-2">
        {product.badges.map((b) => (
          <span key={b} className="bg-[var(--color-blush)]/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-terracotta-dark)]">
            {dict.badges[b]}
          </span>
        ))}
      </div>
      <p className="mt-4 text-2xl font-medium text-[var(--color-terracotta)]">{formatPrice(unitPrice, locale)}</p>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-ink)]/70">{product.description[locale]}</p>

      {/* Option groups */}
      {product.optionGroups?.map((group) => (
        <div key={group.id} className="mt-6">
          <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/60">{group.label[locale]}</p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOptions((s) => ({ ...s, [group.id]: opt.id }))}
                className={cn(
                  "border px-4 py-2 text-sm transition-colors",
                  selectedOptions[group.id] === opt.id
                    ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)] text-white"
                    : "border-[var(--color-line)] hover:border-[var(--color-terracotta)]"
                )}
              >
                {opt.label[locale]}
                {opt.priceDelta !== 0 && ` (${opt.priceDelta > 0 ? "+" : ""}${opt.priceDelta})`}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div className="mt-6">
        <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/60">{dict.product.quantity}</p>
        <div className="flex w-fit items-center border border-[var(--color-line)]">
          <button className="focus-ring h-10 w-10" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="-">
            −
          </button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <button className="focus-ring h-10 w-10" onClick={() => setQuantity((q) => q + 1)} aria-label="+">
            +
          </button>
        </div>
      </div>

      {/* Add to cart / wishlist */}
      <div className="mt-7 flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={cn(
            "btn-textured flex-1 bg-[var(--color-ink)] py-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-terracotta)]",
            !product.inStock && "cursor-not-allowed opacity-50"
          )}
        >
          {justAdded ? dict.cart.itemAdded : product.inStock ? `${dict.product.addToCart} — ${formatPrice(total, locale)}` : dict.product.outOfStock}
        </button>
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label={hasWishlisted ? dict.product.wishlistRemove : dict.product.wishlistAdd}
          className="focus-ring flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-[var(--color-line)] transition-colors hover:border-[var(--color-terracotta)]"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill={hasWishlisted ? "var(--color-terracotta)" : "none"}>
            <path
              d="M9 15.5S1.75 11.2 1.75 6.3C1.75 3.9 3.6 2 6 2c1.3 0 2.4.6 3 1.6C9.6 2.6 10.7 2 12 2c2.4 0 4.25 1.9 4.25 4.3 0 4.9-7.25 9.2-7.25 9.2Z"
              stroke={hasWishlisted ? "var(--color-terracotta)" : "currentColor"}
              strokeWidth="1.3"
            />
          </svg>
        </button>
      </div>

      {/* Add-ons */}
      {productAddOns.length > 0 && (
        <div className="mt-8 border-t border-[var(--color-line)] pt-6">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/60">{dict.product.addOns}</p>
          <div className="space-y-2.5">
            {productAddOns.map((addOn) => (
              <label key={addOn.id} className="flex cursor-pointer items-center justify-between text-sm">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() =>
                      setSelectedAddOns((s) => (s.includes(addOn.id) ? s.filter((id) => id !== addOn.id) : [...s, addOn.id]))
                    }
                    className="h-4 w-4 accent-[var(--color-terracotta)]"
                  />
                  {addOn.name[locale]}
                </span>
                <span className="text-[var(--color-ink)]/60">+{formatPrice(addOn.price, locale)}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Delivery */}
      <div className="mt-8 border-t border-[var(--color-line)] pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/60">{dict.product.delivery}</p>
        {product.sameDayDelivery && (
          <p className="mb-3 flex items-center gap-1.5 text-xs text-[var(--color-terracotta)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-terracotta)]" />
            {dict.product.sameDayAvailable}
          </p>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.deliveryDate}</span>
            <input
              type="date"
              min={today}
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.deliveryTime}</span>
            <select
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm"
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="mt-3 block">
          <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.deliveryLocation}</span>
          <input
            type="text"
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder={dict.product.selectLocation}
            className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm"
          />
        </label>
      </div>

      {/* Gifting */}
      <div className="mt-8 border-t border-[var(--color-line)] pt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/60">{dict.product.gifting}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.recipientName}</span>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.senderName}</span>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm"
            />
          </label>
        </div>
        <label className="mt-3 block">
          <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.giftMessage}</span>
          <textarea
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder={dict.product.giftMessagePlaceholder}
            rows={3}
            maxLength={240}
            className="focus-ring w-full resize-none border border-[var(--color-line)] px-3 py-2.5 text-sm"
          />
        </label>
        <label className="mt-3 block">
          <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{dict.product.specialInstructions}</span>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm"
          />
        </label>
      </div>
    </div>
  );
}
