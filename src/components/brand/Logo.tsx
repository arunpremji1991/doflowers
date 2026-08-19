import { Monogram } from "./Monogram";
import { resolveImage } from "@/lib/media";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "full" | "compact" | "icon";
  tone?: "terracotta" | "cream" | "ink" | "white";
  className?: string;
  subtitle?: string;
};

export function Logo({ variant = "compact", tone = "ink", className, subtitle = "Chocolates & Flowers" }: LogoProps) {
  const isOnDark = tone === "white" || tone === "cream";
  const textTone = isOnDark ? "text-[var(--color-blush)]" : "text-[var(--color-ink)]";

  if (variant === "icon") {
    const uploaded = resolveImage(isOnDark ? "logo-icon-light" : "logo-icon");
    if (uploaded) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={uploaded} alt="DO" className={className ?? "h-8 w-auto"} />;
    }
    return <Monogram tone={tone} className={cn("h-8 w-8", className)} />;
  }

  const uploadedLockup = resolveImage(isOnDark ? "logo-full-light" : "logo-full");
  if (uploadedLockup) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={uploadedLockup} alt="DO Chocolates & Flowers" className={className ?? "h-9 w-auto"} />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram tone="terracotta" className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-serif text-2xl tracking-tight", textTone)}>DO</span>
        {variant === "full" && (
          <span className={cn("mt-1 text-[9px] font-medium uppercase tracking-[0.28em]", textTone, "opacity-70")}>
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
