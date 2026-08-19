import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const copy = {
  en: {
    intro: "We'd love to hear from you — for orders, corporate gifting, or anything else.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    reach: "Reach us directly",
    phone: "+968 XXXX XXXX",
    mail: "hello@dogifting.om",
    hours: "Daily, 9am – 10pm",
  },
  ar: {
    intro: "يسعدنا تواصلك معنا — للطلبات أو الهدايا المؤسسية أو أي استفسار آخر.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    message: "رسالتك",
    send: "إرسال الرسالة",
    reach: "تواصل معنا مباشرة",
    phone: "+968 XXXX XXXX",
    mail: "hello@dogifting.om",
    hours: "يوميًا، 9 صباحًا – 10 مساءً",
  },
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const c = copy[locale];

  return (
    <div className="container-luxe max-w-4xl py-10 sm:py-14">
      <Breadcrumb locale={locale} items={[{ label: dict.footer.contact }]} />
      <h1 className="mb-3 font-serif text-[32px] sm:text-[40px]">{dict.footer.contact}</h1>
      <p className="mb-10 max-w-md text-[15px] text-[var(--color-ink)]/65">{c.intro}</p>

      <div className="grid gap-12 sm:grid-cols-[1.4fr_1fr]">
        <form className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{c.name}</span>
            <input className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{c.email}</span>
            <input type="email" className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{c.message}</span>
            <textarea rows={5} className="focus-ring w-full resize-none border border-[var(--color-line)] px-3 py-2.5 text-sm" />
          </label>
          <button className="focus-ring bg-[var(--color-ink)] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-terracotta)]">
            {c.send}
          </button>
        </form>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]/50">{c.reach}</p>
          <ul className="space-y-2.5 text-sm">
            <li>{c.phone}</li>
            <li>{c.mail}</li>
            <li>{c.hours}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
