"use client";

import dynamic from "next/dynamic";

const AlbumDetailClient = dynamic(
  () =>
    import("./AlbumDetailClient").then((m) => ({
      default: m.AlbumDetailClient,
    })),
  { ssr: false }
);

export function AlbumDetailWrapper({ id }: { id: string }) {
  return <AlbumDetailClient id={id} />;
}
