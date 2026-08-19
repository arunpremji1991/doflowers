import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container-luxe py-10">
      <h1 className="mb-8 font-serif text-[32px]">{dict.checkout.title}</h1>
      <CheckoutFlow locale={locale} dict={dict} />
    </div>
  );
}
