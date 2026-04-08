"use client";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Monitor, Smartphone, Tablet, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import { Button } from "@/components/common/ui/Button";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { Separator } from "@/components/common/ui/Separator";
import {
  useFindSessionsByUserQuery,
  useRemoveSessionMutation,
} from "@/generated/output";

function DeviceIcon({ type }: { type: string }) {
  const cls = "h-5 w-5 shrink-0";
  if (type === "mobile") return <Smartphone className={cls} />;
  if (type === "tablet") return <Tablet className={cls} />;
  return <Monitor className={cls} />;
}

export function SessionsSection() {
  const t = useTranslations("auth.settings.sessions");

  const { data, loading, refetch } = useFindSessionsByUserQuery({
    fetchPolicy: "cache-and-network",
  });

  const [removeSession, { loading: removing }] = useRemoveSessionMutation({
    onCompleted() {
      toast.success(t("removeSuccess"));
      refetch();
    },
    onError() {
      toast.error(t("removeError"));
    },
  });

  const sessions = [...(data?.findSessionByUser ?? [])].sort((a, b) =>
    a.isCurrent ? -1 : b.isCurrent ? 1 : 0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && !data ? (
          <div className="space-y-3">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t("empty")}</p>
        ) : (
          <div className="space-y-0">
            {sessions.map((session, i) => (
              <div key={session.id}>
                {i > 0 && <Separator className="my-3" />}
                <div className="flex items-start gap-3">
                  <div className="text-muted-foreground mt-0.5">
                    <DeviceIcon
                      type={session.metadata?.device.type ?? "desktop"}
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium">
                        {session.metadata?.device.browser ?? "—"},{" "}
                        {session.metadata?.device.os ?? "—"}
                      </span>
                      {session.isCurrent && (
                        <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
                          {t("current")}
                        </span>
                      )}
                    </div>

                    {session.metadata && (
                      <p className="text-muted-foreground text-xs">
                        {session.metadata.location.city},{" "}
                        {session.metadata.location.country} &middot;{" "}
                        {session.metadata.ip}
                      </p>
                    )}

                    <p className="text-muted-foreground text-xs">
                      {new Date(Number(session.createdAt)).toLocaleString()}
                    </p>
                  </div>

                  {!session.isCurrent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive shrink-0"
                      onClick={() =>
                        removeSession({ variables: { id: session.id } })
                      }
                      disabled={removing}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">{t("remove")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
