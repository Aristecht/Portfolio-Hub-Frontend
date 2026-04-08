"use client";

import { useState, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { Loader2, X, Film } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { TagEditor } from "./TagEditor";
import { VisibilityToggle } from "./VisibilityToggle";
import { MediaDropzone } from "./MediaDropzone";
import { storageUrl } from "@/utils/storage-url";
import type { ProfileProject, MediaFile } from "../../../types/profile/types";

export type EditProjectValues = {
  title: string;
  description?: string;
  isPublic: boolean;
  tagsToAdd: string[];
  tagsToRemove: string[];
  mediaToDelete: string[];
  mediaToAdd: File[];
};

type Props = {
  project: ProfileProject | null;
  onClose: () => void;
  popularTags: string[];
  onSave: (projectId: string, values: EditProjectValues) => void;
  loading: boolean;
};

export function EditProjectDialog({
  project,
  onClose,
  popularTags,
  onSave,
  loading,
}: Props) {
  const t = useTranslations("profile");

  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [isPublic, setIsPublic] = useState(project?.isPublic ?? true);
  const [tags, setTags] = useState<string[]>(project ? [...project.tags] : []);
  const [pendingAdd, setPendingAdd] = useState<string[]>([]);
  const [pendingRemove, setPendingRemove] = useState<string[]>([]);
  const [mediaToDelete, setMediaToDelete] = useState<string[]>([]);
  const [newMediaFiles, setNewMediaFiles] = useState<MediaFile[]>([]);

  const addTag = (tag: string) => {
    if (tags.includes(tag)) return;
    setTags((p) => [...p, tag]);
    setPendingAdd((p) => [...p, tag]);
    setPendingRemove((p) => p.filter((t) => t !== tag));
  };

  const removeTag = (tag: string) => {
    setTags((p) => p.filter((t) => t !== tag));
    if (project?.tags.includes(tag)) {
      setPendingRemove((p) => [...p, tag]);
    }
    setPendingAdd((p) => p.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!project || !title.trim()) return;
    onSave(project.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      isPublic,
      tagsToAdd: pendingAdd,
      tagsToRemove: pendingRemove,
      mediaToDelete,
      mediaToAdd: newMediaFiles.map((f) => f.file),
    });
  };

  const existingMedia = (project?.media ?? []).filter(
    (m) => !mediaToDelete.includes(m.id)
  );

  const addNewFiles = (files: File[]) => {
    const mapped: MediaFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      uploading: false,
      error: false,
    }));
    setNewMediaFiles((prev) => [...prev, ...mapped]);
  };

  const removeNewFile = (id: string) => {
    setNewMediaFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
  };

  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("project.editTitle")}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] space-y-5 overflow-y-auto py-2 pr-1">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("project.titleLabel")}
            </label>
            <Input
              placeholder={t("project.titlePlaceholder")}
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("project.descriptionLabel")}
            </label>
            <textarea
              placeholder={t("project.descriptionPlaceholder")}
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              rows={3}
              className="border-border/50 bg-input placeholder:text-muted-foreground hover:border-border/80 focus-visible:border-primary focus-visible:ring-primary/20 dark:bg-input/50 w-full resize-none rounded-lg border px-3 py-2 text-sm transition-all duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="">
            <label className="mb-2 block text-sm font-medium">
              {t("project.mediaLabel")}
            </label>
            {existingMedia.length > 0 && (
              <div className="mb-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {existingMedia.map((m) => (
                  <div key={m.id} className="group relative">
                    <div className="border-border bg-muted relative aspect-square overflow-hidden rounded-lg border">
                      {m.mediaType === "IMAGE" ? (
                        <Image
                          src={storageUrl(m.url)!}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Film className="text-muted-foreground h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaToDelete((prev) => [...prev, m.id])
                      }
                      className="bg-background/90 border-border absolute -top-1.5 -right-1.5 hidden rounded-full border p-0.5 shadow group-hover:flex"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <MediaDropzone
              files={newMediaFiles}
              onAdd={addNewFiles}
              onRemove={removeNewFile}
              hintLabel={t("project.mediaHint")}
              typesLabel={t("project.mediaTypes")}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("project.tagsLabel")}
            </label>
            <TagEditor
              tags={tags}
              popularTags={popularTags}
              onAdd={addTag}
              onRemove={removeTag}
              placeholder={t("project.tagsPlaceholder")}
              hint={t("project.tagsHint")}
              disabled={loading}
            />
          </div>

          <div className="">
            <label className="mb-2 block text-sm font-medium">
              {t("project.visibilityLabel")}
            </label>
            <VisibilityToggle
              value={isPublic}
              onChange={setIsPublic}
              labelPublic={t("project.public")}
              labelPrivate={t("project.private")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} disabled={loading || !title.trim()}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
