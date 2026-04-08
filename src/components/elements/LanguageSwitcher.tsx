"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLanguage } from "@/libs/i18n/language";
import { Button } from "@/components/common/ui/Button";
import type { Language } from "@/libs/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Language;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next: Language = locale === "ru" ? "en" : "ru";
    startTransition(async () => {
      await setLanguage(next);
      router.refresh();
    });
  }

  return (
    <Button
      variant="outline-orange"
      size="icon-sm"
      onClick={toggle}
      disabled={isPending}
      aria-label="Switch language"
    >
      <span className="text-xs leading-none font-semibold uppercase">
        {locale === "ru" ? "EN" : "RU"}
      </span>
    </Button>
  );
}
