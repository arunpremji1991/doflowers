import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/layout/StaticPage";

const copy = {
  en: [
    "DO Chocolates & Flowers collects the information you provide when placing an order — name, contact details, delivery address and payment information — solely to fulfil and deliver your order.",
    "Recipient details (name, address, phone number) are used only for delivery coordination and are never used for marketing without consent.",
    "We do not sell or share your personal information with third parties, except delivery partners strictly necessary to complete your order.",
    "You may request access to, correction of, or deletion of your personal data at any time by contacting us.",
  ],
  ar: [
    "تجمع دو للشوكولاتة والورد المعلومات التي تُقدّمينها عند إتمام الطلب — الاسم وبيانات التواصل وعنوان التوصيل ومعلومات الدفع — لغرض تنفيذ وتوصيل طلبك فقط.",
    "تُستخدم بيانات المُستلم (الاسم والعنوان ورقم الهاتف) فقط لتنسيق التوصيل، ولا تُستخدم أبدًا للتسويق دون موافقة.",
    "لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة، باستثناء شركاء التوصيل الضروريين لإتمام طلبك.",
    "يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت بالتواصل معنا.",
  ],
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <StaticPage locale={locale} title={dict.footer.privacy} breadcrumbLabel={dict.footer.privacy}>
      {copy[locale].map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </StaticPage>
  );
}
