import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/layout/StaticPage";

const copy = {
  en: {
    areas: { title: "Delivery Areas", body: "We deliver across Muscat Governorate, with select delivery available to Barka, Nizwa and Sohar. Full coverage is confirmed at checkout based on your address." },
    times: { title: "Delivery Windows", body: "Choose from four delivery windows: 9am–12pm, 12pm–3pm, 3pm–6pm and 6pm–9pm. Same-day delivery is available on select products when ordered before 3pm." },
    fees: { title: "Delivery Fees", body: "Delivery is complimentary on orders over OMR 30. A flat fee of OMR 2 applies to orders below that." },
    care: { title: "Care Instructions", body: "Fresh flowers should be kept away from direct sunlight and heat, with water changed every 2 days for the longest-lasting arrangement. Chocolates should be stored below 20°C." },
  },
  ar: {
    areas: { title: "مناطق التوصيل", body: "نوصّل داخل محافظة مسقط، مع توصيل مُتاح لمناطق مختارة في بركاء ونزوى وصحار. يتم تأكيد التغطية الكاملة عند إتمام الشراء بناءً على عنوانك." },
    times: { title: "فترات التوصيل", body: "اختاري من بين أربع فترات توصيل: 9 صباحًا-12 ظهرًا، 12-3 عصرًا، 3-6 عصرًا، و6-9 مساءً. التوصيل في نفس اليوم متاح لمنتجات مختارة عند الطلب قبل الساعة 3 عصرًا." },
    fees: { title: "رسوم التوصيل", body: "التوصيل مجاني للطلبات التي تتجاوز 30 ر.ع. تُطبّق رسوم ثابتة قدرها 2 ر.ع. على الطلبات الأقل من ذلك." },
    care: { title: "تعليمات العناية", body: "يُفضّل إبقاء الورد الطازج بعيدًا عن أشعة الشمس المباشرة والحرارة، مع تغيير الماء كل يومين لإطالة عمر التنسيقة. يُحفظ الشوكولاتة في درجة حرارة أقل من 20° مئوية." },
  },
};

export default async function DeliveryInfoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const sections = Object.values(copy[locale]);

  return (
    <StaticPage locale={locale} title={dict.footer.deliveryInfo} breadcrumbLabel={dict.footer.deliveryInfo}>
      {sections.map((s) => (
        <div key={s.title}>
          <h2 className="mb-1.5 font-serif text-xl text-[var(--color-ink)]">{s.title}</h2>
          <p>{s.body}</p>
        </div>
      ))}
    </StaticPage>
  );
}
