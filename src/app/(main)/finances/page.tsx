import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { FinancesPageClient } from "./FinancesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("finances");
  return { title: t("pageTitle") };
}

export default function FinancesPage() {
  return <FinancesPageClient />;
}
