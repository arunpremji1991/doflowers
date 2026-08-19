import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { WishlistView } from "@/components/product/WishlistView";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default async function WishlistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container-luxe py-10">
      <Breadcrumb locale={locale} items={[{ label: dict.wishlist.title }]} />
      <h1 className="mb-8 font-serif text-[32px]">{dict.wishlist.title}</h1>
      <WishlistView locale={locale} dict={dict} />
    </div>
  );
}
