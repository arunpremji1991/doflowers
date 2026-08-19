"use client";

import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function NewsletterForm({ dict, tone = "dark" }: { dict: Dictionary; tone?: "dark" | "light" }) {
  const [submitted, setSubmitted] = useState(false);
  const textColor = tone === "dark" ? "text-[var(--color-blush)]" : "text-[var(--color-ink)]";
  const borderColor = tone === "dark" ? "border-[var(--color-blush)]/50" : "border-[var(--color-ink)]/30";
  const placeholderColor = tone === "dark" ? "placeholder:text-[var(--color-blush)]/60" : "placeholder:text-[var(--color-ink)]/40";

  if (submitted) {
    return <p className={cn("text-sm", textColor)}>{dict.home.newsletterCta} ✓</p>;
  }

  return (
    <form
      className="flex max-w-sm gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder={dict.home.newsletterPlaceholder}
        className={cn("focus-ring w-full border-b bg-transparent px-1 py-2 text-sm", borderColor, textColor, placeholderColor)}
      />
      <button
        type="submit"
        className={cn(
          "focus-ring shrink-0 whitespace-nowrap border-b px-1 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors",
          borderColor,
          textColor,
          tone === "dark" ? "hover:text-white" : "hover:text-[var(--color-terracotta)]"
        )}
      >
        {dict.home.newsletterCta}
      </button>
    </form>
  );
}
