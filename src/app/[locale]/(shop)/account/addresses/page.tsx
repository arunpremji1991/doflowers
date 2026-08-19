import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default async function AddressesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container-luxe py-10">
      <Breadcrumb locale={locale} items={[{ label: dict.account.title, href: "/account" }, { label: dict.account.addresses }]} />
      <h1 className="mb-8 font-serif text-[32px]">{dict.account.addresses}</h1>
      <button className="focus-ring border border-[var(--color-ink)] px-6 py-3 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:bg-[var(--color-ink)] hover:text-white">
        + {dict.checkout.address}
      </button>
    </div>
  );
}
