import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { AlbumDetailWrapper } from "./AlbumDetailWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = await getTranslations("albums.detail");
  return { title: `${t("pageTitle")} — ${id}` };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { id } = await params;
  return <AlbumDetailWrapper id={id} />;
}
