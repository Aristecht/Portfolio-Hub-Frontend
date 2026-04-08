"use client";

import { useState, useCallback, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { Search, Images, Lock, ArrowUpRight, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useFindAllAlbumsQuery } from "@/generated/output";
import { Input } from "@/components/common/ui/Input";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/common/ui/Pagination";
import Image from "next/image";
import { storageUrl } from "@/utils/storage-url";

const PAGE_SIZE = 12;

function AlbumCard({
  id,
  title,
  thumbnailUrl,
  projectCount,
  isPublic,
  user,
  t,
}: {
  id: string;
  title: string;
  thumbnailUrl: string;
  projectCount?: number | null;
  isPublic: boolean;
  user?: { id: string; username: string; avatar?: string | null } | null;
  t: ReturnType<typeof useTranslations<"albums">>;
}) {
  const count = projectCount ?? 0;

  return (
    <div className="group block outline-none">
      <div className="border-border bg-card hover:border-border/60 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <Link href={`/albums/${id}`} className="block">
          <div className="bg-muted relative aspect-video w-full overflow-hidden">
            {storageUrl(thumbnailUrl) ? (
              <Image
                src={storageUrl(thumbnailUrl)!}
                alt={title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="text-muted-foreground/30 flex h-full items-center justify-center">
                <Images className="text-accent/80 h-10 w-10" />
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              {!isPublic && (
                <span className="bg-background/80 text-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                  <Lock className="h-3 w-3" />
                  {t("private")}
                </span>
              )}
              <div className="bg-background/90 text-foreground translate-y-1 rounded-full p-1.5 opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="absolute bottom-2 left-2 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="bg-background/80 text-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                <FolderOpen className="h-3 w-3" />
                {count} {t("projects")}
              </span>
            </div>
          </div>
        </Link>

        <div className="p-3">
          <Link
            href={`/albums/${id}`}
            className="text-foreground group-hover:text-primary line-clamp-1 block text-sm font-semibold transition-colors duration-200"
          >
            {title}
          </Link>
          {user && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                {user.avatar && storageUrl(user.avatar) ? (
                  <Image
                    src={storageUrl(user.avatar)!}
                    alt={user.username}
                    fill
                    sizes="20px"
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center text-[9px] font-semibold uppercase">
                    {user.username[0]}
                  </div>
                )}
              </div>
              <Link
                href={`/profile/${encodeURIComponent(user.username)}`}
                className="text-muted-foreground hover:text-foreground truncate text-xs transition-colors"
              >
                @{user.username}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AlbumCardSkeleton() {
  return (
    <div className="border-border bg-card shadow-soft overflow-hidden rounded-2xl border">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export function AlbumsPageClient() {
  const t = useTranslations("albums");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 350);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const { data, loading } = useFindAllAlbumsQuery({
    variables: {
      filter: {
        page,
        limit: PAGE_SIZE,
        publicOnly: true,
        search: debouncedSearch || undefined,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const albums = data?.findAllAlbums.data ?? [];
  const meta = data?.findAllAlbums.meta;
  const totalPages = meta?.totalPages ?? 1;

  function getPageNumbers(): (number | "ellipsis")[] {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "ellipsis")[] = [1];
    if (page > 3) pages.push("ellipsis");
    for (
      let p = Math.max(2, page - 1);
      p <= Math.min(totalPages - 1, page + 1);
      p++
    )
      pages.push(p);
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-1">
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          {t("heading")}
        </h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder={t("searchPlaceholder")}
          className="pl-9"
        />
      </div>

      {loading && albums.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <AlbumCardSkeleton key={i} />
          ))}
        </div>
      ) : albums.length === 0 ? (
        <div className="border-border flex flex-col items-center gap-3 rounded-2xl border border-dashed py-20 text-center">
          <Images className="text-muted-foreground/40 h-10 w-10" />
          <p className="text-muted-foreground text-sm">{t("empty")}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                title={album.title}
                thumbnailUrl={album.thumbnailUrl}
                projectCount={album.projectCount}
                isPublic={album.isPublic}
                user={album.user}
                t={t}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    label={t("prev")}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    aria-disabled={page === 1}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={() => setPage(p)}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    label={t("next")}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    aria-disabled={page === totalPages}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
