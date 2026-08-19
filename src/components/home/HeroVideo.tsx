import Image from "next/image";
import { resolveVideo, resolveImage } from "@/lib/media";
import { PatternBackground } from "@/components/brand/Pattern";
import { Monogram } from "@/components/brand/Monogram";

export function HeroVideo() {
  const desktopVideo = resolveVideo("hero");
  const mobileVideo = resolveVideo("hero-mobile") ?? desktopVideo;
  const poster = resolveImage("hero-poster") ?? undefined;

  if (desktopVideo) {
    return (
      <>
        <video
          className="absolute inset-0 hidden h-full w-full object-cover sm:block"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={desktopVideo} type="video/mp4" />
        </video>
        <video
          className="absolute inset-0 h-full w-full object-cover sm:hidden"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={mobileVideo ?? desktopVideo} type="video/mp4" />
        </video>
      </>
    );
  }

  if (poster) {
    return (
      <>
        <Image src={poster} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[var(--color-ink)]/20" />
      </>
    );
  }

  return (
    <div
      className="absolute inset-0 h-full w-full"
      style={{
        background:
          "linear-gradient(160deg, #C4713F 0%, #A8582F 45%, #6E3A22 100%)",
      }}
    >
      <PatternBackground tone="cream" opacity={0.1} tileSize={160} />
      <div className="absolute inset-0 flex items-center justify-center">
        <Monogram tone="cream" className="h-24 w-24 opacity-25 sm:h-40 sm:w-40" />
      </div>
    </div>
  );
}
