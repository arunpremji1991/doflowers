import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/layout/StaticPage";
import { FaqAccordion } from "@/components/layout/FaqAccordion";

const copy = {
  en: [
    { q: "How far in advance should I order?", a: "For most flowers and chocolates, same-day delivery is available if ordered before 3pm. For preserved flowers, personalised gifts and large hampers, we recommend ordering at least 24 hours ahead." },
    { q: "Can I schedule delivery for a specific date?", a: "Yes — select your preferred delivery date and time slot on the product page or at checkout." },
    { q: "Do you deliver outside Muscat?", a: "We currently deliver across Muscat with select delivery to other governorates. Availability is shown at checkout based on your address." },
    { q: "Can I include a gift message?", a: "Yes, every order includes a complimentary gift message card — add your message on the product page or during checkout." },
    { q: "What if the recipient isn't home?", a: "Our delivery team will contact the recipient directly to coordinate a suitable time within the selected window." },
    { q: "Do you cater for corporate or bulk orders?", a: "Yes — visit our Corporate Gifts collection or contact us directly for bulk pricing and custom branding." },
  ],
  ar: [
    { q: "قبل متى يجب أن أطلب؟", a: "لمعظم الورد والشوكولاتة، التوصيل في نفس اليوم متاح إذا تم الطلب قبل الساعة 3 عصرًا. للورد المحفوظ والهدايا المُخصّصة والهامبرات الكبيرة، نوصي بالطلب قبل 24 ساعة على الأقل." },
    { q: "هل يمكنني جدولة التوصيل ليوم مُحدّد؟", a: "نعم — اختاري تاريخ ووقت التوصيل المُفضّل في صفحة المنتج أو عند إتمام الشراء." },
    { q: "هل توصّلون خارج مسقط؟", a: "نوصّل حاليًا داخل مسقط مع إمكانية التوصيل لمحافظات مختارة أخرى. يظهر التوفر عند إتمام الشراء بناءً على عنوانك." },
    { q: "هل يمكنني إضافة رسالة إهداء؟", a: "نعم، كل طلب يتضمن بطاقة رسالة إهداء مجانية — أضيفي رسالتك في صفحة المنتج أو أثناء إتمام الشراء." },
    { q: "ماذا لو لم يكن المُستلم متواجدًا؟", a: "سيتواصل فريق التوصيل مباشرة مع المُستلم لتنسيق وقت مناسب ضمن الفترة المُختارة." },
    { q: "هل تقدّمون خدمات للشركات أو الطلبات بالجملة؟", a: "نعم — تصفّحي مجموعة هدايا الشركات أو تواصلي معنا مباشرة للأسعار الخاصة بالجملة والتخصيص." },
  ],
};

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <StaticPage locale={locale} title={dict.footer.faq} breadcrumbLabel={dict.footer.faq}>
      <FaqAccordion items={copy[locale]} />
    </StaticPage>
  );
}
