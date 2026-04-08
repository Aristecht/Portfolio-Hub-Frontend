import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { SettingsPageClient } from "./SettingsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("auth.settings");
  return { title: t("pageTitle") };
}

export default function SettingsPage() {
  return <SettingsPageClient />;
}
