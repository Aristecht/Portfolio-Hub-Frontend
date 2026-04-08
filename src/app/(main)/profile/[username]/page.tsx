import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ChannelPageClient } from "./ChannelPageClient";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const t = await getTranslations("channel");
  return { title: `${t("pageTitle")} @${username}` };
}

export default async function ChannelPage({ params }: Props) {
  const { username } = await params;
  return <ChannelPageClient username={username} />;
}
