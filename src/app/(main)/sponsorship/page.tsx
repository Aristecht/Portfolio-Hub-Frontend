import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SponsorshipPageClient } from "./SponsorshipPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sponsorship");
  return { title: t("pageTitle") };
}

export default function SponsorshipPage() {
  return <SponsorshipPageClient />;
}
