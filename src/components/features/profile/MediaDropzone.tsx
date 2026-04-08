"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Upload, Film, Loader2, AlertCircle, Check, X } from "lucide-react";
import { cn } from "@/utils/tw-merge";
import type { MediaFile } from "../../../types/profile/types";

type Props = {
  files: MediaFile[];
  onAdd: (files: File[]) => void;
  onRemove: (id: string) => void;
  hintLabel: string;
  typesLabel: string;
};

export function MediaDropzone({
  files,
  onAdd,
  onRemove,
  hintLabel,
  typesLabel,
}: Props) {
  const onDrop = useCallback((accepted: File[]) => onAdd(accepted), [onAdd]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
      "video/mp4": [],
      "video/quicktime": [],
      "video/webm": [],
    },
    maxSize: 100 * 1024 * 1024,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "border-border bg-muted/30 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
          isDragActive && "border-primary bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="text-muted-foreground mb-2 h-8 w-8" />
        <p className="text-muted-foreground text-sm font-medium">{hintLabel}</p>
        <p className="text-muted-foreground/70 mt-1 text-xs">{typesLabel}</p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {files.map((mf) => (
            <div key={mf.id} className="group relative">
              <div className="border-border bg-muted relative aspect-square overflow-hidden rounded-lg border">
                {mf.type === "image" ? (
                  <Image
                    src={mf.preview}
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
                {mf.uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  </div>
                )}
                {mf.error && (
                  <div className="bg-destructive/20 absolute inset-0 flex items-center justify-center">
                    <AlertCircle className="text-destructive h-5 w-5" />
                  </div>
                )}
                {mf.url && !mf.error && (
                  <div className="absolute top-1 right-1">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => onRemove(mf.id)}
                className="bg-background/90 border-border absolute -top-1.5 -right-1.5 hidden rounded-full border p-0.5 shadow group-hover:flex"
              >
                <X className="h-3 w-3" />
              </button>
              <p className="text-muted-foreground mt-1 truncate text-center text-[10px]">
                {mf.file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
