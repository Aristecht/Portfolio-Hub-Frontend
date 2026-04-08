import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { AlbumsPageWrapper } from "./AlbumsPageWrapper";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("albums");
  return { title: t("pageTitle") };
}

export default function AlbumsPage() {
  return <AlbumsPageWrapper />;
}
