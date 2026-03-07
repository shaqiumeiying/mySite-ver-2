"use client";

import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <section id="3d-showcase" className="space-y-6">
      <div className="rounded-xl border border-white/5 bg-black/40 px-4 py-3 backdrop-blur-sm sm:px-5">
        <div className="h-5 w-48 animate-pulse rounded bg-zinc-800" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-zinc-800/80" />
      </div>
      <div className="relative h-[400px] w-full animate-pulse overflow-hidden rounded-2xl bg-zinc-900/50 sm:h-[500px] lg:h-[600px]" />
    </section>
  ),
});

export default function ModelViewerLazy() {
  return <ModelViewer />;
}
