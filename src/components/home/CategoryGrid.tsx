import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { Media } from "@/components/brand/Media";
import { groupMeta } from "@/lib/data";

export function CategoryGrid({ locale }: { locale: Locale }) {
  const groups = Object.values(groupMeta);
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {groups.map((g) => (
        <Link key={g.slug} href={`/${locale}/${g.slug}`} className="focus-ring group relative block aspect-[3/4] overflow-hidden">
          <Media seed={`group-${g.slug}`} alt={g.name[locale]} className="transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg text-white sm:p-6 sm:text-xl">{g.name[locale]}</span>
        </Link>
      ))}
    </div>
  );
}
