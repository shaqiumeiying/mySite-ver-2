"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Columns2,
  Glasses,
  Smartphone,
} from "lucide-react";
import type { PairedGalleryPage } from "@/data/types";

type Platform = "vr" | "mobile";
type ViewMode = Platform | "side";

type PairedPlatformGalleryProps = {
  pages: PairedGalleryPage[];
};

const PLATFORM_ICON: Record<Platform, typeof Glasses> = {
  vr: Glasses,
  mobile: Smartphone,
};

const PLATFORM_LABEL: Record<Platform, string> = {
  vr: "VR",
  mobile: "Mobile",
};

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)$/i.test(src);

function DemoMedia({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  if (isVideoSrc(src)) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }
  return <img src={src} alt={alt} className={className} />;
}

/**
 * Cheap CSS-only crossfade (opacity, GPU-compositor only — no animation library).
 * Fades the OLD content out first, swaps in the new content once invisible, then
 * fades it in — so the content swap itself is never visible, only the fade.
 */
function Crossfade({
  fadeKey,
  className = "",
  children,
}: {
  fadeKey: string;
  className?: string;
  children: ReactNode;
}) {
  const [displayed, setDisplayed] = useState({ key: fadeKey, node: children });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (fadeKey === displayed.key) return;
    setVisible(false);
    const id = setTimeout(() => {
      setDisplayed({ key: fadeKey, node: children });
      setVisible(true);
    }, 300);
    return () => clearTimeout(id);
    // Intentionally keyed only on fadeKey — it 1:1 identifies `children` for every
    // caller here, and depending on `children` too would refire on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeKey]);

  return (
    <div
      className={`transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {displayed.node}
    </div>
  );
}

function PlaceholderFrame({
  platform,
  className = "",
}: {
  platform: Platform;
  className?: string;
}) {
  const Icon = PLATFORM_ICON[platform];
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-zinc-700 bg-zinc-900/60 text-zinc-600 ${className}`}
    >
      <Icon className="h-8 w-8" />
      <p className="text-xs uppercase tracking-widest">
        {PLATFORM_LABEL[platform]} demo coming soon
      </p>
    </div>
  );
}

export default function PairedPlatformGallery({
  pages,
}: PairedPlatformGalleryProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [view, setView] = useState<ViewMode>("vr");

  if (pages.length === 0) return null;

  const page = pages[pageIndex];

  const goTo = (next: number) => {
    setPageIndex(((next % pages.length) + pages.length) % pages.length);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_0_40px_rgba(0,0,0,0.45)]">
      {/* View toggle */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/10 bg-zinc-950/80 p-3">
        {(["vr", "mobile","side"] as const).map((v) => {
          const Icon = v === "side" ? Columns2 : PLATFORM_ICON[v];
          const label = v === "side" ? "Side by Side" : PLATFORM_LABEL[v];
          return (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors duration-300 ${
                view === v
                  ? "border-[#7affe7]/40 bg-[#7affe7]/10 text-[#7affe7]"
                  : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>

      {/* Frame */}
      <div className="relative">
        {view === "side" ? (
          <div className="grid grid-cols-1 gap-6 bg-zinc-950/40 p-4 sm:grid-cols-2 sm:gap-8 sm:p-6">
            {(["vr", "mobile"] as const).map((p) => {
              const asset = page[p];
              const Icon = PLATFORM_ICON[p];
              return (
                <div key={p} className="flex flex-col items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-zinc-500">
                    <Icon className="h-3.5 w-3.5" />
                    {PLATFORM_LABEL[p]}
                  </span>
                  <div className="flex h-[260px] w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black sm:h-[340px]">
                    <Crossfade
                      fadeKey={`${p}-${pageIndex}`}
                      className="flex h-full w-full items-center justify-center"
                    >
                      {asset.src ? (
                        <DemoMedia
                          src={asset.src}
                          alt={
                            asset.caption ?? `${page.label ?? "Demo"} — ${p}`
                          }
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <PlaceholderFrame platform={p} className="h-full w-full" />
                      )}
                    </Crossfade>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Crossfade fadeKey={`${view}-${pageIndex}`}>
            {page[view].src ? (
              <DemoMedia
                src={page[view].src!}
                alt={page[view].caption ?? `${page.label ?? "Demo"} — ${view}`}
                className="aspect-video w-full bg-black object-contain"
              />
            ) : (
              <PlaceholderFrame platform={view} className="aspect-video w-full" />
            )}
          </Crossfade>
        )}

        {pages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(pageIndex - 1)}
              aria-label="Previous comparison"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-zinc-300 backdrop-blur-sm transition-colors duration-300 hover:text-[#7affe7]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(pageIndex + 1)}
              aria-label="Next comparison"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-zinc-300 backdrop-blur-sm transition-colors duration-300 hover:text-[#7affe7]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption + page dots */}
      <div className="flex items-center justify-between gap-3 bg-zinc-950/80 px-4 py-3">
        <p className="text-xs text-zinc-500">
          {page.label ?? `Comparison ${pageIndex + 1}`}
          {view !== "side" && page[view].caption
            ? ` — ${page[view].caption}`
            : ""}
        </p>
        {pages.length > 1 && (
          <div className="flex shrink-0 gap-1.5">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to comparison ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  i === pageIndex ? "bg-[#7affe7]" : "bg-zinc-700"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
