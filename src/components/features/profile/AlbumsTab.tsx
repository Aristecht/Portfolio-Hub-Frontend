"use client";

import { useTranslations } from "next-intl";
import { Plus, FolderOpen, Globe, Lock, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { storageUrl } from "@/utils/storage-url";
import { Button } from "@/components/common/ui/Button";
import type { ProfileAlbum } from "../../../types/profile/types";

type Props = {
  albums: ProfileAlbum[];
  onCreateAlbum: () => void;
  onEditAlbum: (album: ProfileAlbum) => void;
  onDeleteAlbum: (album: ProfileAlbum) => void;
};

export function AlbumsTab({
  albums,
  onCreateAlbum,
  onEditAlbum,
  onDeleteAlbum,
}: Props) {
  const t = useTranslations("profile");

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-semibold">{t("albums")}</h2>
        <Button onClick={onCreateAlbum} size="sm" variant="gradient">
          <Plus className="h-4 w-4" />
          {t("createAlbum")}
        </Button>
      </div>

      {albums.length === 0 ? (
        <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
          <FolderOpen className="text-muted-foreground/40 mb-3 h-12 w-12" />
          <p className="text-muted-foreground text-sm">{t("album.empty")}</p>
          <Button
            onClick={onCreateAlbum}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            <Plus className="h-4 w-4" />
            {t("createAlbum")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <div
              key={album.id}
              className="border-border bg-card group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="bg-muted relative aspect-video w-full overflow-hidden">
                {storageUrl(album.thumbnailUrl) ? (
                  <Image
                    src={storageUrl(album.thumbnailUrl)!}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FolderOpen className="text-muted-foreground/30 h-10 w-10" />
                  </div>
                )}

                <div className="absolute top-2 left-2">
                  {album.isPublic ? (
                    <span className="bg-background/80 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs backdrop-blur-sm">
                      <Globe className="h-3 w-3" /> {t("album.public")}
                    </span>
                  ) : (
                    <span className="bg-background/80 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs backdrop-blur-sm">
                      <Lock className="h-3 w-3" /> {t("album.private")}
                    </span>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex translate-y-1 gap-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => onEditAlbum(album)}
                    className="bg-background/90 hover:bg-background rounded-full p-1.5 shadow-sm transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteAlbum(album)}
                    className="bg-background/90 hover:bg-destructive hover:text-destructive-foreground rounded-full p-1.5 shadow-sm transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <Link
                  href={`/albums/${album.id}`}
                  className="text-foreground hover:text-primary line-clamp-1 text-sm font-semibold transition-colors"
                >
                  {album.title}
                </Link>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  <FolderOpen className="mr-1 inline h-3 w-3" />
                  {t("album.projectsCount", { count: album.projectsCount })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
