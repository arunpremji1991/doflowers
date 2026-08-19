import { cn } from "@/lib/utils";
import { resolveImage } from "@/lib/media";

type PatternProps = {
  className?: string;
  opacity?: number;
  tone?: "terracotta" | "cream" | "ink";
  tileSize?: number;
};

const toneMap: Record<NonNullable<PatternProps["tone"]>, string> = {
  terracotta: "var(--color-terracotta)",
  cream: "var(--color-blush)",
  ink: "var(--color-ink)",
};

const rasterTileSeed: Partial<Record<NonNullable<PatternProps["tone"]>, string>> = {
  terracotta: "pattern-tile",
  cream: "pattern-tile-light",
};

/**
 * The DO badge motif — the interlocking knot mark repeated as a quatrefoil
 * badge, used as a subtle brand-signature texture per the supplied pattern sheet.
 * Uses the real cropped artwork when available (public/uploads/images/pattern-tile*.png),
 * falling back to a hand-drawn approximation otherwise.
 */
export function PatternBackground({ className, opacity = 0.06, tone = "terracotta", tileSize = 120 }: PatternProps) {
  const rasterSrc = rasterTileSeed[tone] ? resolveImage(rasterTileSeed[tone]!) : null;

  if (rasterSrc) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
        style={{
          opacity,
          backgroundImage: `url(${rasterSrc})`,
          backgroundRepeat: "repeat",
          backgroundSize: `${tileSize}px ${tileSize}px`,
        }}
        aria-hidden="true"
      />
    );
  }

  const color = toneMap[tone];
  const id = `do-pattern-${tone}`;
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width={tileSize} height={tileSize} patternUnits="userSpaceOnUse">
          <g transform={`translate(${tileSize / 2}, ${tileSize / 2}) scale(${tileSize / 160})`}>
            <path
              d="M0 -40C-14 -40 -24 -28 -24 -14C-24 -20 -18 -25 -10 -26.5C-18 -28 -24 -33 -24 -39C-24 -46 -14 -52 0 -52Z"
              fill={color}
              transform="translate(0,40) rotate(0)"
            />
            <g transform="rotate(90)">
              <path d="M0 -40C-14 -40 -24 -28 -24 -14C-24 -20 -18 -25 -10 -26.5C-18 -28 -24 -33 -24 -39C-24 -46 -14 -52 0 -52Z" fill={color} transform="translate(0,40)" />
            </g>
            <g transform="rotate(180)">
              <path d="M0 -40C-14 -40 -24 -28 -24 -14C-24 -20 -18 -25 -10 -26.5C-18 -28 -24 -33 -24 -39C-24 -46 -14 -52 0 -52Z" fill={color} transform="translate(0,40)" />
            </g>
            <g transform="rotate(270)">
              <path d="M0 -40C-14 -40 -24 -28 -24 -14C-24 -20 -18 -25 -10 -26.5C-18 -28 -24 -33 -24 -39C-24 -46 -14 -52 0 -52Z" fill={color} transform="translate(0,40)" />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
