import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/layout/StaticPage";

const copy = {
  en: [
    "By placing an order with DO Chocolates & Flowers, you agree to the following terms.",
    "Product images are representative; natural variation in flowers and handmade chocolate is expected and not grounds for return.",
    "Orders are confirmed once payment is received. Cancellations are accepted up to 4 hours before the scheduled delivery window.",
    "Delivery times are estimates. DO is not liable for delays caused by incorrect address information or recipient unavailability.",
    "Prices are listed in Omani Rial (OMR) and are inclusive of applicable taxes unless stated otherwise.",
  ],
  ar: [
    "بإتمام طلبك مع دو للشوكولاتة والورد، فإنك توافق على الشروط التالية.",
    "صور المنتجات تمثيلية؛ التفاوت الطبيعي في الورد والشوكولاتة المصنوعة يدويًا متوقّع وليس سببًا للإرجاع.",
    "يتم تأكيد الطلبات فور استلام الدفع. يُقبل الإلغاء حتى 4 ساعات قبل فترة التوصيل المُحدّدة.",
    "أوقات التوصيل تقديرية. لا تتحمّل دو مسؤولية التأخير الناتج عن معلومات عنوان غير صحيحة أو عدم توفر المُستلم.",
    "الأسعار مُدرجة بالريال العُماني (ر.ع.) وتشمل الضرائب المُطبّقة ما لم يُذكر خلاف ذلك.",
  ],
};

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <StaticPage locale={locale} title={dict.footer.terms} breadcrumbLabel={dict.footer.terms}>
      {copy[locale].map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </StaticPage>
  );
}
