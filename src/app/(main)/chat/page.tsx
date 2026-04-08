import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Suspense } from "react";
import { ChatPageClient } from "./ChatPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("chat");
  return { title: t("pageTitle") };
}

export default function ChatPage() {
  return (
    <Suspense>
      <ChatPageClient />
    </Suspense>
  );
}
