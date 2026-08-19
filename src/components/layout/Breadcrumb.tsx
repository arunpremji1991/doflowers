import Link from "next/link";
import type { Locale } from "@/i18n/config";

export function Breadcrumb({ locale, items }: { locale: Locale; items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-[var(--color-ink)]/50">
      <Link href={`/${locale}`} className="focus-ring hover:text-[var(--color-terracotta)]">
        {locale === "ar" ? "الرئيسية" : "Home"}
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link href={`/${locale}${item.href}`} className="focus-ring hover:text-[var(--color-terracotta)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--color-ink)]/75">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
