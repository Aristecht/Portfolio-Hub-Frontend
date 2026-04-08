"use client";

import { useRef, useState, ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { ImagePlus, Loader2, X } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { VisibilityToggle } from "./VisibilityToggle";
import { storageUrl } from "@/utils/storage-url";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  initialTitle?: string;
  initialIsPublic?: boolean;
  initialThumbnailUrl?: string;
  onSubmit: (data: {
    title: string;
    isPublic: boolean;
    thumbnailFile?: File;
  }) => void;
  loading: boolean;
};

export function AlbumFormDialog({
  open,
  onOpenChange,
  mode,
  initialTitle = "",
  initialIsPublic = true,
  initialThumbnailUrl,
  onSubmit,
  loading,
}: Props) {
  const t = useTranslations("profile");
  const [title, setTitle] = useState(initialTitle);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialThumbnailUrl ? (storageUrl(initialThumbnailUrl) ?? null) : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? t("album.createTitle") : t("album.editTitle")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Thumbnail */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("album.thumbnailLabel")}
            </label>
            <div
              className="bg-muted border-border hover:border-primary/50 relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="thumbnail preview"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveThumbnail();
                    }}
                    className="bg-background/80 hover:bg-background absolute top-2 right-2 rounded-full p-1 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-xs">{t("album.thumbnailHint")}</span>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("album.titleLabel")}
            </label>
            <Input
              placeholder={t("album.titlePlaceholder")}
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">
              {t("album.visibilityLabel")}
            </label>
            <VisibilityToggle
              value={isPublic}
              onChange={setIsPublic}
              labelPublic={t("album.public")}
              labelPrivate={t("album.private")}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() =>
              onSubmit({
                title: title.trim(),
                isPublic,
                thumbnailFile: thumbnailFile ?? undefined,
              })
            }
            disabled={loading || !title.trim()}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "create" ? t("create") : t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
