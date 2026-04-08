// ProjectAuthorBar.tsx
"use client";

import Link from "next/link";
import { UserPlus, UserCheck } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/ui/Avatar";
import { Button } from "@/components/common/ui/Button";
import { storageUrl } from "@/utils/storage-url";
import { ProjectLikesSection } from "./ProjectLikesSection";
import { FindOneProjectQuery } from "@/generated/output";
import { useTranslations } from "next-intl";

type ProjectType = FindOneProjectQuery["findOneProject"];

type ProjectAuthorBarProps = {
  author: {
    id: string;
    username: string;
    displayName?: string | null;
    avatar?: string | null;
    followers?: number | null;
  };
  projectId: string;
  project: ProjectType;
  isFollowing?: boolean | null;
  canInteract: boolean;
  onFollow: () => void;
  followLoading?: boolean;
  isOwnProfile?: boolean;
  currentUserId?: string;
};

export function ProjectAuthorBar({
  author,
  isFollowing,
  canInteract,
  onFollow,
  project,
  followLoading,
  isOwnProfile,
  currentUserId,
}: ProjectAuthorBarProps) {
  const t = useTranslations("projects.detail");

  const displayName = author.displayName ?? author.username;

  return (
    <div className="bg-muted/40 border-border flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5">
      <Link
        href={`/profile/${encodeURIComponent(author.username)}`}
        className="group flex min-w-0 items-center gap-2.5"
      >
        <Avatar className="size-8 shrink-0">
          <AvatarImage
            src={storageUrl(author.avatar ?? "") ?? ""}
            alt={displayName}
          />
          <AvatarFallback className="text-xs">
            {displayName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-foreground group-hover:text-primary truncate text-sm font-medium transition-colors">
            {displayName}
          </p>
          <p className="text-muted-foreground truncate text-xs">
            @{author.username}
            {author.followers != null && (
              <span className="ml-1.5">
                · {author.followers.toLocaleString()} {t("followers")}
              </span>
            )}
          </p>
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-3 sm:gap-6">
        <ProjectLikesSection
          projectId={project.id}
          views={project.views}
          likes={project.likes}
          isLiked={
            currentUserId
              ? (project.likedBy?.some((l) => l.user.id === currentUserId) ??
                project.isLiked ??
                false)
              : (project.isLiked ?? false)
          }
          canInteract={canInteract}
        />

        {!isOwnProfile && (
          <Button
            type="button"
            size="sm"
            variant={isFollowing ? "outline" : "default"}
            onClick={onFollow}
            disabled={!canInteract || followLoading}
            className="gap-1.5"
          >
            {isFollowing ? (
              <>
                <UserCheck className="size-3.5" />
                <span className="hidden sm:inline">{t("unfollow")}</span>
              </>
            ) : (
              <>
                <UserPlus className="size-3.5" />
                <span className="hidden sm:inline">{t("follow")}</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
