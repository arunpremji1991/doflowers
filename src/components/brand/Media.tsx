import Image from "next/image";
import { resolveImage } from "@/lib/media";
import { Monogram } from "./Monogram";
import { cn } from "@/lib/utils";

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

const GRADIENTS = [
  ["#F3DEC5", "#C98356"],
  ["#EAD3BE", "#A8582F"],
  ["#F6E7D8", "#B96A3C"],
  ["#E9D2C2", "#8B4526"],
  ["#F1DFCB", "#C4713F"],
];

type MediaProps = {
  seed: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a real uploaded photo when one exists at public/uploads/images/{seed}.*,
 * otherwise an elegant on-brand placeholder tile — so real photography can be
 * dropped in later with zero code changes. See public/uploads/README.md.
 */
export function Media({ seed, alt, className, sizes, priority }: MediaProps) {
  const src = resolveImage(seed);
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const hash = hashSeed(seed);
  const [from, to] = GRADIENTS[hash % GRADIENTS.length];
  const rotate = (hash % 5) - 2;
  const icon = resolveImage("logo-icon-light");

  return (
    <div
      className={cn("relative flex h-full w-full items-center justify-center overflow-hidden", className)}
      style={{ background: `linear-gradient(${135 + (hash % 60)}deg, ${from}, ${to})` }}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/uploads/brand/pattern-monogram.svg)",
          backgroundRepeat: "repeat",
          backgroundSize: "220px 110px",
          opacity: 0.14,
        }}
        aria-hidden="true"
      />
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          className="h-10 w-10 object-contain opacity-70"
          style={{ transform: `rotate(${rotate}deg)` }}
        />
      ) : (
        <Monogram tone="cream" className="h-10 w-10 opacity-70" style={{ transform: `rotate(${rotate}deg)` }} />
      )}
    </div>
  );
}
