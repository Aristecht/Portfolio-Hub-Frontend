"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Send, ArrowLeft, Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useCurrentUser";
import {
  useGetMyChatsQuery,
  useGetChatMessagesLazyQuery,
  useDeleteMessageMutation,
  useEditMessageMutation,
} from "@/generated/output";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { cn } from "@/utils/tw-merge";
import { useChatSocket, IncomingMessage } from "@/hooks/useChatSocket";
import type { ChatModel, MessageModel } from "@/components/features/chat/types";
import { UserAvatar } from "@/components/features/chat/UserAvatar";
import { ChatListItem } from "@/components/features/chat/ChatListItem";
import { MessageBubble } from "@/components/features/chat/MessageBubble";

function socketMessageToModel(msg: IncomingMessage): MessageModel {
  return {
    __typename: "MessageModel",
    id: msg.id,
    chatId: msg.chatId,
    senderId: msg.senderId,
    text: msg.text,
    isRead: msg.isRead,
    isEdited: msg.isEdited ?? false,
    createdAt: msg.createdAt,
    sender: {
      __typename: "UserChatInfoModel",
      id: msg.sender.id,
      username: msg.sender.username,
      displayName: msg.sender.displayName,
      avatar: msg.sender.avatar ?? null,
    },
  };
}

export function ChatPageClient() {
  const t = useTranslations("chat");
  const { user } = useAuth();
  const currentUserId = user?.id ?? "";
  const searchParams = useSearchParams();
  const initialChatId = searchParams.get("chatId");

  const [selectedChat, setSelectedChat] = useState<ChatModel | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [editingMessage, setEditingMessage] = useState<MessageModel | null>(
    null
  );
  const [editText, setEditText] = useState("");
  const [liveMessages, setLiveMessages] = useState<MessageModel[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, boolean>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstScrollRef = useRef(false);
  const autoOpenDoneRef = useRef(false);
  const typingTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>(
    {}
  );
  const selectedChatRef = useRef<ChatModel | null>(null);
  selectedChatRef.current = selectedChat;

  const {
    data: chatsData,
    loading: chatsLoading,
    refetch: refetchChats,
  } = useGetMyChatsQuery({
    fetchPolicy: "cache-and-network",
    skip: !currentUserId,
  });

  const [
    fetchMessages,
    { data: messagesData, loading: messagesLoading, refetch },
  ] = useGetChatMessagesLazyQuery({ fetchPolicy: "cache-and-network" });

  const [deleteMessage] = useDeleteMessageMutation({
    onCompleted() {
      toast.success(t("deleteSuccess"));
      refetch?.();
    },
    onError() {
      toast.error(t("deleteError"));
    },
  });

  const [editMessage, { loading: editLoading }] = useEditMessageMutation({
    onCompleted() {
      toast.success(t("editSuccess"));
      setEditingMessage(null);
      setEditText("");
      refetch?.();
    },
    onError() {
      toast.error(t("editError"));
    },
  });

  const socketActions = useChatSocket(currentUserId || undefined, {
    onMessageNew({ message }) {
      const chat = selectedChatRef.current;
      if (chat && message.chatId === chat.id) {
        setLiveMessages((prev) => {
          if (prev.some((m) => m.id === message.id)) return prev;
          return [...prev, socketMessageToModel(message)];
        });
        socketActions.markAsRead(message.chatId, message.id);
      }
      refetchChats();
    },

    onMessageDeleted({ messageId, chatId }) {
      const chat = selectedChatRef.current;
      if (chat && chat.id === chatId) {
        setLiveMessages((prev) => prev.filter((m) => m.id !== messageId));
        refetch?.();
      }
      refetchChats();
    },

    onMessageEdited({ messageId, chatId, text, isEdited }) {
      const chat = selectedChatRef.current;
      if (chat && chat.id === chatId) {
        setLiveMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, text, isEdited } : m))
        );
        refetch?.();
      }
    },

    onMessageError({ error }) {
      toast.error(error);
    },

    onTypingUser({ chatId, userId, isTyping }) {
      if (userId === currentUserId) return;
      if (isTyping) {
        setTypingUsers((prev) => ({ ...prev, [userId]: chatId }));
        clearTimeout(typingTimers.current[userId]);
        typingTimers.current[userId] = setTimeout(() => {
          setTypingUsers((prev) => {
            const next = { ...prev };
            delete next[userId];
            return next;
          });
        }, 3000);
      } else {
        setTypingUsers((prev) => {
          const next = { ...prev };
          delete next[userId];
          return next;
        });
      }
    },

    onMessagesRead({ chatId, userId }) {
      const chat = selectedChatRef.current;
      if (!chat || chat.id !== chatId) return;
      setLiveMessages((prev) =>
        prev.map((m) => (m.senderId !== userId ? { ...m, isRead: true } : m))
      );
      refetch?.();
    },

    onUserOnline({ userId }) {
      setOnlineUsers((prev) => ({ ...prev, [userId]: true }));
    },

    onUserOffline({ userId }) {
      setOnlineUsers((prev) => ({ ...prev, [userId]: false }));
    },

    onUsersOnline({ userIds }) {
      setOnlineUsers((prev) => {
        const next = { ...prev };
        userIds.forEach((id) => {
          next[id] = true;
        });
        return next;
      });
    },
  });

  const baseMessages = useMemo(
    () => messagesData?.getChatMessages.data ?? [],
    [messagesData]
  );

  const messages = useMemo(() => {
    const liveMap = new Map(liveMessages.map((m) => [m.id, m]));
    const result: MessageModel[] = baseMessages.map((m) => {
      const live = liveMap.get(m.id);
      return live
        ? {
            ...m,
            isRead: live.isRead,
            text: live.text,
            isEdited: live.isEdited,
          }
        : m;
    });
    for (const live of liveMessages) {
      if (!result.some((m) => m.id === live.id)) result.push(live);
    }
    return result;
  }, [baseMessages, liveMessages]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isFirstScrollRef.current) {
      if (!messagesEndRef.current) return;
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
        isFirstScrollRef.current = false;
      });
    } else {
      scrollToBottom("smooth");
    }
  }, [messages, scrollToBottom]);

  const openChat = useCallback(
    (chat: ChatModel) => {
      setSelectedChat(chat);
      setMobileView("chat");
      setMessageText("");
      setEditingMessage(null);
      setLiveMessages([]);
      isFirstScrollRef.current = true;
      socketActions.joinChat(chat.id);
      fetchMessages({
        variables: {
          data: { chatId: chat.id, userId: currentUserId },
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchMessages, currentUserId]
  );

  useEffect(() => {
    if (!initialChatId || !chatsData || autoOpenDoneRef.current) return;
    const target = chatsData.getMyChats.find((c) => c.id === initialChatId);
    if (target) {
      autoOpenDoneRef.current = true;
      openChat(target as ChatModel);
    }
  }, [initialChatId, chatsData, openChat]);

  useEffect(() => {
    if (!messagesData || !selectedChat) return;
    const msgs = messagesData.getChatMessages.data;
    const lastUnread = [...msgs]
      .reverse()
      .find((m) => !m.isRead && m.senderId !== currentUserId);
    if (lastUnread) {
      socketActions.markAsRead(selectedChat.id, lastUnread.id);
    }
    refetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData, selectedChat?.id]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = messageText.trim();
    if (!text || !selectedChat) return;
    socketActions.sendMessage(selectedChat.id, text);
    setMessageText("");
    refetchChats();
  };

  const handleTyping = () => {
    if (!selectedChat) return;
    socketActions.sendTyping(selectedChat.id);
  };

  const handleEditSave = async () => {
    if (!editingMessage || !editText.trim() || !user) return;
    await editMessage({
      variables: {
        data: {
          messageId: editingMessage.id,
          newText: editText.trim(),
          userId: currentUserId,
        },
      },
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage({ variables: { messageId } });
  };

  const handleStartEdit = (message: MessageModel) => {
    setEditingMessage(message);
    setEditText(message.text);
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditText("");
  };

  const resolveOnline = (userId: string, fallback: boolean) =>
    userId in onlineUsers ? onlineUsers[userId] : fallback;

  const filteredChats = (chatsData?.getMyChats ?? []).filter((chat) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return chat.members.some(
      (m) =>
        m.displayName.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q)
    );
  });

  const otherMembers = selectedChat
    ? selectedChat.members.filter((m) => m.id !== currentUserId)
    : [];
  const chatPartner = otherMembers[0] ?? selectedChat?.members[0];

  const partnerIsOnline = chatPartner
    ? resolveOnline(chatPartner.id, chatPartner.isOnline)
    : false;

  const partnerIsTyping =
    chatPartner && selectedChat
      ? typingUsers[chatPartner.id] === selectedChat.id
      : false;

  return (
    <div className="flex h-[calc(100svh-3.5rem)] overflow-hidden">
      <div
        className={cn(
          "border-border bg-background flex w-full flex-col border-r md:w-80 lg:w-96",
          mobileView === "chat" ? "hidden md:flex" : "flex"
        )}
      >
        <div className="border-border border-b px-4 py-3">
          <h1 className="mb-3 text-xl font-bold">{t("title")}</h1>
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatsLoading ? (
            <div className="space-y-1 p-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-2 py-2">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex h-full items-center justify-center p-6 text-center">
              <p className="text-muted-foreground text-sm">{t("noChats")}</p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                currentUserId={currentUserId}
                isSelected={selectedChat?.id === chat.id}
                onClick={() => openChat(chat)}
                t={t}
                resolveOnline={resolveOnline}
              />
            ))
          )}
        </div>
      </div>

      <div
        className={cn(
          "bg-background flex flex-1 flex-col overflow-hidden",
          mobileView === "list" ? "hidden md:flex" : "flex"
        )}
      >
        {selectedChat && chatPartner ? (
          <>
            <div className="border-border flex h-14 items-center gap-3 border-b px-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileView("list")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Link
                href={`/profile/${encodeURIComponent(chatPartner.username)}`}
              >
                <UserAvatar
                  avatar={chatPartner.avatar}
                  displayName={chatPartner.displayName}
                  isOnline={partnerIsOnline}
                  size="md"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/profile/${encodeURIComponent(chatPartner.username)}`}
                  className="hover:underline"
                >
                  <p className="truncate text-sm font-semibold">
                    {chatPartner.displayName}
                  </p>
                </Link>
                <p className="text-muted-foreground text-xs">
                  {partnerIsTyping
                    ? t("typing")
                    : partnerIsOnline
                      ? t("online")
                      : t("offline")}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {messagesLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex gap-2",
                        i % 2 === 0 ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <Skeleton className="size-8 shrink-0 rounded-full" />
                      <Skeleton
                        className={cn(
                          "h-10 rounded-2xl",
                          i % 3 === 0 ? "w-48" : i % 3 === 1 ? "w-64" : "w-32"
                        )}
                      />
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    {t("noMessages")}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === currentUserId}
                      t={t}
                      onEdit={handleStartEdit}
                      onDelete={handleDeleteMessage}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="border-border bg-background border-t p-3">
              {editingMessage ? (
                <div className="flex flex-col gap-2">
                  <div className="border-border bg-muted/40 text-muted-foreground flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs">
                    <Pencil className="h-3 w-3" />
                    <span>{t("edit")}</span>
                    <button onClick={handleCancelEdit} className="ml-auto">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder={t("editPlaceholder")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleEditSave();
                        }
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      autoFocus
                      className="flex-1"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCancelEdit}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      onClick={handleEditSave}
                      disabled={editLoading || !editText.trim()}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                /* Send mode */
                <form onSubmit={handleSend} className="flex gap-2">
                  <Input
                    value={messageText}
                    onChange={(e) => {
                      setMessageText(e.target.value);
                      handleTyping();
                    }}
                    placeholder={t("messagePlaceholder")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e as unknown as React.FormEvent);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="bg-muted rounded-full p-6">
              <Send className="text-muted-foreground h-8 w-8" />
            </div>
            <p className="text-muted-foreground text-sm">{t("selectChat")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
