"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Search, Images, FolderOpen, Eye, Heart, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  useFindAllAlbumsQuery,
  useFindAllProjectsQuery,
  MediaType,
} from "@/generated/output";
import { useDebounce } from "@/hooks/useDebounce";
import { storageUrl } from "@/utils/storage-url";
import { cn } from "@/utils/tw-merge";

const MAX_RESULTS = 5;

export function NavbarSearch() {
  const t = useTranslations("navbar");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query.trim(), 400);
  const skip = debouncedQuery.length < 1;

  const { data: projectsData, loading: projectsLoading } =
    useFindAllProjectsQuery({
      variables: {
        filter: {
          search: debouncedQuery,
          limit: MAX_RESULTS,
          page: 1,
          publicOnly: true,
        },
      },
      skip,
    });

  const { data: albumsData, loading: albumsLoading } = useFindAllAlbumsQuery({
    variables: {
      filter: {
        search: debouncedQuery,
        limit: MAX_RESULTS,
        page: 1,
        publicOnly: true,
      },
    },
    skip,
  });

  const isLoading = (projectsLoading || albumsLoading) && !skip;
  const projects = projectsData?.findAllProject.data ?? [];
  const albums = albumsData?.findAllAlbums.data ?? [];
  const hasResults = projects.length > 0 || albums.length > 0;
  const showDropdown = open && debouncedQuery.length >= 2;

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const handleResultClick = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      {/* Search bar */}
      <div
        className={cn(
          "border-border/60 bg-muted/40 flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200",
          open && "border-primary/60 bg-background ring-primary/20 ring-2"
        )}
      >
        <Search className="text-muted-foreground size-4 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder={t("searchPlaceholder")}
          className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        {query && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="border-border/60 bg-popover absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border shadow-xl">
          {isLoading && (
            <div className="flex flex-col gap-2 p-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-muted h-12 w-20 animate-pulse rounded-lg" />
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
                    <div className="bg-muted h-2.5 w-1/2 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !hasResults && (
            <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-sm">
              <Search className="size-8 opacity-30" />
              <span>{t("searchNoResults")}</span>
            </div>
          )}

          {!isLoading && hasResults && (
            <div className="max-h-[70vh] overflow-y-auto">
              {/* Projects section */}
              {projects.length > 0 && (
                <div>
                  <div className="text-muted-foreground border-border/50 flex items-center justify-between border-b px-4 py-2">
                    <span className="text-xs font-semibold tracking-wider uppercase">
                      {t("searchProjects")}
                    </span>
                    <Link
                      href={`/projects?search=${encodeURIComponent(debouncedQuery)}`}
                      className="text-primary hover:text-primary/80 text-xs transition-colors"
                      onClick={handleResultClick}
                    >
                      {t("searchSeeAll")}
                    </Link>
                  </div>
                  <ul>
                    {projects.map((project) => {
                      const thumb = project.media.find(
                        (m) => m.mediaType === MediaType.Image
                      );
                      const thumbUrl = storageUrl(thumb?.url);
                      return (
                        <li key={project.id}>
                          <Link
                            href={`/projects/${project.id}`}
                            onClick={handleResultClick}
                            className="hover:bg-muted/60 flex items-center gap-3 px-4 py-2.5 transition-colors"
                          >
                            {/* Thumbnail */}
                            <div className="bg-muted relative h-12 w-20 shrink-0 overflow-hidden rounded-lg">
                              {thumbUrl ? (
                                <Image
                                  src={thumbUrl}
                                  alt={project.title}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="text-muted-foreground/40 flex h-full items-center justify-center">
                                  <FolderOpen className="size-5" />
                                </div>
                              )}
                            </div>
                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate text-sm leading-snug font-medium">
                                {project.title}
                              </p>
                              <div className="text-muted-foreground mt-0.5 flex items-center gap-3 text-xs">
                                <span className="flex items-center gap-1">
                                  <Eye className="size-3" />
                                  {project.views.toLocaleString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="size-3" />
                                  {project.likes.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Albums section */}
              {albums.length > 0 && (
                <div
                  className={cn(
                    projects.length > 0 && "border-border/50 border-t"
                  )}
                >
                  <div className="text-muted-foreground border-border/50 flex items-center justify-between border-b px-4 py-2">
                    <span className="text-xs font-semibold tracking-wider uppercase">
                      {t("searchAlbums")}
                    </span>
                    <Link
                      href={`/albums?search=${encodeURIComponent(debouncedQuery)}`}
                      className="text-primary hover:text-primary/80 text-xs transition-colors"
                      onClick={handleResultClick}
                    >
                      {t("searchSeeAll")}
                    </Link>
                  </div>
                  <ul>
                    {albums.map((album) => {
                      const thumbUrl = storageUrl(album.thumbnailUrl);
                      return (
                        <li key={album.id}>
                          <Link
                            href={`/albums/${album.id}`}
                            onClick={handleResultClick}
                            className="hover:bg-muted/60 flex items-center gap-3 px-4 py-2.5 transition-colors"
                          >
                            {/* Thumbnail */}
                            <div className="bg-muted relative h-12 w-20 shrink-0 overflow-hidden rounded-lg">
                              {thumbUrl ? (
                                <Image
                                  src={thumbUrl}
                                  alt={album.title}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="text-muted-foreground/40 flex h-full items-center justify-center">
                                  <Images className="size-5" />
                                </div>
                              )}
                            </div>
                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate text-sm leading-snug font-medium">
                                {album.title}
                              </p>
                              <div className="text-muted-foreground mt-0.5 flex items-center gap-2 text-xs">
                                {album.user && (
                                  <span className="truncate">
                                    @{album.user.username}
                                  </span>
                                )}
                                {album.projectCount != null && (
                                  <span className="shrink-0">
                                    · {album.projectCount} projects
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
