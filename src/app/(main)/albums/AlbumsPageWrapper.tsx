"use client";

import dynamic from "next/dynamic";

const AlbumsPageClient = dynamic(
  () =>
    import("./AlbumsPageClient").then((m) => ({ default: m.AlbumsPageClient })),
  { ssr: false }
);

export function AlbumsPageWrapper() {
  return <AlbumsPageClient />;
}
