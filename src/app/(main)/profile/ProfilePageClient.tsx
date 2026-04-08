"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/utils/tw-merge";
import { useAuth } from "@/hooks/useCurrentUser";
import { api } from "@/libs/api";
import {
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useRemoveAlbumMutation,
  useCreateDraftProjectMutation,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddTagMutation,
  useRemoveTagMutation,
  useGetChannelQuery,
  usePopularTagsQuery,
} from "@/generated/output";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { ProfileHeader } from "../../../components/features/profile/ProfileHeader";
import { ProjectsTab } from "../../../components/features/profile/ProjectsTab";
import { AlbumsTab } from "../../../components/features/profile/AlbumsTab";
import { AlbumFormDialog } from "../../../components/features/profile/AlbumFormDialog";
import { ConfirmDeleteDialog } from "../../../components/features/profile/ConfirmDeleteDialog";

import {
  EditProjectDialog,
  type EditProjectValues,
} from "../../../components/features/profile/EditProjectDialog";
import type {
  ProfileAlbum,
  ProfileProject,
} from "../../../types/profile/types";
import {
  CreateProjectDialog,
  CreateProjectValues,
} from "../../../components/features/profile/CreateProjectDialog";

export function ProfilePageClient() {
  const t = useTranslations("profile");
  const { profile } = useAuth();
  const username = profile?.username ?? "";

  const { data, loading, refetch } = useGetChannelQuery({
    variables: { username },
    skip: !username,
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const { data: tagsData } = usePopularTagsQuery({
    variables: { limit: 20 },
  });

  const channel = data?.getChannel;
  const popularTags = (tagsData?.popularTags ?? []).map((item) => item.tag);

  const [activeTab, setActiveTab] = useState<"projects" | "albums">("projects");
  const [createAlbumOpen, setCreateAlbumOpen] = useState(false);
  const [editAlbum, setEditAlbum] = useState<ProfileAlbum | null>(null);
  const [deleteAlbum, setDeleteAlbum] = useState<ProfileAlbum | null>(null);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [editProject, setEditProject] = useState<ProfileProject | null>(null);
  const [deleteProject, setDeleteProject] = useState<ProfileProject | null>(
    null
  );

  const refetchChannel = { refetchQueries: ["getChannel"] };

  const [createAlbumLoading, setCreateAlbumLoading] = useState(false);
  const [editAlbumLoading, setEditAlbumLoading] = useState(false);

  const [createAlbumMut] = useCreateAlbumMutation();
  const [updateAlbumMut] = useUpdateAlbumMutation();

  const [removeAlbum, { loading: removingAlbum }] = useRemoveAlbumMutation({
    ...refetchChannel,
    onCompleted: () => {
      toast.success(t("album.deleteSuccess"));
      setDeleteAlbum(null);
    },
    onError: () => toast.error(t("album.deleteError")),
  });

  const [createDraft] = useCreateDraftProjectMutation();
  const [createProject] = useCreateProjectMutation({ ...refetchChannel });

  const [updateProject, { loading: updatingProject }] =
    useUpdateProjectMutation({
      ...refetchChannel,
      onCompleted: () => {
        toast.success(t("project.updateSuccess"));
        setEditProject(null);
      },
      onError: () => toast.error(t("project.updateError")),
    });

  const [deleteProjectMut, { loading: deletingProject }] =
    useDeleteProjectMutation({
      ...refetchChannel,
      onCompleted: () => {
        toast.success(t("project.deleteSuccess"));
        setDeleteProject(null);
      },
      onError: () => toast.error(t("project.deleteError")),
    });

  const [addTag] = useAddTagMutation();
  const [removeTag] = useRemoveTagMutation();

  const handleCreateAlbum = async (data: {
    title: string;
    isPublic: boolean;
    thumbnailFile?: File;
  }) => {
    setCreateAlbumLoading(true);
    try {
      const result = await createAlbumMut({
        variables: { data: { title: data.title, isPublic: data.isPublic } },
      });
      const id = result.data?.createAlbum.id;
      if (id && data.thumbnailFile) {
        try {
          const formData = new FormData();
          formData.append("file", data.thumbnailFile);
          const res = await api.post<{ thumbnailUrl: string }>(
            `/albums/upload`,
            formData
          );
          if (res.data?.thumbnailUrl) {
            await updateAlbumMut({
              variables: { data: { id, thumbnailUrl: res.data.thumbnailUrl } },
            });
          }
        } catch {
          toast.error(t("album.uploadError"));
        }
      }
      toast.success(t("album.createSuccess"));
      await refetch();
      setCreateAlbumOpen(false);
    } catch {
      toast.error(t("album.createError"));
    } finally {
      setCreateAlbumLoading(false);
    }
  };

  const handleEditAlbum = async (data: {
    title: string;
    isPublic: boolean;
    thumbnailFile?: File;
  }) => {
    if (!editAlbum) return;
    setEditAlbumLoading(true);
    try {
      let thumbnailUrl: string | undefined;
      if (data.thumbnailFile) {
        try {
          const formData = new FormData();
          formData.append("file", data.thumbnailFile);
          const res = await api.post<{ thumbnailUrl: string }>(
            `/albums/upload`,
            formData
          );
          thumbnailUrl = res.data?.thumbnailUrl;
        } catch {
          toast.error(t("album.uploadError"));
        }
      }
      await updateAlbumMut({
        variables: {
          data: {
            id: editAlbum.id,
            title: data.title,
            isPublic: data.isPublic,
            ...(thumbnailUrl ? { thumbnailUrl } : {}),
          },
        },
      });
      toast.success(t("album.updateSuccess"));
      await refetch();
      setEditAlbum(null);
    } catch {
      toast.error(t("album.updateError"));
    } finally {
      setEditAlbumLoading(false);
    }
  };

  const handlePublishProject = async (values: CreateProjectValues) => {
    setPublishing(true);
    try {
      const draftResult = await createDraft({
        variables: { albumId: values.albumId },
      });
      const projectId = draftResult.data?.createDraftProject;
      if (!projectId) throw new Error("Failed to create draft");

      const mediaUrls: string[] = [];

      const imageFiles = values.mediaFiles.filter((f) =>
        f.type.startsWith("image/")
      );
      const videoFiles = values.mediaFiles.filter((f) =>
        f.type.startsWith("video/")
      );

      if (imageFiles.length > 0) {
        try {
          const formData = new FormData();
          imageFiles.forEach((f) => formData.append("files", f));
          const res = await api.post<{
            images: { url: string }[];
          }>(`/projects/${projectId}/images`, formData);
          if (res.data?.images) {
            mediaUrls.push(...res.data.images.map((i) => i.url));
          }
        } catch {
          toast.error(t("project.uploadError"));
        }
      }

      for (const file of videoFiles) {
        try {
          const formData = new FormData();
          formData.append("video", file);
          const res = await api.post<{ url: string }>(
            `/projects/${projectId}/video`,
            formData
          );
          if (res.data?.url) mediaUrls.push(res.data.url);
        } catch {
          toast.error(t("project.uploadError"));
        }
      }

      await createProject({
        variables: {
          data: {
            projectId,
            title: values.title,
            description: values.description,
            tags: values.tags,
            isPublic: values.isPublic,
          },
        },
      });

      if (mediaUrls.length > 0) {
        await updateProject({
          variables: { data: { projectId, media: mediaUrls } },
        });
      }

      toast.success(t("project.createSuccess"));
      setCreateProjectOpen(false);
      refetch();
    } catch {
      toast.error(t("project.createError"));
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveEditProject = async (
    projectId: string,
    values: EditProjectValues
  ) => {
    for (const mediaId of values.mediaToDelete) {
      try {
        await api.post(`/projects/media/${mediaId}`);
      } catch {
        toast.error(t("project.uploadError"));
      }
    }

    const imageFiles = values.mediaToAdd.filter((f) =>
      f.type.startsWith("image/")
    );
    const videoFiles = values.mediaToAdd.filter((f) =>
      f.type.startsWith("video/")
    );

    if (imageFiles.length > 0) {
      try {
        const formData = new FormData();
        imageFiles.forEach((f) => formData.append("files", f));
        await api.post(`/projects/${projectId}/images`, formData);
      } catch {
        toast.error(t("project.uploadError"));
      }
    }

    for (const file of videoFiles) {
      try {
        const formData = new FormData();
        formData.append("video", file);
        await api.post(`/projects/${projectId}/video`, formData);
      } catch {
        toast.error(t("project.uploadError"));
      }
    }

    await Promise.allSettled([
      ...values.tagsToAdd.map((tag) =>
        addTag({ variables: { data: { projectId, tag } } })
      ),
      ...values.tagsToRemove.map((tag) =>
        removeTag({ variables: { data: { projectId, tag } } })
      ),
    ]);
    updateProject({
      variables: {
        data: {
          projectId,
          title: values.title,
          description: values.description,
          isPublic: values.isPublic,
        },
      },
    });
  };

  if (loading && !channel) {
    return (
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-video rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!channel) return null;

  const albums = channel.albums.filter((a) => a.id);
  const projects = channel.projects.filter((p) => p.id && p.title);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <ProfileHeader channel={channel} />

      <div className="border-border bg-muted/30 flex gap-1 rounded-xl border p-1">
        {(["projects", "albums"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-primary text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t(tab)}
            <span className="text-muted-foreground ml-1.5 text-xs">
              ({tab === "projects" ? projects.length : albums.length})
            </span>
          </button>
        ))}
      </div>

      {activeTab === "projects" && (
        <ProjectsTab
          projects={projects}
          onCreateProject={() => setCreateProjectOpen(true)}
          onEditProject={setEditProject}
          onDeleteProject={setDeleteProject}
        />
      )}

      {activeTab === "albums" && (
        <AlbumsTab
          albums={albums}
          onCreateAlbum={() => setCreateAlbumOpen(true)}
          onEditAlbum={setEditAlbum}
          onDeleteAlbum={setDeleteAlbum}
        />
      )}

      <AlbumFormDialog
        open={createAlbumOpen}
        onOpenChange={setCreateAlbumOpen}
        mode="create"
        onSubmit={handleCreateAlbum}
        loading={createAlbumLoading}
      />

      <AlbumFormDialog
        key={editAlbum?.id ?? "edit-album"}
        open={!!editAlbum}
        onOpenChange={(o) => !o && setEditAlbum(null)}
        mode="edit"
        initialTitle={editAlbum?.title}
        initialIsPublic={editAlbum?.isPublic}
        initialThumbnailUrl={editAlbum?.thumbnailUrl}
        onSubmit={handleEditAlbum}
        loading={editAlbumLoading}
      />

      <ConfirmDeleteDialog
        open={!!deleteAlbum}
        onOpenChange={(o) => !o && setDeleteAlbum(null)}
        name={deleteAlbum?.title ?? ""}
        onConfirm={() =>
          deleteAlbum && removeAlbum({ variables: { id: deleteAlbum.id } })
        }
        loading={removingAlbum}
      />

      <ConfirmDeleteDialog
        open={!!deleteProject}
        onOpenChange={(o) => !o && setDeleteProject(null)}
        name={deleteProject?.title ?? ""}
        onConfirm={() =>
          deleteProject &&
          deleteProjectMut({ variables: { projectId: deleteProject.id } })
        }
        loading={deletingProject}
      />

      <CreateProjectDialog
        open={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        albums={albums}
        popularTags={popularTags}
        onPublish={handlePublishProject}
        publishing={publishing}
      />

      <EditProjectDialog
        key={editProject?.id ?? "edit-project"}
        project={editProject}
        onClose={() => setEditProject(null)}
        popularTags={popularTags}
        onSave={handleSaveEditProject}
        loading={updatingProject}
      />
    </div>
  );
}
