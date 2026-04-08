"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import { Separator } from "@/components/common/ui/Separator";
import { Skeleton } from "@/components/common/ui/Skeleton";

import { ProfileInfoForm } from "@/components/features/settings/ProfileInfoForm";
import { AvatarUploadForm } from "@/components/features/settings/AvatarForm";
import { ChangeEmailForm } from "@/components/features/settings/ChangeEmailForm";
import { ChangePasswordForm } from "@/components/features/settings/ChangePasswordForm";
import { NotificationSettingsForm } from "@/components/features/settings/NotificationSettingsForm";
import { SocialLinksForm } from "@/components/features/settings/SocialLinksForm";
import { TwoFactorSetup } from "@/components/features/auth/TwoFactorSetup";
import { useFindProfileQuery } from "@/generated/output";
import { LanguageSwitcher } from "@/components/elements/LanguageSwitcher";
import { DeactivateAccount } from "@/components/features/settings/DeactivateAccount";
import { SessionsSection } from "@/components/features/settings/SessionsSection";

function SectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-24" />
      </CardContent>
    </Card>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-1">
      <h2 className="text-base font-semibold">{title}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
      <Separator className="mt-3" />
    </div>
  );
}

export function SettingsPageClient() {
  const t = useTranslations("auth.settings");
  const [avatarOverride, setAvatarOverride] = useState<
    string | null | undefined
  >(undefined);
  const { data, loading } = useFindProfileQuery({
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  const user = data?.findProfile;
  const notificationSettings = data?.findProfile?.notificationsSettings;
  const [totpOverride, setTotpOverride] = useState<boolean | null>(null);
  const isTotpEnabled =
    totpOverride ?? data?.findProfile.isTotpEnabled ?? false;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">{t("pageTitle")}</h1>
      </div>

      <section className="space-y-4">
        <SectionHeading
          title={t("sections.publicProfile")}
          description={t("sections.publicProfileDesc")}
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          <div className="lg:col-span-2">
            {loading ? (
              <SectionSkeleton />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t("avatar.title")}</CardTitle>
                  <CardDescription>{t("avatar.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <AvatarUploadForm
                    username={user?.username ?? ""}
                    currentAvatar={avatarOverride ?? user?.avatar ?? undefined}
                    onUploadSuccess={setAvatarOverride}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <SectionSkeleton />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile.title")}</CardTitle>
                  <CardDescription>{t("profile.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileInfoForm
                    displayName={user?.displayName ?? ""}
                    username={user?.username ?? ""}
                    bio={user?.bio ?? ""}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("social.title")}</CardTitle>
                <CardDescription>{t("social.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <SocialLinksForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={t("sections.security")}
          description={t("sections.securityDesc")}
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {loading ? (
            <SectionSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("email.title")}</CardTitle>
                <CardDescription>{t("email.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChangeEmailForm />
              </CardContent>
            </Card>
          )}

          {loading ? (
            <SectionSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("password.title")}</CardTitle>
                <CardDescription>{t("password.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChangePasswordForm />
              </CardContent>
            </Card>
          )}

          {loading ? (
            <SectionSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("twoFactor.title")}</CardTitle>
                <CardDescription>{t("twoFactor.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <TwoFactorSetup
                  isTotpEnabled={isTotpEnabled}
                  onStatusChange={setTotpOverride}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={t("sections.notifications")}
          description={t("sections.notificationsDesc")}
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          {loading ? (
            <SectionSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{t("notifications.title")}</CardTitle>
                <CardDescription>
                  {t("notifications.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notificationSettings ? (
                  <NotificationSettingsForm
                    key={`${notificationSettings.siteNotifications}-${notificationSettings.pushNotifications}`}
                    siteNotifications={notificationSettings.siteNotifications}
                    pushNotifications={notificationSettings.pushNotifications}
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    {t("notifications.unavailable")}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
          <div className="col-span-1">
            {loading ? (
              <SectionSkeleton />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t("language.title")}</CardTitle>
                  <CardDescription>{t("language.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <LanguageSwitcher />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2"></div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={t("sections.interface")}
          description={t("sections.interfaceDesc")}
        />
        <div className="lg:col-span-2">
          <SessionsSection />
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={t("sections.danger")}
          description={t("sections.dangerDesc")}
        />
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">
                {t("deactivate.title")}
              </CardTitle>
              <CardDescription>{t("deactivate.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <DeactivateAccount />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
