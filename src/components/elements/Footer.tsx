"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/common/ui/Separator";
import { useAuth } from "@/hooks/useCurrentUser";
import { useApolloClient } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLogoutMutation } from "@/generated/output";
import { usePathname } from "next/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const { user } = useAuth();
  const router = useRouter();
  const client = useApolloClient();
  const pathname = usePathname();
  const [logoutUser] = useLogoutMutation({
    async onCompleted() {
      await client.resetStore();
      toast.success(t("logoutSuccess"));
      router.push("/account/login");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  if (pathname === "/chat") return null;

  return (
    <footer className="border-border/50 bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 md:px-12">
        <div className="grid grid-cols-1 place-items-start gap-8 sm:grid-cols-2 md:grid-cols-4 md:place-items-center">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logotype.png"
                alt="Portfolio-Hub"
                width={60}
                height={60}
              />
              <span className="text-foreground text-sm font-semibold">
                Portfolio-Hub
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xs font-semibold tracking-wider uppercase">
              {t("nav")}
            </h3>
            <ul className="flex flex-col gap-2">
              {(["home", "albums", "projects", "chat"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key === "home" ? "" : key}`}
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xs font-semibold tracking-wider uppercase">
              {t("account")}
            </h3>
            <ul className="flex flex-col gap-2">
              {user ? (
                <li>
                  <button
                    onClick={() => logoutUser()}
                    className="text-muted-foreground hover:text-foreground cursor-pointer text-xs transition-colors"
                  >
                    {t("logout")}
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/account/login"
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      {t("login")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/account/create"
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      {t("register")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-foreground text-xs font-semibold tracking-wider uppercase">
              {t("legal")}
            </h3>
            <ul className="flex flex-col gap-2">
              {(["privacy", "terms"] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Portfolio-Hub. {t("rights")}
          </span>
          <span className="text-muted-foreground text-xs">{t("madeWith")}</span>
        </div>
      </div>
    </footer>
  );
}
