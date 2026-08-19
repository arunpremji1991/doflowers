import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/layout/StaticPage";
import { Media } from "@/components/brand/Media";
import { PatternBackground } from "@/components/brand/Pattern";

const copy = {
  en: {
    p1: "DO began with a simple belief: that a gift should feel considered, not convenient.",
    p2: "We work with flowers sourced for their form and freshness, and chocolate made in small batches, finished by hand. Every arrangement and every box carries the same quiet attention to detail — because what you give says as much as what you say.",
    p3: "Today, DO is a home for thoughtful gifting in Oman — flowers, chocolate, and the moments they're made for.",
    valuesTitle: "What we care about",
    values: [
      { title: "Craft", body: "Every arrangement is made by hand, not assembled." },
      { title: "Freshness", body: "Flowers sourced and cut close to delivery, never left to sit." },
      { title: "Restraint", body: "Considered, not cluttered — in the flowers and in the box." },
    ],
  },
  ar: {
    p1: "بدأت دو من فكرة بسيطة: أن الهدية يجب أن تكون مدروسة، لا سريعة.",
    p2: "نعمل مع ورد يُختار لشكله ونضارته، وشوكولاتة تُصنع بكميات محدودة وتُشطّب يدويًا. كل تنسيقة وكل علبة تحمل نفس العناية الهادئة بالتفاصيل — لأن ما تُهديه يقول عنك بقدر ما تقوله كلماتك.",
    p3: "اليوم، أصبحت دو وجهة للهدايا المدروسة في عُمان — ورد وشوكولاتة، واللحظات التي صُنعت من أجلها.",
    valuesTitle: "ما يهمنا",
    values: [
      { title: "الحرفية", body: "كل تنسيقة تُصنع يدويًا، لا تُجمّع فقط." },
      { title: "النضارة", body: "ورد يُختار ويُقطف قريبًا من موعد التوصيل، لا يُترك لينتظر." },
      { title: "البساطة", body: "مدروسة لا مزدحمة — في الورد وفي العلبة." },
    ],
  },
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const c = copy[locale];

  return (
    <>
      <div className="relative h-64 w-full overflow-hidden sm:h-96">
        <Media seed="about-hero" alt={dict.nav.about} priority sizes="100vw" />
      </div>
      <StaticPage locale={locale} title={dict.nav.about} breadcrumbLabel={dict.nav.about}>
        <p>{c.p1}</p>
        <p>{c.p2}</p>
        <p>{c.p3}</p>
      </StaticPage>
      <section className="relative overflow-hidden bg-[var(--color-blush)]/40 py-16">
        <PatternBackground tone="terracotta" opacity={0.06} />
        <div className="container-luxe relative max-w-3xl">
          <h2 className="mb-8 font-serif text-2xl">{c.valuesTitle}</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {c.values.map((v) => (
              <div key={v.title}>
                <h3 className="mb-2 font-serif text-lg">{v.title}</h3>
                <p className="text-sm text-[var(--color-ink)]/65">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
