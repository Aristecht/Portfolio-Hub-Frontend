"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/common/ui/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/ui/DropdownMenu";
import { useTranslations } from "next-intl";
import {
  Settings,
  ChevronsUpDown,
  LogOut,
  Wallet,
  Heart,
  User,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useCurrentUser";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client/react";
import { toast } from "sonner";

const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

const S3_URL = process.env.NEXT_PUBLIC_S3_URL;

function getAvatarUrl(avatar: string | null | undefined): string | null {
  if (!avatar) return null;
  if (avatar.startsWith("http://") || avatar.startsWith("https://"))
    return avatar;
  return `${S3_URL}/${avatar}`;
}

export function SidebarUserMenu() {
  const t = useTranslations("sidebar");
  const tf = useTranslations("footer");
  const router = useRouter();
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const client = useApolloClient();
  const [logoutUser] = useMutation(LOGOUT_USER, {
    async onCompleted() {
      await client.resetStore();
      toast.success(tf("logoutSuccess"));
      router.push("/account/login");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="from-primary/15 to-primary/5 ring-primary/20 hover:ring-primary/40 data-[state=open]:ring-primary/40 bg-linear-to-r ring-1 transition-all duration-200 data-[state=open]:bg-linear-to-r"
            >
              <div className="bg-primary/10 text-primary relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-semibold">
                {getAvatarUrl(user?.avatar) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getAvatarUrl(user?.avatar)!}
                    alt={user?.username ?? "avatar"}
                    className="size-full object-cover"
                  />
                ) : (
                  (user?.username ?? "?").slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="flex min-w-0 flex-col text-left leading-tight">
                {user?.username ? (
                  <Link
                    href={`/profile/${encodeURIComponent(user.username)}`}
                    className="truncate text-sm font-semibold hover:underline"
                    onClick={(event) => event.stopPropagation()}
                  >
                    @{user.username}
                  </Link>
                ) : (
                  <span className="truncate text-sm font-semibold">—</span>
                )}
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email ?? "—"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="end"
            className="w-56 space-y-1"
          >
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="size-5" />
                {t("profile")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="size-5" />
                {t("settings")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/finances">
                <Wallet className="size-5" />
                {t("finances")}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sponsorship">
                <Heart className="size-5" />
                {t("sponsorship")}
              </Link>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/payouts">
                    <ShieldCheck className="size-5" />
                    {t("admin")}
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            {user ? (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => logoutUser()}
                className="cursor-pointer"
              >
                <LogOut className="size-5" />
                {tf("logout")}
              </DropdownMenuItem>
            ) : (
              <SidebarMenuButton size="lg" asChild>
                <Link href="/account/login">
                  <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full">
                    <LogOut className="text-primary size-4" />
                  </div>
                  <span className="text-primary font-medium">
                    {tf("login")}
                  </span>
                </Link>
              </SidebarMenuButton>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
