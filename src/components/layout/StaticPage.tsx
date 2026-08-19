import type { Locale } from "@/i18n/config";
import { Breadcrumb } from "./Breadcrumb";

export function StaticPage({
  locale,
  title,
  breadcrumbLabel,
  children,
}: {
  locale: Locale;
  title: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-luxe max-w-3xl py-10 sm:py-14">
      <Breadcrumb locale={locale} items={[{ label: breadcrumbLabel }]} />
      <h1 className="mb-8 font-serif text-[32px] sm:text-[40px]">{title}</h1>
      <div className="space-y-5 text-[15px] leading-relaxed text-[var(--color-ink)]/75">{children}</div>
    </div>
  );
}
