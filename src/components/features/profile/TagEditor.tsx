"use client";

import { useState, KeyboardEvent } from "react";
import { X, TrendingUp } from "lucide-react";
import { cn } from "@/utils/tw-merge";

type Props = {
  tags: string[];
  popularTags?: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
};

export function TagEditor({
  tags,
  popularTags,
  onAdd,
  onRemove,
  placeholder,
  hint,
  disabled,
}: Props) {
  const [input, setInput] = useState("");

  const commit = (raw: string) => {
    const tag = raw.trim().replace(/,$/, "").toLowerCase().replace(/\s+/g, "-");
    if (tag && !tags.includes(tag) && tags.length < 10) onAdd(tag);
    setInput("");
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      commit(input);
    }
    if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemove(tags[tags.length - 1]);
    }
  };

  const available = (popularTags ?? []).filter((t) => !tags.includes(t));

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "border-input bg-background flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border px-2 py-1.5",
          disabled && "pointer-events-none opacity-60"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-primary/10 text-primary flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium"
          >
            #{tag}
            <button
              type="button"
              onClick={() => onRemove(tag)}
              className="hover:text-destructive ml-0.5"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        <input
          className="placeholder:text-muted-foreground min-w-20 flex-1 bg-transparent text-sm outline-none"
          placeholder={tags.length === 0 ? (placeholder ?? "Add tag...") : ""}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => input.trim() && commit(input)}
          disabled={disabled}
        />
      </div>
      {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
      {available.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
          </span>
          {available.slice(0, 14).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onAdd(tag)}
              disabled={disabled}
              className="border-border hover:border-primary/40 hover:bg-primary/8 hover:text-primary cursor-pointer rounded-full border px-2 py-0.5 text-xs transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
