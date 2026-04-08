"use client";

import { Globe, Lock } from "lucide-react";
import { cn } from "@/utils/tw-merge";

type Props = {
  value: boolean;
  onChange: (v: boolean) => void;
  labelPublic: string;
  labelPrivate: string;
};

export function VisibilityToggle({
  value,
  onChange,
  labelPublic,
  labelPrivate,
}: Props) {
  return (
    <div className="border-border flex overflow-hidden rounded-lg border">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
          value
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:bg-muted"
        )}
      >
        <Globe className="h-4 w-4" />
        {labelPublic}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={cn(
          "flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
          !value
            ? "bg-primary text-primary-foreground"
            : "bg-background text-muted-foreground hover:bg-muted"
        )}
      >
        <Lock className="h-4 w-4" />
        {labelPrivate}
      </button>
    </div>
  );
}
