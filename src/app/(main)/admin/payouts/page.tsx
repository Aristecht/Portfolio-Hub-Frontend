import { getTranslations } from "next-intl/server";
import { AdminPayoutsClient } from "./AdminPayoutsClient";

export async function generateMetadata() {
  const t = await getTranslations("admin");
  return { title: t("payouts.pageTitle") };
}

export default function AdminPayoutsPage() {
  return <AdminPayoutsClient />;
}
