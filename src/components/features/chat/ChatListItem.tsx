import { useTranslations } from "next-intl";
import { format, isToday } from "date-fns";
import { cn } from "@/utils/tw-merge";
import type { ChatModel } from "./types";
import { UserAvatar } from "./UserAvatar";

function formatChatTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) return format(date, "HH:mm");
  return format(date, "dd.MM.yy");
}

type Props = {
  chat: ChatModel;
  currentUserId: string;
  isSelected: boolean;
  onClick: () => void;
  t: ReturnType<typeof useTranslations>;
  resolveOnline: (userId: string, fallback: boolean) => boolean;
};

export function ChatListItem({
  chat,
  currentUserId,
  isSelected,
  onClick,
  t,
  resolveOnline,
}: Props) {
  const otherMembers = chat.members.filter((m) => m.id !== currentUserId);
  const primary = otherMembers[0] ?? chat.members[0];
  const isOnline = otherMembers.some((m) => resolveOnline(m.id, m.isOnline));

  let lastMessageText = chat.lastMessage?.text ?? "";
  if (lastMessageText.length > 40)
    lastMessageText = lastMessageText.slice(0, 40) + "…";
  if (chat.lastMessage?.senderId === currentUserId && lastMessageText) {
    lastMessageText = `${t("you")}: ${lastMessageText}`;
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "hover:bg-muted/60 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
        isSelected && "bg-muted"
      )}
    >
      <UserAvatar
        avatar={primary?.avatar}
        displayName={primary?.displayName ?? "?"}
        isOnline={isOnline}
        size="md"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold">
            {otherMembers.map((m) => m.displayName).join(", ") ||
              primary?.displayName}
          </span>
          {chat.lastMessage && (
            <span className="text-muted-foreground shrink-0 text-xs">
              {formatChatTime(chat.lastMessage.createdAt)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground truncate text-xs">
            {lastMessageText || (
              <span className="italic">{t("noMessages")}</span>
            )}
          </span>
          {chat.unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-bold">
              {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
