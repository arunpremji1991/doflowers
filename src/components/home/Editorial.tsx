import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { Media } from "@/components/brand/Media";
import { cn } from "@/lib/utils";

export function Editorial({
  seed,
  eyebrow,
  title,
  body,
  cta,
  href,
  locale,
  reverse,
}: {
  seed: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  locale: Locale;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-0 md:grid-cols-2">
      <div className={cn("relative aspect-[4/5] md:aspect-[3/4]", reverse && "md:order-2")}>
        <Media seed={seed} alt={title} sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
      <div className={cn("px-6 py-10 md:px-16 md:py-0", reverse && "md:order-1")}>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-terracotta)]">{eyebrow}</p>
        <h2 className="max-w-sm font-serif text-[30px] leading-tight sm:text-[38px]">{title}</h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[var(--color-ink)]/65">{body}</p>
        <Link
          href={`/${locale}${href}`}
          className="focus-ring mt-6 inline-block border-b border-[var(--color-ink)]/30 pb-0.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
