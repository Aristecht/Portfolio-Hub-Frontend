"use client";

import { SyntheticEvent, useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ReactCrop, {
  centerCrop,
  type PercentCrop,
  type PixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApolloClient } from "@apollo/client/react";
import { api } from "@/libs/api";
import { cn } from "@/utils/tw-merge";
import { authStore } from "@/store/auth/auth.store";
import { Spinner } from "@/components/common/ui/Spinner";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/Dialog";
import { Camera, Trash2, Upload } from "lucide-react";

interface AvatarUploadProps {
  currentAvatar?: string | null;
  username: string;
  onUploadSuccess?: (avatarUrl: string | null) => void;
}

interface UploadAvatarResponse {
  avatarUrl?: string | null;
  avatar?: string | null;
  url?: string | null;
  link?: string | null;
  location?: string | null;
  fileUrl?: string | null;
  data?: {
    avatarUrl?: string | null;
    avatar?: string | null;
    url?: string | null;
    link?: string | null;
    location?: string | null;
    fileUrl?: string | null;
  } | null;
}

export function AvatarUploadForm({
  currentAvatar,
  username,
  onUploadSuccess,
}: AvatarUploadProps) {
  const t = useTranslations("auth.settings.avatar");
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const queryClient = useQueryClient();
  const apolloClient = useApolloClient();
  const currentUser = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const nextCrop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 75,
        },
        1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(nextCrop);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > 10 * 1024 * 1024) {
        toast.error(t("tooLarge"), {
          description: t("tooLargeDescription"),
        });
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(t("invalidType"), {
          description: t("invalidTypeDescription"),
        });
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
        setIsOpen(true);
      });
      reader.readAsDataURL(file);
    },
    [t]
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const getCroppedImage = async (): Promise<Blob | null> => {
    if (!imgRef.current || !completedCrop) return null;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const image = imgRef.current;
    const scaleY = image.naturalHeight / image.height;
    const scaleX = image.naturalWidth / image.width;

    const targetSize = 512;
    canvas.height = targetSize;
    canvas.width = targetSize;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      targetSize,
      targetSize
    );
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        "image/webp",
        0.9
      );
    });
  };

  const uploadMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      const formData = new FormData();
      formData.append("file", blob, "avatar.webp");

      const response = await api.post<UploadAvatarResponse>(
        "/profile/upload",
        formData
      );
      return response.data;
    },
    onSuccess: async () => {
      toast.success(t("uploadSuccess"));

      const result = await apolloClient.refetchQueries({
        include: ["FindAuthProfile", "FindProfile"],
      });

      const profileData = result.find((r) => r.data?.findProfile)?.data
        ?.findProfile;
      const nextAvatar: string | null = profileData?.avatar ?? null;

      if (currentUser) {
        setUser({
          ...currentUser,
          avatar: nextAvatar,
        });
      }

      onUploadSuccess?.(nextAvatar);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      setIsOpen(false);
      setImageSrc("");
      setCrop(undefined);
      setCompletedCrop(undefined);
    },

    onError: () => {
      toast.error(t("uploadError"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/profile/remove");
    },
    onSuccess: () => {
      if (currentUser) {
        setUser({
          ...currentUser,
          avatar: null,
        });
      }

      toast.success(t("removeSuccess"));
      onUploadSuccess?.(null);
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      void apolloClient.refetchQueries({
        include: ["FindAuthProfile", "FindProfile"],
      });
    },

    onError: () => {
      toast.error(t("removeError"));
    },
  });

  const handleUpload = async () => {
    const blob = await getCroppedImage();
    if (!blob) {
      toast.error(t("processingError"));
      return;
    }
    uploadMutation.mutate(blob);
  };

  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  const isUploading = uploadMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  const S3_URL = process.env.NEXT_PUBLIC_S3_URL;

  function getAvatarUrl(avatar: string | null | undefined): string | null {
    if (!avatar) return null;
    if (avatar.startsWith("http://") || avatar.startsWith("https://"))
      return avatar;
    return `${S3_URL}/${avatar}`;
  }

  return (
    <>
      <div className="flex items-center gap-6">
        <div className="border-border bg-primary/10 text-primary relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-xl font-semibold">
          {currentAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={currentAvatar}
              src={getAvatarUrl(currentAvatar) ?? undefined}
              alt={username}
              className="size-full object-cover"
            />
          ) : (
            username.slice(0, 2).toUpperCase()
          )}
        </div>

        <div className="space-y-3">
          <div
            {...getRootProps()}
            className={cn(
              "cursor-pointer rounded-lg border-2 border-dashed p-4",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex items-center gap-3">
              {isDragActive ? <Upload /> : <Camera />}
              <p>{isDragActive ? t("dropActive") : t("upload")}</p>
            </div>
          </div>

          {currentAvatar && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner /> : <Trash2 />}
              {t("deleteButton")}
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[80vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("cropTitle")}</DialogTitle>
            <DialogDescription>{t("cropDescription")}</DialogDescription>
          </DialogHeader>

          {imageSrc && (
            <div className="flex justify-center overflow-hidden rounded-xl bg-black/5 p-2">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(pixelCrop) => setCompletedCrop(pixelCrop)}
                aspect={1}
                circularCrop
                keepSelection
                minWidth={120}
              >
                {/* react-image-crop requires a real img element for measuring/canvas crop */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Avatar crop preview"
                  onLoad={onImageLoad}
                  className="max-h-[50vh] w-auto max-w-full"
                />
              </ReactCrop>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {t("cancel")}
            </Button>

            <Button
              onClick={handleUpload}
              disabled={!completedCrop || isUploading}
            >
              {isUploading ? <Spinner /> : t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
