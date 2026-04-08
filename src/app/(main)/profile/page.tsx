import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ProfilePageClient } from "./ProfilePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("profile");
  return { title: t("pageTitle") };
}

export default function ProfilePage() {
  return <ProfilePageClient />;
}
