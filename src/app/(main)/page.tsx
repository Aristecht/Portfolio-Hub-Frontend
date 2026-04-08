import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { HomePageClient } from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: `Portfolio-Hub — ${t("heroHeading")}`,
    description: t("heroSubheading"),
  };
}

export default function Page() {
  return <HomePageClient />;
}
