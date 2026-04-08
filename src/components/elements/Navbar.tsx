"use client";

import { Button } from "@/components/common/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/common/ui/Sheet";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/tw-merge";
import Image from "next/image";
import { useAuth } from "@/hooks/useCurrentUser";
import { NotificationsDropdown } from "@/components/elements/NotificationsDropdown";
import type { ReactNode } from "react";

const NAV_LINKS = [
  { href: "/", labelKey: "home" },
  { href: "/albums", labelKey: "albums" },
  { href: "/projects", labelKey: "projects" },
  { href: "/chat", labelKey: "chat" },
];

export function Navbar({ mobileSlot }: { mobileSlot?: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="border-border/50 bg-background/80 sticky top-0 z-20 flex h-14 items-center justify-between border-b px-4 backdrop-blur-sm md:px-8">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-foreground flex items-center text-sm font-semibold"
        >
          <Image
            src="/images/logotype.png"
            alt="Portfolio-Hub logo"
            width={75}
            height={75}
          />
          Portfolio-Hub
        </Link>

        <nav className="ml-20 hidden items-center gap-10 md:flex">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-muted-foreground hover:text-foreground text-sm transition-colors",
                pathname === href &&
                  "text-primary border-primary border-b-2 pb-0.5 font-medium"
              )}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>
      </div>

      {user && (
        <div className="mr-3 ml-auto">
          <NotificationsDropdown />
        </div>
      )}

      <div className="flex items-center gap-4">
        {user ? (
          <Button
            asChild
            size="default"
            variant="link"
            className="hidden md:flex"
          >
            <Link href={`/profile/${encodeURIComponent(user.username)}`}>
              @{user.username}
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            size="default"
            variant="link"
            className="hidden md:flex"
          >
            <Link href="/account/login">{t("login")}</Link>
          </Button>
        )}

        <Button
          variant="outline-orange"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="size-4 scale-100 dark:scale-0" />
          <Moon className="absolute size-4 scale-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {mobileSlot ? (
          <div className="md:hidden">{mobileSlot}</div>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="md:hidden">
                <Menu className="size-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="border-border border-b px-4 py-5">
                <SheetTitle className="text-left text-sm font-semibold">
                  Portfolio-Hub
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-3">
                {NAV_LINKS.map(({ href, labelKey }) => (
                  <SheetClose asChild key={href}>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-muted-foreground hover:text-foreground justify-start",
                        pathname === href &&
                          "bg-muted text-foreground font-medium"
                      )}
                    >
                      <Link href={href}>{t(labelKey)}</Link>
                    </Button>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  {user ? (
                    <Button
                      asChild
                      size="sm"
                      variant="ghost"
                      className="mt-2 justify-start"
                    >
                      <Link
                        href={`/profile/${encodeURIComponent(user.username)}`}
                      >
                        @{user.username}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      size="sm"
                      variant="default"
                      className="mt-2"
                    >
                      <Link href="/account/login">{t("login")}</Link>
                    </Button>
                  )}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
