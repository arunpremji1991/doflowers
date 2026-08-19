type MonogramProps = {
  className?: string;
  tone?: "terracotta" | "cream" | "ink" | "white";
  style?: React.CSSProperties;
};

const toneMap: Record<NonNullable<MonogramProps["tone"]>, string> = {
  terracotta: "var(--color-terracotta)",
  cream: "var(--color-blush)",
  ink: "var(--color-ink)",
  white: "var(--color-white)",
};

/**
 * The DO interlocking petal monogram — two mirrored petal strokes forming a
 * flower / infinity form, matching the mark shown in the supplied brand pattern.
 */
export function Monogram({ className, tone = "terracotta", style }: MonogramProps) {
  const color = toneMap[tone];
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M32 32C32 20 24 12 14 12C14 20 20 26 28 27.5C20 29 14 35 14 43C24 43 32 35 32 32Z"
        fill={color}
      />
      <path
        d="M32 32C32 44 40 52 50 52C50 44 44 38 36 36.5C44 35 50 29 50 21C40 21 32 29 32 32Z"
        fill={color}
      />
    </svg>
  );
}
