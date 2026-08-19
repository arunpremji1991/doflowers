import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="container-luxe py-10">
      <Breadcrumb locale={locale} items={[{ label: dict.account.title }]} />
      <h1 className="mb-10 font-serif text-[32px]">{dict.account.title}</h1>

      <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
        <div>
          <h2 className="mb-5 font-serif text-xl">{dict.account.login}</h2>
          <form className="space-y-4">
            <Field label={dict.account.email} type="email" />
            <Field label={dict.account.password} type="password" />
            <button
              type="submit"
              className="focus-ring w-full bg-[var(--color-ink)] py-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--color-terracotta)]"
            >
              {dict.account.login}
            </button>
          </form>
        </div>

        <div>
          <h2 className="mb-5 font-serif text-xl">{dict.account.register}</h2>
          <form className="space-y-4">
            <Field label={dict.checkout.fullName} />
            <Field label={dict.account.email} type="email" />
            <Field label={dict.account.password} type="password" />
            <button
              type="submit"
              className="focus-ring w-full border border-[var(--color-ink)] py-3.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
            >
              {dict.account.register}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-16 grid gap-4 border-t border-[var(--color-line)] pt-10 sm:grid-cols-4">
        {[
          { label: dict.account.orders, href: "/account/orders" },
          { label: dict.account.addresses, href: "/account/addresses" },
          { label: dict.wishlist.title, href: "/wishlist" },
          { label: dict.account.trackOrder, href: "/track" },
        ].map((item) => (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className="focus-ring border border-[var(--color-line)] px-5 py-4 text-sm transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-[var(--color-ink)]/55">{label}</span>
      <input type={type} className="focus-ring w-full border border-[var(--color-line)] px-3 py-2.5 text-sm" />
    </label>
  );
}
