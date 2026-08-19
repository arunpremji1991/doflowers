import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Monogram } from "@/components/brand/Monogram";
import { PatternBackground } from "@/components/brand/Pattern";

export function BrandStory({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-blush)]/40 py-20 sm:py-28">
      <PatternBackground tone="terracotta" opacity={0.07} tileSize={140} />
      <div className="container-luxe relative flex flex-col items-center text-center">
        <Monogram tone="terracotta" className="mb-6 h-10 w-10" />
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-terracotta)]">{dict.home.storyTitle}</p>
        <h2 className="max-w-xl font-serif text-[28px] leading-snug sm:text-[36px]">{dict.home.storyBody}</h2>
        <Link
          href={`/${locale}/about`}
          className="focus-ring mt-8 border-b border-[var(--color-ink)]/30 pb-0.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
        >
          {dict.home.storyCta}
        </Link>
      </div>
    </section>
  );
}
