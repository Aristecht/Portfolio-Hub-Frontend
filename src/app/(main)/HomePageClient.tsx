"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  FolderOpen,
  Images,
  Users,
  Heart,
  Eye,
} from "lucide-react";
import {
  MediaType,
  useFindAllProjectsQuery,
  useFindAllAlbumsQuery,
} from "@/generated/output";
import { storageUrl } from "@/utils/storage-url";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { useAuth } from "@/hooks/useCurrentUser";
import { NavbarSearch } from "@/components/elements/MainSearch";

function ProjectMiniCard({
  id,
  title,
  likes,
  views,
  media,
}: {
  id: string;
  title: string;
  likes: number;
  views: number;
  media: Array<{ id: string; url: string; mediaType: string }>;
}) {
  const thumbnail = media.find((m) => m.mediaType === MediaType.Image);
  const src = thumbnail ? storageUrl(thumbnail.url) : null;

  return (
    <Link
      href={`/projects/${id}`}
      className="group border-border bg-card hover:border-primary/30 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="bg-muted relative aspect-video w-full overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Images className="text-primary/0 h-10 w-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="p-3">
        <p className="text-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
          {title}
        </p>
        <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {views}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function HomePageClient() {
  const t = useTranslations("home");
  const { isAuthenticated } = useAuth();

  const { data, loading } = useFindAllProjectsQuery({
    variables: { filter: { page: 1, limit: 6 } },
    fetchPolicy: "cache-and-network",
    skip: !isAuthenticated,
  });

  const { data: albumsData, loading: albumsLoading } = useFindAllAlbumsQuery({
    variables: { filter: { page: 1, limit: 20, publicOnly: true } },
    fetchPolicy: "cache-and-network",
    skip: !isAuthenticated,
  });

  const projects = data?.findAllProject.data ?? [];

  const topAlbums = [...(albumsData?.findAllAlbums.data ?? [])]
    .sort((a, b) => (b.projectCount ?? 0) - (a.projectCount ?? 0))
    .slice(0, 6);

  const features = [
    {
      icon: <FolderOpen className="h-6 w-6" />,
      title: t("featureProjects"),
      desc: t("featureProjectsDesc"),
    },
    {
      icon: <Images className="h-6 w-6" />,
      title: t("featureAlbums"),
      desc: t("featureAlbumsDesc"),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t("featureCommunity"),
      desc: t("featureCommunityDesc"),
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      <section className="relative">
        <div className="from-primary/5 via-background to-background pointer-events-none absolute inset-0 overflow-hidden bg-linear-to-br" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 overflow-hidden rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 -bottom-16 h-72 w-72 overflow-hidden rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-2 left-10 h-72 w-72 overflow-hidden rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
            <span className="bg-primary h-1.5 w-1.5 rounded-full" />
            Portfolio-Hub
          </div>
          <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("heroHeading")}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            {t("heroSubheading")}
          </p>
          <div className="mx-auto mt-10 flex w-full max-w-2xl justify-center text-left">
            <NavbarSearch />
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {!isAuthenticated && (
              <Link
                href="/account/create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:shadow-xl"
              >
                {t("heroCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              href="/projects"
              className="border-border bg-background text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all"
            >
              {t("heroCtaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
            {t("featuresHeading")}
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            {t("featuresSubheading")}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="border-border bg-card rounded-2xl border p-6 transition-shadow hover:shadow-md"
            >
              <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-xl p-3">
                {f.icon}
              </div>
              <h3 className="text-foreground mb-2 font-semibold">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {isAuthenticated && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
                {t("recentProjectsHeading")}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {t("recentProjectsSubheading")}
              </p>
            </div>
            <Link
              href="/projects"
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium transition-colors"
            >
              {t("viewAllProjects")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading && projects.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="border-border overflow-hidden rounded-2xl border"
                >
                  <Skeleton className="aspect-video w-full" />
                  <div className="space-y-2 p-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectMiniCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </section>
      )}

      {isAuthenticated && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-foreground text-2xl font-bold sm:text-3xl">
                {t("topAlbumsHeading")}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                {t("topAlbumsSubheading")}
              </p>
            </div>
            <Link
              href="/albums"
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium transition-colors"
            >
              {t("viewAllAlbums")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {albumsLoading && topAlbums.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="border-border overflow-hidden rounded-2xl border"
                >
                  <Skeleton className="aspect-video w-full" />
                  <div className="space-y-2 p-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topAlbums.map((album) => {
                const src = storageUrl(album.thumbnailUrl);
                return (
                  <Link
                    key={album.id}
                    href={`/albums/${album.id}`}
                    className="group border-border bg-card hover:border-primary/30 overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="bg-muted relative aspect-video w-full overflow-hidden">
                      {src ? (
                        <Image
                          src={src}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Images className="text-muted-foreground/40 h-10 w-10" />
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                        <span className="bg-background/80 text-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                          <FolderOpen className="h-3 w-3" />
                          {album.projectCount ?? 0}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
                        {album.title}
                      </p>
                      {album.user && (
                        <p className="text-muted-foreground mt-0.5 truncate text-xs">
                          @{album.user.username}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}

      {!isAuthenticated && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="from-primary/10 via-primary/5 to-background relative overflow-hidden rounded-3xl bg-linear-to-br p-10 text-center">
            <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-violet-500/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-blue-500/10 blur-2xl" />
            <h2 className="text-foreground relative text-2xl font-bold sm:text-3xl">
              {t("ctaHeading")}
            </h2>
            <p className="text-muted-foreground relative mx-auto mt-3 max-w-md text-base">
              {t("ctaSubheading")}
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/account/create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition-all hover:shadow-xl"
              >
                {t("ctaButton")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/account/login"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {t("ctaLogin")}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
