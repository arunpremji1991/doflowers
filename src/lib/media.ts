import { imageManifest, videoManifest } from "./asset-manifest.generated";

/** Returns a real uploaded image path for `seed` if one exists in public/uploads/images, else null. */
export function resolveImage(seed: string): string | null {
  const ext = imageManifest[seed];
  return ext ? `/uploads/images/${seed}.${ext}` : null;
}

/** Returns a real uploaded video path for `seed` if one exists in public/uploads/video, else null. */
export function resolveVideo(seed: string): string | null {
  const ext = videoManifest[seed];
  return ext ? `/uploads/video/${seed}.${ext}` : null;
}
