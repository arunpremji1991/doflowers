import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { Media } from "@/components/brand/Media";
import { occasions } from "@/lib/data";

const FEATURED = ["birthday", "anniversary", "love", "congratulations", "thank-you", "just-because"];

export function OccasionGrid({ locale }: { locale: Locale }) {
  const list = occasions.filter((o) => FEATURED.includes(o.slug));
  return (
    <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-6">
      {list.map((o) => (
        <Link
          key={o.slug}
          href={`/${locale}/occasion/${o.slug}`}
          className="focus-ring group relative block aspect-square w-32 shrink-0 snap-start overflow-hidden rounded-full sm:w-auto"
        >
          <Media seed={`occ-${o.slug}`} alt={o.name[locale]} className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-ink)]/25 p-2 text-center">
            <span className="font-serif text-sm text-white sm:text-base">{o.name[locale]}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
