"use client";

import { useState } from "react";
import { Media } from "@/components/brand/Media";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {images.length > 1 && (
        <div className="flex gap-2 sm:flex-col">
          {images.map((seed, i) => (
            <button
              key={seed}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-16 w-14 shrink-0 overflow-hidden border sm:h-20 sm:w-16",
                active === i ? "border-[var(--color-terracotta)]" : "border-transparent"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Media seed={seed} alt={`${alt} ${i + 1}`} sizes="64px" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-[var(--color-cream)]">
        <Media seed={images[active]} alt={alt} priority sizes="(min-width: 1024px) 45vw, 100vw" />
      </div>
    </div>
  );
}
