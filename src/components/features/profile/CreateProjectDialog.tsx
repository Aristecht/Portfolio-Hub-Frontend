"use client";

import { useState, type ChangeEvent } from "react";
import {
  Globe,
  Lock,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/utils/tw-merge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { TagEditor } from "./TagEditor";
import { VisibilityToggle } from "./VisibilityToggle";
import { MediaDropzone } from "./MediaDropzone";
import type { ProfileAlbum, MediaFile } from "../../../types/profile/types";

export type CreateProjectValues = {
  albumId: string;
  title: string;
  description?: string;
  tags: string[];
  isPublic: boolean;
  mediaFiles: File[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  albums: ProfileAlbum[];
  popularTags: string[];
  onPublish: (values: CreateProjectValues) => Promise<void>;
  publishing: boolean;
};

export function CreateProjectDialog({
  open,
  onClose,
  albums,
  popularTags,
  onPublish,
  publishing,
}: Props) {
  const t = useTranslations("profile");

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [albumId, setAlbumId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const reset = () => {
    setStep(1);
    setAlbumId("");
    setTitle("");
    setDescription("");
    setTags([]);
    setIsPublic(true);
    setMediaFiles((prev) => {
      prev.forEach((f) => URL.revokeObjectURL(f.preview));
      return [];
    });
  };

  const handleClose = () => {
    if (!publishing) {
      onClose();
      reset();
    }
  };

  const addMediaFiles = (files: File[]) => {
    const newFiles: MediaFile[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      uploading: false,
      error: false,
    }));
    setMediaFiles((prev) => [...prev, ...newFiles]);
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handlePublish = async () => {
    await onPublish({
      albumId,
      title,
      description: description || undefined,
      tags,
      isPublic,
      mediaFiles: mediaFiles.map((f) => f.file),
    });
    reset();
  };

  const canNext =
    step === 1 ? !!title.trim() && !!albumId && albums.length > 0 : true;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("project.createTitle")}</DialogTitle>
          <div className="mt-2 flex items-center gap-2">
            {([1, 2, 3] as const).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors",
                    step > s
                      ? "bg-primary text-primary-foreground"
                      : step === s
                        ? "bg-primary text-primary-foreground ring-primary/20 ring-4"
                        : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <Check className="h-3 w-3" /> : s}
                </div>
                <span
                  className={cn(
                    "text-xs",
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {t(`project.step${s}Label` as "project.step1Label")}
                </span>
                {s < 3 && (
                  <ChevronRight className="text-muted-foreground h-3 w-3" />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] space-y-4 overflow-y-auto py-2 pr-1">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  {t("project.chooseAlbum")}
                </label>
                {albums.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    {t("project.noAlbums")}
                  </p>
                ) : (
                  <div className="border-input bg-background flex flex-wrap gap-2 rounded-md border p-2">
                    {albums.map((a: ProfileAlbum) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAlbumId(a.id)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                          albumId === a.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        )}
                      >
                        {a.isPublic ? (
                          <Globe className="h-3 w-3" />
                        ) : (
                          <Lock className="h-3 w-3" />
                        )}
                        {a.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
            </>
          )}

          {step === 2 && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                {t("project.mediaLabel")}
              </label>
              <MediaDropzone
                files={mediaFiles}
                onAdd={addMediaFiles}
                onRemove={removeMediaFile}
                hintLabel={t("project.mediaHint")}
                typesLabel={t("project.mediaTypes")}
              />
            </div>
          )}

          {step === 3 && (
            <>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  {t("project.tagsLabel")}
                </label>
                <TagEditor
                  tags={tags}
                  popularTags={popularTags}
                  onAdd={(tag) => setTags((prev) => [...prev, tag])}
                  onRemove={(tag) =>
                    setTags((prev) => prev.filter((t) => t !== tag))
                  }
                  placeholder={t("project.tagsPlaceholder")}
                  hint={t("project.tagsHint")}
                  disabled={publishing}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  {t("project.visibilityLabel")}
                </label>
                <VisibilityToggle
                  value={isPublic}
                  onChange={setIsPublic}
                  labelPublic={t("project.public")}
                  labelPrivate={t("project.private")}
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-row gap-2">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
              disabled={publishing}
              className="mr-auto"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("project.back")}
            </Button>
          )}
          <Button variant="outline" onClick={handleClose} disabled={publishing}>
            {t("cancel")}
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep((s) => (s + 1) as 2 | 3)}
              disabled={!canNext}
            >
              {t("project.next")}
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handlePublish}
              disabled={publishing || !title.trim() || !albumId}
              variant="gradient"
            >
              {publishing && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("project.publish")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
