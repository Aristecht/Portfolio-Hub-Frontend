"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/common/ui/Sidebar";
import { useTranslations } from "next-intl";
import { Home, Image, FolderKanban, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextImage from "next/image";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const SidebarUserMenu = dynamic(
  () =>
    import("@/components/elements/SidebarUserMenu").then(
      (m) => m.SidebarUserMenu
    ),
  { ssr: false }
);

const MAIN_LINKS = [
  { href: "/", labelKey: "home", icon: Home },
  { href: "/albums", labelKey: "albums", icon: Image },
  { href: "/projects", labelKey: "projects", icon: FolderKanban },
  { href: "/chat", labelKey: "chat", icon: MessageSquare },
];

export function AppSidebar() {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <NextImage
                  src="/images/logotype.png"
                  alt="logo"
                  width={60}
                  height={60}
                  className="shrink-0"
                />
                <span className="font-semibold">Portfolio-Hub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("main")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_LINKS.map(({ href, labelKey, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === href}
                    tooltip={t(labelKey)}
                  >
                    <Link href={href}>
                      <Icon />
                      <span>{t(labelKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
