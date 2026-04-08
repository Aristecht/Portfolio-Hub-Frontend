import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ProjectDetailClient } from "./ProjectDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations("projects.detail");
  return { title: `${t("pageTitle")} - ${id}` };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  return <ProjectDetailClient id={id} />;
}
