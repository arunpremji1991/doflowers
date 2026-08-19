"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="focus-ring flex w-full items-center justify-between py-5 text-start font-serif text-lg"
          >
            {item.q}
            <span className={cn("shrink-0 transition-transform", openIndex === i && "rotate-45")}>+</span>
          </button>
          {openIndex === i && <p className="pb-5 text-sm leading-relaxed text-[var(--color-ink)]/65">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
