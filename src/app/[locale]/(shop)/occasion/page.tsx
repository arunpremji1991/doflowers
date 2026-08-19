import Link from "next/link";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { occasions } from "@/lib/data";
import { Media } from "@/components/brand/Media";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default async function OccasionIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container-luxe py-10">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.occasions }]} />
      <h1 className="mb-8 font-serif text-[32px] sm:text-[40px]">{dict.nav.occasions}</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {occasions.map((o) => (
          <Link key={o.slug} href={`/${locale}/occasion/${o.slug}`} className="focus-ring group relative block aspect-[4/5] overflow-hidden rounded-2xl">
            <Media seed={`occ-${o.slug}`} alt={o.name[locale]} className="transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4 font-serif text-lg text-white">{o.name[locale]}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
