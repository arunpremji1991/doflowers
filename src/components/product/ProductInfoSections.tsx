"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-line)]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="focus-ring flex w-full items-center justify-between py-4 text-start text-sm font-medium uppercase tracking-[0.1em]"
      >
        {title}
        <span className={cn("transition-transform", open && "rotate-45")}>+</span>
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-[var(--color-ink)]/70">{children}</div>}
    </div>
  );
}

export function ProductInfoSections({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const facts: { label: string; value: string }[] = [];
  if (product.stems) facts.push({ label: dict.product.stems, value: String(product.stems) });
  if (product.pieces) facts.push({ label: dict.product.pieces, value: String(product.pieces) });
  if (product.weight) facts.push({ label: dict.product.weight, value: product.weight[locale] });
  if (product.freshness) facts.push({ label: dict.product.freshness, value: product.freshness[locale] });
  if (product.storage) facts.push({ label: dict.product.storage, value: product.storage[locale] });

  return (
    <div className="mt-4">
      {(product.details?.length || facts.length > 0) && (
        <AccordionItem title={dict.product.details} defaultOpen>
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="flex justify-between border-b border-dashed border-[var(--color-line)] py-1.5 sm:justify-start sm:gap-3">
                <dt className="text-[var(--color-ink)]/50">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {product.details?.map((d) => (
              <div key={d.label.en} className="flex justify-between border-b border-dashed border-[var(--color-line)] py-1.5 sm:justify-start sm:gap-3">
                <dt className="text-[var(--color-ink)]/50">{d.label[locale]}</dt>
                <dd>{d.value[locale]}</dd>
              </div>
            ))}
          </dl>
        </AccordionItem>
      )}

      {product.whatsIncluded && (
        <AccordionItem title={dict.product.whatsIncluded}>
          <ul className="list-inside list-disc space-y-1">
            {product.whatsIncluded.map((item) => (
              <li key={item.en}>{item[locale]}</li>
            ))}
          </ul>
        </AccordionItem>
      )}

      {(product.ingredients || product.allergens) && (
        <AccordionItem title={dict.product.ingredients}>
          {product.ingredients && <p className="mb-2">{product.ingredients[locale]}</p>}
          {product.allergens && <p className="font-medium text-[var(--color-terracotta-dark)]">{product.allergens[locale]}</p>}
        </AccordionItem>
      )}
    </div>
  );
}
