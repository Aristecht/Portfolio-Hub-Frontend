"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Images,
  Lock,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MediaType, useFindOneAlbumQuery } from "@/generated/output";
import type { FindOneAlbumQuery } from "@/generated/output";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { Separator } from "@/components/common/ui/Separator";
import { storageUrl } from "@/utils/storage-url";

type AlbumProject = NonNullable<
  NonNullable<FindOneAlbumQuery["findOne"]>["projects"]
>[number];

function ProjectCard({ project }: { project: AlbumProject }) {
  const thumbnail = project.media.find((m) => m.mediaType === MediaType.Image);

  return (
    <Link href={`/projects/${project.id}`} className="group block outline-none">
      <div className="border-border bg-card hover:border-border/60 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="bg-muted relative aspect-video w-full overflow-hidden">
          {thumbnail && storageUrl(thumbnail.url) ? (
            <Image
              src={storageUrl(thumbnail.url)!}
              alt={project.title ?? ""}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-muted-foreground/30 flex h-full w-full items-center justify-center">
              <Images className="h-10 w-10" />
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute bottom-2 left-2 flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="bg-background/80 text-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
              <Heart className="h-3 w-3" />
              {project.likes}
            </span>
          </div>
        </div>

        <div className="p-3">
          <p className="text-foreground group-hover:text-primary line-clamp-1 text-sm font-semibold transition-colors duration-200">
            {project.title}
          </p>
          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="flex shrink-0 items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {project.commentsCount}
            </span>
            {project.tags.length > 0 && (
              <span className="flex min-w-0 items-center gap-1 overflow-hidden">
                {project.tags[0] && (
                  <span className="bg-muted text-muted-foreground max-w-22.5 truncate rounded-full px-1.5 py-0.5 text-[11px]">
                    #{project.tags[0]}
                  </span>
                )}

                {project.tags[1] && (
                  <span className="bg-muted text-muted-foreground hidden max-w-22.5 truncate rounded-full px-1.5 py-0.5 text-[11px] sm:inline-block">
                    #{project.tags[1]}
                  </span>
                )}

                {project.tags.length > 1 && (
                  <span className="text-muted-foreground text-[10px] sm:hidden">
                    +{project.tags.length - 1}
                  </span>
                )}

                {project.tags.length > 2 && (
                  <span className="text-muted-foreground hidden text-[10px] sm:inline">
                    +{project.tags.length - 2}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function AlbumHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

function ProjectsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border-border bg-card shadow-soft overflow-hidden rounded-2xl border"
        >
          <Skeleton className="aspect-video w-full rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AlbumDetailClient({ id }: { id: string }) {
  const t = useTranslations("albums.detail");
  const tAlbums = useTranslations("albums");

  const { data, loading, error, previousData } = useFindOneAlbumQuery({
    variables: { id },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    pollInterval: 8000,
  });

  const album = data?.findOne ?? previousData?.findOne;
  const projects = album?.projects ?? [];
  const showProjectsSkeleton = loading && !album;

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/albums"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToAlbums")}
      </Link>

      {loading && !album ? (
        <AlbumHeaderSkeleton />
      ) : error && !album ? (
        <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-4">
          <p className="text-destructive text-sm font-medium">
            {t("notFound")}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">{error.message}</p>
        </div>
      ) : !album ? (
        <p className="text-muted-foreground">{t("notFound")}</p>
      ) : (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-2xl sm:w-72 sm:shrink-0">
            {album.thumbnailUrl && storageUrl(album.thumbnailUrl) ? (
              <Image
                src={storageUrl(album.thumbnailUrl)!}
                alt={album.title}
                fill
                sizes="(max-width: 640px) 100vw, 288px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="text-muted-foreground/30 flex h-full items-center justify-center">
                <Images className="h-12 w-12" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {!album.isPublic && (
                <span className="border-border text-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                  <Lock className="h-3 w-3" />
                  {tAlbums("private")}
                </span>
              )}
              <span className="border-border text-muted-foreground inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                <FolderOpen className="h-3 w-3" />
                {projects.length} {tAlbums("projects")}
              </span>
            </div>

            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              {album.title}
            </h1>

            {album.user && (
              <div className="flex items-center gap-2">
                <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
                  {album.user.avatar && storageUrl(album.user.avatar) ? (
                    <Image
                      src={storageUrl(album.user.avatar)!}
                      alt={album.user.username}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center text-xs font-semibold uppercase">
                      {album.user.username[0]}
                    </div>
                  )}
                </div>
                <span className="text-muted-foreground text-sm">
                  {t("by")}{" "}
                  <Link
                    href={`/profile/${encodeURIComponent(album.user.username)}`}
                    className="text-foreground ml-0.5 font-medium hover:underline"
                  >
                    @{album.user.username}
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {album && <Separator />}

      {showProjectsSkeleton && <ProjectsGridSkeleton />}

      {album && (
        <>
          {projects.length === 0 ? (
            <div className="border-border flex flex-col items-center gap-3 rounded-2xl border border-dashed py-20 text-center">
              <FolderOpen className="text-muted-foreground/40 h-10 w-10" />
              <p className="text-muted-foreground text-sm">
                {t("emptyProjects")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
