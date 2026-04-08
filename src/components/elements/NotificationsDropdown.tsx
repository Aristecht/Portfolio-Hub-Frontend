"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import { cn } from "@/utils/tw-merge";
import { useTranslations } from "next-intl";
import {
  useFindNotificationsByUserQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "@/generated/output";

const LIMIT = 15;

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

type Notification = {
  id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const unreadCount = useUnreadNotifications();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("notifications");

  const { data, loading, fetchMore, refetch } = useFindNotificationsByUserQuery(
    {
      variables: { page: 1, limit: LIMIT },
      skip: !open,
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    }
  );

  const [markAsRead] = useMarkNotificationAsReadMutation({
    refetchQueries: ["findNotificationsUnreadCount"],
  });

  const [markAllRead] = useMarkAllNotificationsAsReadMutation({
    onCompleted: () => refetch(),
    refetchQueries: ["findNotificationsUnreadCount"],
  });

  const notifications: Notification[] =
    data?.findNotificationsByUser?.data ?? [];
  const meta = data?.findNotificationsByUser?.meta;
  const hasMore = meta ? meta.page < meta.totalPages : false;

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    fetchMore({
      variables: { page: (meta?.page ?? 1) + 1, limit: LIMIT },
      updateQuery(prev, { fetchMoreResult }) {
        if (!fetchMoreResult) return prev;
        return {
          findNotificationsByUser: {
            ...fetchMoreResult.findNotificationsByUser,
            data: [
              ...prev.findNotificationsByUser.data,
              ...fetchMoreResult.findNotificationsByUser.data,
            ],
          },
        };
      },
    });
  }, [hasMore, loading, fetchMore, meta]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const handleClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead({ variables: { ids: [id] } });
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="size-4" />
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-semibold">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
          <span className="sr-only">{t("title")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-background/80 ring-primary/40 from-primary/20 to-primary-foreground/80 w-80 bg-linear-to-r p-0 backdrop-blur-md"
      >
        {/* Header */}
        <div className="border-primary/40 flex items-center justify-between border-b px-4 py-3">
          <span className="text-sm font-semibold">{t("title")}</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground h-auto p-0 text-xs"
              onClick={() => markAllRead()}
            >
              <CheckCheck className="mr-1 size-3.5" />
              {t("markAllRead")}
            </Button>
          )}
        </div>

        {/* Scrollable list */}
        <div className="max-h-90 overflow-y-auto">
          {!loading && notifications.length === 0 && (
            <div className="text-muted-foreground flex flex-col items-center justify-center py-10 text-sm">
              <Bell className="mb-2 size-8 opacity-30" />
              {t("empty")}
            </div>
          )}

          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => handleClick(n.id, n.isRead)}
              className={cn(
                "hover:bg-muted/60 flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left text-sm transition-colors",
                !n.isRead && "bg-primary/5"
              )}
            >
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  !n.isRead ? "bg-primary" : "bg-transparent"
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="leading-snug">{n.message}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {relativeTime(n.createdAt)}
                </p>
              </div>
            </button>
          ))}

          {loading && (
            <div className="flex justify-center py-4">
              <Loader2 className="text-muted-foreground size-4 animate-spin" />
            </div>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-1" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
