"use client";

import { FormEvent, useMemo, useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  useCreateProjectCommentMutation,
  useFindCommentsByProjectQuery,
  useFindOneProjectQuery,
  useFollowUserMutation,
  useIncrementProjectViewMutation,
  useRemoveProjectCommentMutation,
  useUnfollowUserMutation,
  useUpdateProjectCommentMutation,
} from "@/generated/output";
import type {
  FindCommentsByProjectQuery,
  FindOneProjectQuery,
} from "@/generated/output";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { Separator } from "@/components/common/ui/Separator";
import { ProjectCommentsSection } from "@/components/features/projects/ProjectCommentsSection";
import { useAuth } from "@/hooks/useCurrentUser";
import { ProjectMediaCarousel } from "@/components/features/projects/ProjectMediaCarousel";
import { ProjectAuthorBar } from "@/components/features/projects/ProjectAuthorBar";

function ProjectDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="aspect-video w-full rounded-2xl" />
      <div className="grid grid-cols-3 gap-3 sm:max-w-md">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

export function ProjectDetailClient({ id }: { id: string }) {
  const t = useTranslations("projects.detail");
  const { isAuthenticated, loading: authLoading, profile } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  const { data, loading, error, previousData } = useFindOneProjectQuery({
    variables: { projectId: id },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: commentsData,
    loading: commentsLoading,
    refetch: refetchComments,
    fetchMore,
  } = useFindCommentsByProjectQuery({
    variables: { projectId: id, page: 1, limit: 20 },
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  type CommentItem =
    FindCommentsByProjectQuery["findCommentByProject"]["data"][number];
  const [commentsList, setCommentsList] = useState<CommentItem[]>([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsTotalPages, setCommentsTotalPages] = useState(1);
  const [commentsTotalCount, setCommentsTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const [createComment, { loading: createCommentLoading }] =
    useCreateProjectCommentMutation();
  const [updateProjectComment, { loading: updateCommentLoading }] =
    useUpdateProjectCommentMutation();
  const [removeProjectComment, { loading: removeCommentLoading }] =
    useRemoveProjectCommentMutation();

  type ProjectType = FindOneProjectQuery["findOneProject"];
  const project: ProjectType | undefined =
    data?.findOneProject ?? previousData?.findOneProject;
  const comments = commentsList;

  const commentsTotal = commentsTotalCount || comments.length;

  useEffect(() => {
    if (!commentsData?.findCommentByProject) return;
    const meta = commentsData.findCommentByProject.meta;
    const page = meta?.page ?? 1;
    const totalPages = meta?.totalPages ?? 1;
    const total = meta?.total ?? commentsData.findCommentByProject.data.length;
    if (page === 1) {
      setCommentsList(commentsData.findCommentByProject.data ?? []);
      setCommentsPage(1);
      setCommentsTotalPages(totalPages);
      setCommentsTotalCount(total);
    }
  }, [commentsData]);

  const [incrementView] = useIncrementProjectViewMutation();
  const viewIncrementedRef = useRef(false);

  useEffect(() => {
    if (viewIncrementedRef.current) return;
    viewIncrementedRef.current = true;
    void incrementView({ variables: { projectId: id } }).catch((e) => {
      console.error("Failed to increment project view", e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const canInteract = isAuthenticated && !authLoading;
  const canSubmitComment = canInteract && commentText.trim().length > 0;

  const sortedComments = useMemo(
    () =>
      [...comments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [comments]
  );

  const handleSubmitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmitComment) {
      return;
    }

    await createComment({
      variables: {
        data: {
          projectId: id,
          text: commentText.trim(),
        },
      },
    });

    setCommentText("");
    await refetchComments({ projectId: id, page: 1, limit: 20 });
  };

  const handleStartEditComment = (commentId: string, text: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(text);
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
  };

  const handleSaveEditedComment = async () => {
    if (!editingCommentId || !editingCommentText.trim()) {
      return;
    }

    await updateProjectComment({
      variables: {
        data: {
          id: editingCommentId,
          text: editingCommentText.trim(),
        },
      },
    });

    handleCancelEditComment();
    await refetchComments({ projectId: id, page: 1, limit: 20 });
  };

  const handleDeleteComment = async (commentId: string) => {
    await removeProjectComment({ variables: { id: commentId } });
    await refetchComments({ projectId: id, page: 1, limit: 20 });
  };

  const loadMoreComments = async () => {
    if (loadingMore) return;
    const nextPage = commentsPage + 1;
    if (nextPage > commentsTotalPages) return;
    if (!fetchMore) return;
    try {
      setLoadingMore(true);
      const res = await fetchMore({
        variables: { projectId: id, page: nextPage, limit: 20 },
      });
      const newData = res?.data?.findCommentByProject?.data ?? [];
      const meta = res?.data?.findCommentByProject?.meta;
      setCommentsList((prev) => [...prev, ...newData]);
      setCommentsPage(nextPage);
      if (meta) {
        setCommentsTotalPages(meta.totalPages ?? commentsTotalPages);
        setCommentsTotalCount(meta.total ?? commentsTotalCount);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const [follow, { loading: followLoading }] = useFollowUserMutation();
  const [unfollow, { loading: unfollowLoading }] = useUnfollowUserMutation();

  const [optimisticIsFollowing, setOptimisticIsFollowing] = useState<
    boolean | null
  >(null);
  const [optimisticFollowers, setOptimisticFollowers] = useState<number | null>(
    null
  );

  const authorData = project?.album?.user ?? null;

  const isFollowing =
    optimisticIsFollowing !== null
      ? optimisticIsFollowing
      : (project?.album.user.isFollowing ?? false);

  const displayFollowers =
    optimisticFollowers !== null
      ? optimisticFollowers
      : (authorData?.followers ?? null);

  const handleFollow = async () => {
    if (!canInteract || followLoading || unfollowLoading) return;

    const newState = !isFollowing;
    const currentFollowers = displayFollowers ?? 0;
    setOptimisticIsFollowing(newState);
    setOptimisticFollowers(
      newState ? currentFollowers + 1 : Math.max(0, currentFollowers - 1)
    );

    try {
      if (isFollowing) {
        await unfollow({ variables: { channelId: authorData?.id || "" } });
      } else {
        await follow({ variables: { channelId: authorData?.id || "" } });
      }
    } catch {
      setOptimisticIsFollowing(!newState);
      setOptimisticFollowers(currentFollowers);
    }
  };

  useEffect(() => {
    setOptimisticIsFollowing(null);
    setOptimisticFollowers(null);
  }, [project?.id]);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToProjects")}
      </Link>

      {loading && !project ? (
        <ProjectDetailSkeleton />
      ) : error && !project ? (
        <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-4">
          <p className="text-destructive text-sm font-medium">
            {t("notFound")}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">{error.message}</p>
        </div>
      ) : !project ? (
        <p className="text-muted-foreground">{t("notFound")}</p>
      ) : (
        <>
          <div className="space-y-4">
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              {project.title}
            </h1>

            <ProjectMediaCarousel media={project.media} title={project.title} />

            {authorData && (
              <ProjectAuthorBar
                author={{
                  id: authorData.id ?? "",
                  username: authorData.username ?? "",
                  avatar: authorData.avatar ?? null,
                  followers: displayFollowers,
                }}
                canInteract={canInteract}
                projectId={project.id}
                isOwnProfile={profile?.id === (authorData.id ?? "")}
                isFollowing={isFollowing}
                onFollow={handleFollow}
                followLoading={followLoading || unfollowLoading}
                key={project.id}
                project={project}
                currentUserId={profile?.id}
              />
            )}

            {project.album && (
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground text-sm">
                  {t("album")}:
                </span>
                <Link
                  href={`/albums/${project.album.id}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  {project.album.title}
                </Link>
              </div>
            )}

            <div className="">
              <h1 className="mb-1.5 font-medium">{t("description")}</h1>
              <p className="text-muted-foreground text-sm leading-6 whitespace-pre-wrap">
                {project.description || t("noDescription")}
              </p>
            </div>
          </div>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted text-primary rounded-full px-2.5 py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <Separator />

          <ProjectCommentsSection
            projectId={id}
            commentsTotal={commentsTotal}
            canInteract={canInteract}
            commentText={commentText}
            onCommentTextChange={setCommentText}
            canSubmitComment={canSubmitComment}
            createCommentLoading={createCommentLoading}
            onSubmitComment={handleSubmitComment}
            commentsLoading={commentsLoading || loadingMore}
            sortedComments={sortedComments}
            loadMoreComments={loadMoreComments}
            hasMoreComments={commentsPage < commentsTotalPages}
            editingCommentId={editingCommentId}
            editingCommentText={editingCommentText}
            onEditingCommentTextChange={setEditingCommentText}
            onSaveEditedComment={handleSaveEditedComment}
            onCancelEditComment={handleCancelEditComment}
            onStartEditComment={handleStartEditComment}
            onDeleteComment={handleDeleteComment}
            updateCommentLoading={updateCommentLoading}
            removeCommentLoading={removeCommentLoading}
            profileId={profile?.id}
          />
        </>
      )}
    </div>
  );
}
