"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { otherLocale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const target = otherLocale(locale);

  function switchLocale() {
    const rest = pathname.replace(/^\/(en|ar)/, "") || "/";
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000`;
    router.push(`/${target}${rest === "/" ? "" : rest}`);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className="focus-ring flex h-9 items-center px-2 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink)] transition-colors hover:text-[var(--color-terracotta)]"
      aria-label="Switch language"
    >
      {target === "ar" ? "AR" : "EN"}
    </button>
  );
}
