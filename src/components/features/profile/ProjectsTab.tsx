"use client";

import { useTranslations } from "next-intl";
import {
  Plus,
  Images,
  Eye,
  Heart,
  MessageSquare,
  Pencil,
  Trash2,
  Globe,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { storageUrl } from "@/utils/storage-url";
import { Button } from "@/components/common/ui/Button";
import type { ProfileProject } from "../../../types/profile/types";

type Props = {
  projects: ProfileProject[];
  onCreateProject: () => void;
  onEditProject: (proj: ProfileProject) => void;
  onDeleteProject: (proj: ProfileProject) => void;
};

export function ProjectsTab({
  projects,
  onCreateProject,
  onEditProject,
  onDeleteProject,
}: Props) {
  const t = useTranslations("profile");

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-semibold">
          {t("projects")}
        </h2>
        <Button onClick={onCreateProject} size="sm" variant="gradient">
          <Plus className="h-4 w-4" />
          {t("createProject")}
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
          <Images className="text-muted-foreground/40 mb-3 h-12 w-12" />
          <p className="text-muted-foreground text-sm">{t("project.empty")}</p>
          <Button
            onClick={onCreateProject}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            <Plus className="h-4 w-4" />
            {t("createProject")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
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

                <div className="absolute top-2 left-2">
                  {proj.isPublic ? (
                    <span className="bg-background/80 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs backdrop-blur-sm">
                      <Globe className="h-3 w-3" /> {t("project.public")}
                    </span>
                  ) : (
                    <span className="bg-background/80 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs backdrop-blur-sm">
                      <Lock className="h-3 w-3" /> {t("project.private")}
                    </span>
                  )}
                </div>

                <div className="absolute top-2 right-2 flex translate-y-1 gap-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => onEditProject(proj)}
                    className="bg-background/90 hover:bg-background rounded-full p-1.5 shadow-sm transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteProject(proj)}
                    className="bg-background/90 hover:bg-destructive hover:text-destructive-foreground rounded-full p-1.5 shadow-sm transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <Link
                  href={`/projects/${proj.id}`}
                  className="text-foreground hover:text-primary line-clamp-1 text-sm font-semibold transition-colors"
                >
                  {proj.title}
                </Link>

                <div className="text-muted-foreground mt-1.5 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {proj.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" /> {proj.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> {proj.commentsCount}
                  </span>
                </div>

                {proj.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted text-primary rounded-full px-1.5 py-0.5 text-[10px]"
                      >
                        #{tag}
                      </span>
                    ))}
                    {proj.tags.length > 4 && (
                      <span className="text-primary text-[10px]">
                        +{proj.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
