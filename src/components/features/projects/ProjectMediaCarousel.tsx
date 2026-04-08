// components/features/projects/ProjectMediaCarousel.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Images,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ZoomIn,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { MediaType } from "@/generated/output";
import { storageUrl } from "@/utils/storage-url";
import { cn } from "@/utils/tw-merge";

type MediaItem = {
  id: string;
  url: string;
  mediaType: MediaType;
};

type ProjectMediaCarouselProps = {
  media: MediaItem[];
  title: string;
};

export function ProjectMediaCarousel({
  media,
  title,
}: ProjectMediaCarouselProps) {
  const t = useTranslations("projects.detail");
  const firstImageIndex = media.findIndex(
    (m) => m.mediaType === MediaType.Image
  );
  const startIndex = firstImageIndex === -1 ? 0 : firstImageIndex;
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    startIndex,
  });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi?.scrollTo(index);
  }, [emblaApi, thumbApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i - 1 + media.length) % media.length);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i + 1) % media.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, media.length]);

  if (!media.length) {
    return (
      <div className="bg-muted flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl">
        <Images className="text-accent/80 h-12 w-12" />
        <span className="text-accent/80">{t("noImage")}</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {media.map((item, i) => (
              <div
                key={item.id}
                className="relative aspect-video min-w-0 flex-[0_0_100%] cursor-zoom-in"
                onClick={() => openLightbox(i)}
              >
                {item.mediaType === MediaType.Video ? (
                  <div className="relative h-full w-full">
                    <video
                      src={storageUrl(item.url) ?? ""}
                      className="h-full w-full object-cover"
                      controls
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                ) : storageUrl(item.url) ? (
                  <Image
                    src={storageUrl(item.url)!}
                    alt={`${title} — слайд ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                ) : (
                  <div className="bg-muted flex h-full items-center justify-center">
                    <Images className="text-accent/80 h-12 w-12" />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 hover:opacity-100">
                  <div className="bg-background/60 rounded-full p-2 backdrop-blur-sm">
                    <ZoomIn className="text-foreground h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {media.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="bg-background/70 hover:bg-background/90 absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronLeft className="text-foreground h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="bg-background/70 hover:bg-background/90 absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-all"
            >
              <ChevronRight className="text-foreground h-5 w-5" />
            </button>
          </>
        )}

        {media.length > 1 && (
          <div className="bg-background/60 absolute right-3 bottom-3 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
            {selectedIndex + 1} / {media.length}
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div ref={thumbRef} className="mt-2 overflow-hidden">
          <div className="flex gap-2">
            {media.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(i)}
                className={cn(
                  "relative aspect-video flex-[0_0_80px] overflow-hidden rounded-lg border-2 transition-all sm:flex-[0_0_100px]",
                  i === selectedIndex
                    ? "border-primary opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                )}
              >
                {item.mediaType === MediaType.Video ? (
                  <div className="bg-muted flex h-full items-center justify-center">
                    <Play className="text-muted-foreground h-4 w-4" />
                  </div>
                ) : storageUrl(item.url) ? (
                  <Image
                    src={storageUrl(item.url)!}
                    alt={`Миниатюра ${i + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-full items-center justify-center">
                    <Images className="text-muted-foreground/30 h-4 w-4" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Лайтбокс */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>

          {media.length > 1 && (
            <>
              <button
                type="button"
                className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (i) => (i - 1 + media.length) % media.length
                  );
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i + 1) % media.length);
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative max-h-[90vh] w-full max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {media[lightboxIndex]?.mediaType === MediaType.Video ? (
              <video
                src={storageUrl(media[lightboxIndex].url) ?? ""}
                controls
                className="max-h-[90vh] w-full rounded-xl object-contain"
              />
            ) : (
              <div className="relative aspect-video w-full">
                <Image
                  src={storageUrl(media[lightboxIndex].url)!}
                  alt={`${title} — ${lightboxIndex + 1}`}
                  fill
                  sizes="90vw"
                  className="rounded-xl object-contain"
                />
              </div>
            )}

            <p className="mt-3 text-center text-sm text-white/60">
              {lightboxIndex + 1} / {media.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
