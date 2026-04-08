import { useTranslations } from "next-intl";
import { format, isToday, isYesterday } from "date-fns";
import { MoreVertical, Pencil, Trash2, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { cn } from "@/utils/tw-merge";
import type { MessageModel } from "./types";
import { UserAvatar } from "./UserAvatar";

function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) return format(date, "HH:mm");
  if (isYesterday(date)) return `Yesterday ${format(date, "HH:mm")}`;
  return format(date, "dd MMM HH:mm");
}

type Props = {
  message: MessageModel;
  isOwn: boolean;
  t: ReturnType<typeof useTranslations>;
  onEdit: (message: MessageModel) => void;
  onDelete: (messageId: string) => void;
};

export function MessageBubble({ message, isOwn, t, onEdit, onDelete }: Props) {
  return (
    <div
      className={cn(
        "group flex gap-2",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isOwn && (
        <UserAvatar
          avatar={message.sender.avatar}
          displayName={message.sender.displayName}
          size="sm"
        />
      )}
      <div
        className={cn(
          "flex max-w-[70%] flex-col gap-1",
          isOwn ? "items-end" : "items-start"
        )}
      >
        {!isOwn && (
          <span className="text-muted-foreground text-xs font-medium">
            {message.sender.displayName}
          </span>
        )}
        <div className="flex items-end gap-1.5">
          {isOwn && (
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(message)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(message.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t("delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div
            className={cn(
              "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
              isOwn
                ? "bg-primary text-primary-foreground rounded-tr-sm"
                : "bg-muted text-foreground rounded-tl-sm"
            )}
          >
            <p className="break-all whitespace-pre-wrap">{message.text}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground text-[10px]">
            {formatMessageTime(message.createdAt)}
          </span>
          {message.isEdited && (
            <span className="text-muted-foreground text-[10px]">
              · {t("edited")}
            </span>
          )}
          {isOwn &&
            (message.isRead ? (
              <CheckCheck className="text-primary h-3 w-3" />
            ) : (
              <Check className="text-muted-foreground h-3 w-3" />
            ))}
        </div>
      </div>
    </div>
  );
}
