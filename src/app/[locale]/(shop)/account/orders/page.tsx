import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container-luxe py-10">
      <Breadcrumb locale={locale} items={[{ label: dict.account.title, href: "/account" }, { label: dict.account.orders }]} />
      <h1 className="mb-8 font-serif text-[32px]">{dict.account.orders}</h1>
      <p className="text-sm text-[var(--color-ink)]/60">{dict.account.noOrders}</p>
    </div>
  );
}
