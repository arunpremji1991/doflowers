/**
 * A faint, fixed brand flourish behind the entire site — a quiet watermark,
 * not a repeating texture, so it stays light rather than busy.
 */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/uploads/brand/flourish-band.svg"
        alt=""
        className="absolute -bottom-24 start-1/2 w-[1400px] max-w-none -translate-x-1/2 opacity-[0.05] rtl:translate-x-1/2"
      />
    </div>
  );
}
