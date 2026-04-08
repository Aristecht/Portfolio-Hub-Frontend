import type { GetMyChatsQuery, GetChatMessagesQuery } from "@/generated/output";

export type ChatModel = GetMyChatsQuery["getMyChats"][number];
export type MessageModel =
  GetChatMessagesQuery["getChatMessages"]["data"][number];
