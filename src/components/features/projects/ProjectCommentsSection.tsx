"use client";

import { FormEvent, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Ellipsis, MessageSquare } from "lucide-react";
import Link from "next/link";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/common/ui/Avatar";
import { storageUrl } from "@/utils/storage-url";
import type { FindCommentsByProjectQuery } from "@/generated/output";
import { Button } from "@/components/common/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { Input } from "@/components/common/ui/Input";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { CommentReplies } from "./CommentReplies";

type ProjectComment =
  FindCommentsByProjectQuery["findCommentByProject"]["data"][number];

type ProjectCommentsSectionProps = {
  projectId: string;
  commentsTotal: number;
  canInteract: boolean;
  commentText: string;
  onCommentTextChange: (value: string) => void;
  canSubmitComment: boolean;
  createCommentLoading: boolean;
  onSubmitComment: (event: FormEvent<HTMLFormElement>) => void;
  commentsLoading: boolean;
  sortedComments: ProjectComment[];
  loadMoreComments?: () => Promise<void>;
  hasMoreComments?: boolean;
  editingCommentId: string | null;
  editingCommentText: string;
  onEditingCommentTextChange: (value: string) => void;
  onSaveEditedComment: () => void;
  onCancelEditComment: () => void;
  onStartEditComment: (commentId: string, text: string) => void;
  onDeleteComment: (commentId: string) => void;
  updateCommentLoading: boolean;
  removeCommentLoading: boolean;
  profileId?: string;
};

export function ProjectCommentsSection({
  projectId,
  commentsTotal,
  canInteract,
  commentText,
  onCommentTextChange,
  canSubmitComment,
  createCommentLoading,
  onSubmitComment,
  commentsLoading,
  sortedComments,
  loadMoreComments,
  hasMoreComments,
  editingCommentId,
  editingCommentText,
  onEditingCommentTextChange,
  onSaveEditedComment,
  onCancelEditComment,
  onStartEditComment,
  onDeleteComment,
  updateCommentLoading,
  removeCommentLoading,
  profileId,
}: ProjectCommentsSectionProps) {
  const t = useTranslations("projects.detail");
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || !loadMoreComments) return;
    const el = sentinelRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMoreComments) {
            loadMoreComments().catch(() => {});
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loadMoreComments, hasMoreComments]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="text-muted-foreground h-4 w-4" />
        <h2 className="text-foreground text-lg font-semibold">
          {t("commentsTitle")} ({commentsTotal})
        </h2>
      </div>

      <form onSubmit={onSubmitComment} className="space-y-2">
        <Input
          value={commentText}
          onChange={(event) => onCommentTextChange(event.target.value)}
          placeholder={t("commentPlaceholder")}
          disabled={!canInteract || createCommentLoading}
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs">
            {canInteract ? t("commentHintAuthorized") : t("commentHintGuest")}
          </p>
          <Button
            type="submit"
            size="sm"
            disabled={!canSubmitComment || createCommentLoading}
          >
            {t("commentSubmit")}
          </Button>
        </div>
      </form>

      {commentsLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="border-border rounded-xl border p-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-4 w-full" />
            </div>
          ))}
        </div>
      ) : sortedComments.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("commentsEmpty")}</p>
      ) : (
        <>
          <div className="space-y-3">
            {sortedComments.map((comment) => (
              <div
                key={comment.id}
                className="border-border rounded-xl border p-3"
              >
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <Link
                    href={`/profile/${encodeURIComponent(comment.user.username)}`}
                    className="hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={storageUrl(comment.user.avatar ?? "") ?? ""}
                        alt={comment.user.username}
                      />
                      <AvatarFallback className="text-xs">
                        {comment.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">@{comment.user.username}</span>
                  </Link>
                  <span>
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {editingCommentId === comment.id ? (
                  <div className="mt-2 space-y-2">
                    <Input
                      value={editingCommentText}
                      onChange={(event) =>
                        onEditingCommentTextChange(event.target.value)
                      }
                      disabled={updateCommentLoading}
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={onSaveEditedComment}
                        disabled={
                          updateCommentLoading ||
                          editingCommentText.trim().length === 0
                        }
                      >
                        {t("commentEditSave")}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={onCancelEditComment}
                        disabled={updateCommentLoading}
                      >
                        {t("commentEditCancel")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    {" "}
                    <p className="text-foreground mt-2 text-sm whitespace-pre-wrap">
                      {comment.text}
                    </p>
                    {canInteract && comment.user.id === profileId && (
                      <div className="mt-1 flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              size="icon-xs"
                              variant="ghost"
                              disabled={
                                removeCommentLoading || updateCommentLoading
                              }
                            >
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={() =>
                                onStartEditComment(comment.id, comment.text)
                              }
                              disabled={
                                removeCommentLoading || updateCommentLoading
                              }
                            >
                              {t("commentEdit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => onDeleteComment(comment.id)}
                              disabled={
                                removeCommentLoading || updateCommentLoading
                              }
                            >
                              {t("commentDelete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                )}

                <CommentReplies
                  commentId={comment.id}
                  repliesCount={comment.repliesCount ?? 0}
                  projectId={projectId}
                  canInteract={canInteract}
                  profileId={profileId}
                />
              </div>
            ))}
          </div>

          <div ref={sentinelRef} />
        </>
      )}

      {!canInteract && (
        <p className="text-muted-foreground text-xs">
          {t("loginRequiredAction")}{" "}
          <Link href="/account/login" className="text-primary hover:underline">
            {t("loginLink")}
          </Link>
        </p>
      )}
    </div>
  );
}
