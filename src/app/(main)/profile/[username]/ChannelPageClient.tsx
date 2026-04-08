"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/tw-merge";
import { useAuth } from "@/hooks/useCurrentUser";
import { useGetChannelQuery } from "@/generated/output";
import { Skeleton } from "@/components/common/ui/Skeleton";
import Link from "next/link";
import Image from "next/image";
import { storageUrl } from "@/utils/storage-url";
import {
  Images,
  FolderOpen,
  Eye,
  MessageSquare,
  Globe,
  Lock,
  ExternalLink,
  Heart,
} from "lucide-react";
import { ProfileHeader } from "@/components/features/profile/ProfileHeader";

type Tab = "projects" | "albums";

export function ChannelPageClient({ username }: { username: string }) {
  const t = useTranslations("channel");
  const { profile } = useAuth();
  const isOwner = profile?.username === username;

  const [activeTab, setActiveTab] = useState<Tab>("projects");

  function goToTab(tab: Tab) {
    setActiveTab(tab);
  }

  const { data, loading } = useGetChannelQuery({
    variables: { username },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const channel = data?.getChannel;

  if (loading && !channel) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-border bg-card rounded-2xl border p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-muted-foreground">{t("notFound")}</p>
      </div>
    );
  }

  const albums = channel.albums.filter((a) => a.id && a.isPublic);
  const projects = channel.projects.filter((p) => p.id && p.title);

  const tabCounts: Record<Tab, number> = {
    projects: projects.length,
    albums: albums.length,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <ProfileHeader channel={channel} isOwner={isOwner} />

      <div className="border-border bg-muted/30 flex gap-1 rounded-xl border p-1">
        {(["projects", "albums"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => goToTab(tab)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-primary text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(tab)}
            <span className="text-muted-foreground ml-1.5 text-xs">
              ({tabCounts[tab]})
            </span>
          </button>
        ))}
      </div>

      {/* Projects */}
      {activeTab === "projects" && (
        <section className="space-y-4">
          {projects.length === 0 ? (
            <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
              <Images className="text-muted-foreground/40 mb-3 h-12 w-12" />
              <p className="text-muted-foreground text-sm">{t("noProjects")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.id}`}
                  className="border-border bg-card group overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="bg-muted relative aspect-video w-full overflow-hidden">
                    {storageUrl(proj.thumbnailUrl) ? (
                      <Image
                        src={storageUrl(proj.thumbnailUrl)!}
                        alt={proj.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Images className="text-muted-foreground/30 h-10 w-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                      <ExternalLink className="h-6 w-6 text-white drop-shadow" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-foreground line-clamp-1 text-sm font-semibold">
                      {proj.title}
                    </p>
                    <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {proj.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" /> {proj.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />{" "}
                        {proj.commentsCount}
                      </span>
                    </div>
                    {proj.tags.filter((tag) => tag).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.tags
                          .filter((tag) => tag)
                          .slice(0, 3)
                          .map((tag, i) => (
                            <span
                              key={`${i}-${tag}`}
                              className="bg-primary/8 text-primary rounded-full px-2 py-0.5 text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Albums */}
      {activeTab === "albums" && (
        <section className="space-y-4">
          {albums.length === 0 ? (
            <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
              <FolderOpen className="text-muted-foreground/40 mb-3 h-12 w-12" />
              <p className="text-muted-foreground text-sm">{t("noAlbums")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <Link
                  key={album.id}
                  href={`/albums/${album.id}`}
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
                      <span className="bg-background/80 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs backdrop-blur-sm">
                        {album.isPublic ? (
                          <>
                            <Globe className="h-3 w-3" /> {t("album.public")}
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3" /> {t("album.private")}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/20 group-hover:opacity-100">
                      <ExternalLink className="h-6 w-6 text-white drop-shadow" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-foreground line-clamp-1 text-sm font-semibold">
                      {album.title}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      <FolderOpen className="mr-1 inline h-3 w-3" />
                      {t("album.projectsCount", { count: album.projectsCount })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

/* ---- Sub-components ---- */
