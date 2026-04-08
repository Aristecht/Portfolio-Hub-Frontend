import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ProjectsPageClient } from "./ProjectsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("projects");
  return { title: t("pageTitle") };
}

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
