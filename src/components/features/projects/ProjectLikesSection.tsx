"use client";

import { useState } from "react";
import {
  useProjectLikesQuery,
  useSetProjectLikeMutation,
} from "@/generated/output";
import { useTranslations } from "next-intl";
import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/common/ui/Button";
import { Skeleton } from "@/components/common/ui/Skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/Dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/ui/Avatar";
import { storageUrl } from "@/utils/storage-url";
import { cn } from "@/utils/tw-merge";

type ProjectLikesSectionProps = {
  projectId: string;
  views: number;
  likes: number;
  isLiked?: boolean | null;
  canInteract: boolean;
};

export function ProjectLikesSection({
  projectId,
  views,
  likes: initialLikes,
  isLiked: initialIsLiked,
  canInteract,
}: ProjectLikesSectionProps) {
  const t = useTranslations("projects.detail");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [optimisticLikes, setOptimisticLikes] = useState<number | null>(null);
  const [optimisticIsLiked, setOptimisticIsLiked] = useState<boolean | null>(
    null
  );

  const { data: likesData, loading: likesLoading } = useProjectLikesQuery({
    variables: { projectId },
    skip: !dialogOpen,
    fetchPolicy: "network-only",
  });

  const likedByUsers = likesData?.projectLikes ?? [];

  const [setProjectLike, { loading: likeLoading }] =
    useSetProjectLikeMutation();

  const optimisticCount = optimisticLikes ?? initialLikes;
  const displayLikes =
    !likesLoading && likesData ? likedByUsers.length : optimisticCount;
  const displayIsLiked = optimisticIsLiked ?? initialIsLiked;

  const handleLike = async () => {
    if (!canInteract || likeLoading) return;

    const currentlyLiked = !!displayIsLiked;
    const newLikedState = !currentlyLiked;
    const newLikesCount = currentlyLiked ? displayLikes - 1 : displayLikes + 1;

    setOptimisticLikes(newLikesCount);
    setOptimisticIsLiked(newLikedState);

    try {
      await setProjectLike({
        variables: { projectId, like: newLikedState },
      });
    } catch {
      setOptimisticLikes(initialLikes);
      setOptimisticIsLiked(initialIsLiked ?? null);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Eye className="h-4 w-4" />
          <span>{views.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={handleLike}
            disabled={!canInteract || likeLoading}
            title={canInteract ? t("likeAction") : t("loginRequiredAction")}
            className={cn("transition-all", likeLoading && "opacity-50")}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-all duration-200",
                displayIsLiked
                  ? "text-primary fill-primary scale-110"
                  : "text-muted-foreground hover:text-primary"
              )}
            />
          </Button>

          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
          >
            {displayLikes.toLocaleString()}
          </button>
        </div>
      </div>

      {!canInteract && (
        <p className="text-muted-foreground text-xs">
          {t("loginRequiredAction")}{" "}
          <Link href="/account/login" className="text-primary hover:underline">
            {t("loginLink")}
          </Link>
        </p>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {t("likesModalTitle", {
                count: likesLoading ? displayLikes : likedByUsers.length,
              })}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-80 space-y-3 overflow-y-auto">
            {likesLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))
            ) : likedByUsers.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                {t("likesModalEmpty")}
              </p>
            ) : (
              likedByUsers.map((like) => (
                <Link
                  key={like.id}
                  href={`/profile/${encodeURIComponent(like.user.username)}`}
                  className="hover:bg-muted flex items-center gap-3 rounded-lg p-2 transition-colors"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={storageUrl(like.user.avatar ?? "") ?? ""}
                      alt={like.user.displayName ?? like.user.username}
                    />
                    <AvatarFallback className="text-xs">
                      {(like.user.displayName ?? like.user.username)
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {like.user.displayName ?? like.user.username}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      @{like.user.username}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
