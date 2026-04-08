"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/common/ui/Avatar";
import { storageUrl } from "@/utils/storage-url";
import {
  useGetCommentRepliesQuery,
  useCreateProjectCommentMutation,
  useUpdateProjectCommentMutation,
  useRemoveProjectCommentMutation,
} from "@/generated/output";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";

type CommentRepliesProps = {
  commentId: string;
  repliesCount: number;
  projectId: string;
  canInteract: boolean;
  profileId?: string;
};

export function CommentReplies({
  commentId,
  repliesCount,
  projectId,
  canInteract,
  profileId,
}: CommentRepliesProps) {
  const t = useTranslations("projects.detail");

  const [expanded, setExpanded] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const { data, loading, refetch } = useGetCommentRepliesQuery({
    variables: { data: { commentId, limit: 20, page: 1 } },
    skip: !expanded,
    fetchPolicy: "network-only",
  });

  const [createComment, { loading: createLoading }] =
    useCreateProjectCommentMutation();

  const [updateComment, { loading: updateLoading }] =
    useUpdateProjectCommentMutation();

  const [removeComment, { loading: removeLoading }] =
    useRemoveProjectCommentMutation();

  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyText, setEditingReplyText] = useState("");

  const replies = data?.getRepliesComment?.data ?? [];

  const handleSubmitReply = async (e: FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || createLoading) return;

    await createComment({
      variables: {
        data: { text: replyText.trim(), projectId, parentId: commentId },
      },
    });

    setReplyText("");
    setShowReplyInput(false);

    if (expanded) {
      refetch();
    } else {
      setExpanded(true);
    }
  };

  if (repliesCount === 0 && !canInteract) return null;

  return (
    <div className="border-border mt-2 ml-3 border-l-2 pl-3">
      <div className="flex items-center gap-3">
        {canInteract && (
          <button
            type="button"
            onClick={() => setShowReplyInput((v) => !v)}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            {t("replyAction")}
          </button>
        )}

        {repliesCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-primary flex items-center gap-1 text-xs hover:underline"
          >
            {expanded ? (
              <ChevronUp className="size-3" />
            ) : (
              <ChevronDown className="size-3" />
            )}
            {expanded
              ? t("repliesHide")
              : t("repliesShow", { count: repliesCount })}
          </button>
        )}
      </div>

      {showReplyInput && (
        <form onSubmit={handleSubmitReply} className="mt-2 flex gap-2">
          <Input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder={t("replyPlaceholder")}
            disabled={createLoading}
            className="h-8 text-sm"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!replyText.trim() || createLoading}
          >
            {t("commentSubmit")}
          </Button>
        </form>
      )}

      {expanded && (
        <div className="mt-2 space-y-2">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-muted/40 space-y-1 rounded-lg p-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))
          ) : replies.length === 0 ? (
            <p className="text-muted-foreground text-xs">{t("repliesEmpty")}</p>
          ) : (
            replies.map((reply) => (
              <div key={reply.id} className="bg-muted/40 rounded-lg p-2">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <Link
                    href={`/profile/${encodeURIComponent(reply.user.username)}`}
                    className="hover:text-foreground flex items-center gap-2 transition-colors"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={storageUrl(reply.user.avatar ?? "") ?? ""}
                        alt={reply.user.username}
                      />
                      <AvatarFallback className="text-xs">
                        {reply.user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">@{reply.user.username}</span>
                  </Link>
                  <span>
                    {new Date(reply.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {editingReplyId === reply.id ? (
                  <div className="mt-1 space-y-2">
                    <Input
                      value={editingReplyText}
                      onChange={(e) => setEditingReplyText(e.target.value)}
                      disabled={updateLoading}
                      className="text-sm"
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={async () => {
                          if (!editingReplyText.trim() || updateLoading) return;
                          await updateComment({
                            variables: {
                              data: {
                                id: reply.id,
                                text: editingReplyText.trim(),
                              },
                            },
                          });
                          setEditingReplyId(null);
                          setEditingReplyText("");
                          refetch();
                        }}
                        disabled={
                          updateLoading || editingReplyText.trim().length === 0
                        }
                      >
                        {t("commentEditSave")}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingReplyId(null);
                          setEditingReplyText("");
                        }}
                        disabled={updateLoading}
                      >
                        {t("commentEditCancel")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <p className="text-foreground mt-1 text-sm whitespace-pre-wrap">
                      {reply.text}
                    </p>
                    {canInteract && reply.user.id === profileId && (
                      <div className="mt-1 flex items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              size="icon-xs"
                              variant="ghost"
                              disabled={removeLoading || updateLoading}
                            >
                              <Ellipsis className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingReplyId(reply.id);
                                setEditingReplyText(reply.text);
                              }}
                              disabled={removeLoading || updateLoading}
                            >
                              {t("commentEdit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={async () => {
                                await removeComment({
                                  variables: { id: reply.id },
                                });
                                refetch();
                              }}
                              disabled={removeLoading || updateLoading}
                            >
                              {t("commentDelete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
