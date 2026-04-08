"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Button } from "@/components/common/ui/Button";
import { useChangeNotificationSettingsMutation } from "@/generated/output";
import { Spinner } from "@/components/common/ui/Spinner";
import {
  usePushNotifications,
  PushPermissionDeniedError,
} from "@/hooks/usePushNotifications";

interface Props {
  siteNotifications: boolean;
  pushNotifications: boolean;
}

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-0.5">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${
          checked ? "bg-primary" : "bg-input"
        }`}
      >
        <span
          className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4.5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function NotificationSettingsForm({
  siteNotifications: initSite,
  pushNotifications: initPush,
}: Props) {
  const t = useTranslations("auth.settings.notifications");
  const [site, setSite] = useState(initSite);
  const [push, setPush] = useState(initPush);
  const [pushLoading, setPushLoading] = useState(false);

  const { subscribe, unsubscribe, isSupported } = usePushNotifications();

  const [save, { loading }] = useChangeNotificationSettingsMutation({
    onCompleted() {
      toast.success(t("success"));
    },
    onError(err) {
      toast.error(err.message || t("error"));
    },
  });

  async function handlePushToggle(enabled: boolean) {
    if (!isSupported) {
      toast.error(t("pushNotSupported"));
      return;
    }
    setPushLoading(true);
    try {
      if (enabled) {
        await subscribe();
      } else {
        await unsubscribe();
      }
      setPush(enabled);
    } catch (err) {
      if (err instanceof PushPermissionDeniedError) {
        toast.error(t("pushDenied"));
      } else {
        toast.error(t("pushFailed"));
        console.error("Push toggle error:", err);
      }
    } finally {
      setPushLoading(false);
    }
  }

  function handleSave() {
    save({
      variables: {
        data: { siteNotifications: site, pushNotifications: push },
      },
    });
  }

  return (
    <div className="space-y-5">
      <ToggleRow
        label={t("siteNotifications")}
        description={t("siteNotificationsDescription")}
        checked={site}
        onChange={setSite}
      />
      <ToggleRow
        label={t("pushNotifications")}
        description={t("pushNotificationsDescription")}
        checked={push}
        onChange={handlePushToggle}
      />
      <Button
        onClick={handleSave}
        disabled={loading || pushLoading}
        className="w-full sm:w-auto"
      >
        {(loading || pushLoading) && <Spinner />}
        {t("save")}
      </Button>
    </div>
  );
}
