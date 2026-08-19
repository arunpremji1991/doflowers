import Link from "next/link";
import type { Locale } from "@/i18n/config";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  cta,
  href,
  locale,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: string;
  href?: string;
  locale?: Locale;
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-terracotta)]">{eyebrow}</p>}
        <h2 className="font-serif text-[28px] leading-tight sm:text-[34px]">{title}</h2>
        {subtitle && <p className="mt-2 max-w-md text-sm text-[var(--color-ink)]/60">{subtitle}</p>}
      </div>
      {cta && href && locale && (
        <Link
          href={`/${locale}${href}`}
          className="focus-ring shrink-0 border-b border-[var(--color-ink)]/30 pb-0.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-ink)] transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
        >
          {cta}
        </Link>
      )}
    </div>
  );
}
