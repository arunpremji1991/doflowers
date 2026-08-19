import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Media } from "@/components/brand/Media";

export function InstagramStrip({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const tiles = Array.from({ length: 6 }, (_, i) => `instagram-${i + 1}`);
  return (
    <section className="py-16 sm:py-20">
      <div className="container-luxe">
        <p className="mb-6 text-center font-serif text-xl sm:text-2xl">{dict.home.instagram}</p>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:grid-cols-6">
          {tiles.map((seed) => (
            <div key={seed} className="relative aspect-square overflow-hidden">
              <Media seed={seed} alt="Instagram" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
