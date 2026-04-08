"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface IncomingMessage {
  id: string;
  text: string;
  senderId: string;
  sender: {
    id: string;
    username: string;
    displayName: string;
    avatar: string | null;
    isOnline: boolean;
  };
  createdAt: string;
  isRead: boolean;
  isEdited: boolean;
  chatId: string;
}

interface ChatSocketEvents {
  onMessageNew?: (payload: {
    userId: string;
    message: IncomingMessage;
  }) => void;
  onMessageDeleted?: (payload: { messageId: string; chatId: string }) => void;
  onMessageEdited?: (payload: {
    messageId: string;
    chatId: string;
    text: string;
    isEdited: boolean;
  }) => void;
  onMessageError?: (payload: { error: string }) => void;
  onTypingUser?: (payload: {
    chatId: string;
    userId: string;
    isTyping: boolean;
  }) => void;
  onMessagesRead?: (payload: {
    chatId: string;
    userId: string;
    messageId: string;
  }) => void;
  onUserOnline?: (payload: { userId: string }) => void;
  onUserOffline?: (payload: { userId: string }) => void;
  onUsersOnline?: (payload: { userIds: string[] }) => void;
}

export function useChatSocket(
  userId: string | undefined,
  events: ChatSocketEvents
) {
  const socketRef = useRef<Socket | null>(null);
  const eventsRef = useRef(events);

  useEffect(() => {
    eventsRef.current = events;
  });

  useEffect(() => {
    if (!userId) return;

    const socket = io(`${WS_URL}/chat`, {
      withCredentials: true,
      auth: { userId },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("message:new", (payload) =>
      eventsRef.current.onMessageNew?.(payload)
    );
    socket.on("message:deleted", (payload) =>
      eventsRef.current.onMessageDeleted?.(payload)
    );
    socket.on("message:edited", (payload) =>
      eventsRef.current.onMessageEdited?.(payload)
    );
    socket.on("message:error", (payload) =>
      eventsRef.current.onMessageError?.(payload)
    );
    socket.on("typing:user", (payload) =>
      eventsRef.current.onTypingUser?.(payload)
    );
    socket.on("messages:read", (payload) =>
      eventsRef.current.onMessagesRead?.(payload)
    );
    socket.on("user:online", (payload) =>
      eventsRef.current.onUserOnline?.(payload)
    );
    socket.on("user:offline", (payload) =>
      eventsRef.current.onUserOffline?.(payload)
    );
    socket.on("users:online", (payload) =>
      eventsRef.current.onUsersOnline?.(payload)
    );

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  const sendMessage = useCallback((chatId: string, text: string) => {
    socketRef.current?.emit("message:send", { chatId, text });
  }, []);

  const sendTyping = useCallback((chatId: string) => {
    socketRef.current?.emit("typing:start", { chatId });
  }, []);

  const markAsRead = useCallback((chatId: string, messageId: string) => {
    socketRef.current?.emit("messages:read", { chatId, messageId });
  }, []);

  const joinChat = useCallback((chatId: string) => {
    socketRef.current?.emit("chat:join", { chatId });
  }, []);

  const leaveChat = useCallback((chatId: string) => {
    socketRef.current?.emit("chat:leave", { chatId });
  }, []);

  return { sendMessage, sendTyping, markAsRead, joinChat, leaveChat };
}
