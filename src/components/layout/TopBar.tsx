import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    { icon: TruckIcon, label: dict.topbar.expressDelivery },
    { icon: ShieldIcon, label: dict.topbar.qualityPromise },
    { icon: GiftIcon, label: dict.topbar.premiumGifts },
  ];

  return (
    <div className="hidden border-b border-[var(--color-line)] bg-[var(--color-blush)]/25 sm:block">
      <div className="container-luxe flex h-10 items-center justify-between text-[13px]">
        <ul className="flex items-center gap-6">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-1.5 text-[var(--color-ink)]/75">
              <item.icon />
              {item.label}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[var(--color-ink)]/75">
            {dict.topbar.deliveryTo}
            <span className="font-medium text-[var(--color-ink)]">{dict.topbar.city}</span>
          </span>
          <span className="h-3 w-px bg-[var(--color-line)]" aria-hidden="true" />
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 4h7v6.5h-7z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M8.5 6.5h2.8L13.5 9v1.5h-5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="4" cy="11.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="11" cy="11.5" r="1.3" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5 13.5 3.3V7.3C13.5 10.6 11.2 13 8 14.5C4.8 13 2.5 10.6 2.5 7.3V3.3Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M5.7 8 7.3 9.6 10.3 6.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 6.5h12v7H2z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M2 6.5V4.5h12v2" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M8 4.5v9" stroke="currentColor" strokeWidth="1.1" />
      <path d="M8 4.5C8 2.8 6.8 2 5.7 2C4.8 2 4.2 2.7 4.7 3.6C5.1 4.3 6.3 4.5 8 4.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M8 4.5C8 2.8 9.2 2 10.3 2C11.2 2 11.8 2.7 11.3 3.6C10.9 4.3 9.7 4.5 8 4.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}
