"use client";

import { createElement, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Facebook,
  Github,
  Globe,
  Instagram,
  Linkedin,
  LucideIcon,
  MessageCircle,
  Pencil,
  Settings2,
  Twitch,
  Twitter,
  UserCheck,
  UserPlus,
  Youtube,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/ui/Avatar";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/Dialog";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { storageUrl } from "@/utils/storage-url";
import { StatCard } from "./StatCard";
import type {
  ChannelSocialLink,
  MyChannel,
} from "../../../types/profile/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/common/ui/Tooltip";
import {
  useFindFollowersQuery,
  useFindFollowingsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetOrCreateChatMutation,
} from "@/generated/output";
import { SponsorDropdown } from "./SponsorDropdown";

export function ProfileHeader({
  channel,
  isOwner,
}: {
  channel: MyChannel;
  isOwner?: boolean;
}) {
  const t = useTranslations("profile");
  const { stats } = channel;
  const router = useRouter();

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [following, setFollowing] = useState(channel.isFollowing);
  const [localFollowersCount, setLocalFollowersCount] = useState(
    stats.followingCount
  );

  const [getOrCreateChat, { loading: chatLoading }] =
    useGetOrCreateChatMutation({
      onCompleted(data) {
        router.push(`/chat?chatId=${data.getOrCreateChat.id}`);
      },
      onError(err) {
        console.error("getOrCreateChat error:", err);
      },
    });

  const [followUser, { loading: followLoading }] = useFollowUserMutation({
    onCompleted: () => {
      setFollowing(true);
      setLocalFollowersCount((c) => c + 1);
    },
  });
  const [unfollowUser, { loading: unfollowLoading }] = useUnfollowUserMutation({
    onCompleted: () => {
      setFollowing(false);
      setLocalFollowersCount((c) => c - 1);
    },
  });

  const handleFollowToggle = () => {
    if (following) {
      unfollowUser({ variables: { channelId: channel.id } });
    } else {
      followUser({ variables: { channelId: channel.id } });
    }
  };

  const { data: followersData, loading: loadingFollowers } =
    useFindFollowersQuery({
      variables: { data: { username: channel.username, page: 1, limit: 100 } },
      skip: !followersOpen,
      fetchPolicy: "cache-and-network",
    });

  const { data: followingsData, loading: loadingFollowings } =
    useFindFollowingsQuery({
      variables: { data: { username: channel.username, page: 1, limit: 100 } },
      skip: !followingOpen,
      fetchPolicy: "cache-and-network",
    });

  const followers = followersData?.findFollowers.data ?? [];
  const followings = followingsData?.findFollowings.data ?? [];

  const actionButton =
    isOwner === undefined
      ? { href: "/settings", Icon: Pencil, label: t("editProfile") }
      : isOwner
        ? { href: "/profile", Icon: Settings2, label: t("manageProfile") }
        : null;

  const DOMAIN_ICONS: [RegExp, LucideIcon][] = [
    [/github\.com/, Github],
    [/twitter\.com|x\.com/, Twitter],
    [/youtube\.com|youtu\.be/, Youtube],
    [/instagram\.com/, Instagram],
    [/facebook\.com/, Facebook],
    [/twitch\.tv/, Twitch],
    [/linkedin\.com/, Linkedin],
  ];

  function getIconForUrl(url: string): LucideIcon {
    try {
      const hostname = new URL(url).hostname;
      for (const [pattern, Icon] of DOMAIN_ICONS) {
        if (pattern.test(hostname)) return Icon;
      }
    } catch {}
    return Globe;
  }

  function SocialPill({ link }: { link: ChannelSocialLink }) {
    const Icon = getIconForUrl(link.url);
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground hover:bg-muted hover:border-border flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1 text-sm transition-colors"
      >
        {createElement(Icon, { className: "h-4 w-4 shrink-0" })}
        <span className="max-w-35 truncate">{link.title}</span>
      </a>
    );
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="p-4 sm:p-5 md:p-6">
        <span className="text-muted-foreground text-sm sm:text-lg">
          @{channel.username}
        </span>
        <div className="flex items-center sm:mt-2">
          <Avatar className="ring-primary-foreground border-primary-foreground mr-1 h-16 w-16 shrink-0 border ring-2 sm:h-18 sm:w-18 md:h-20 md:w-20">
            <AvatarImage src={storageUrl(channel.avatar) ?? undefined} />
            <AvatarFallback className="text-xl font-bold sm:text-2xl">
              {channel.displayName?.[0]?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>

          <div className="ml-3 flex flex-1 flex-col space-y-1.5 sm:ml-6 sm:space-y-2 md:ml-8">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:gap-x-3">
                <h1 className="text-foreground truncate text-lg leading-tight font-bold sm:text-xl md:text-2xl">
                  {channel.displayName}
                </h1>
              </div>
              {actionButton && (
                <div className="hidden md:inline">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="shrink-0 gap-1.5"
                        >
                          <Link href={actionButton.href}>
                            <actionButton.Icon className="h-3.5 w-3.5" />
                            <span className="hidden md:inline">
                              {actionButton.label}
                            </span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="sm:hidden">
                        {actionButton.label}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>

            <div className="mt-2 flex gap-4 sm:gap-8 md:mt-1 md:gap-10">
              <button
                onClick={() => setFollowersOpen(true)}
                className="flex cursor-pointer flex-col items-center gap-0.5 text-center transition-opacity hover:opacity-70"
              >
                <span className="text-foreground text-lg leading-none font-semibold">
                  {localFollowersCount.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-xs">
                  {t("stats.followers")}
                </span>
              </button>
              <button
                onClick={() => setFollowingOpen(true)}
                className="hover:text-primary flex cursor-pointer flex-col items-center gap-0.5 text-center transition-opacity"
              >
                <span className="text-foreground text-lg leading-none font-semibold">
                  {stats.followersCount.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-xs">
                  {t("stats.following")}
                </span>
              </button>
              <StatCard label={t("stats.likes")} value={stats.totalLikes} />
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:ml-20 sm:justify-start md:ml-26">
          {isOwner === false && (
            <div className="mt-3 flex flex-nowrap gap-4">
              <Button
                size="sm"
                variant={following ? "default" : "gradient"}
                className="gap-1.5"
                onClick={handleFollowToggle}
                disabled={followLoading || unfollowLoading}
              >
                {following ? (
                  <UserCheck className="h-3.5 w-3.5" />
                ) : (
                  <UserPlus className="h-3.5 w-3.5" />
                )}
                {following ? t("unfollow") : t("follow")}
              </Button>
              <Button
                size="sm"
                variant="outline-orange"
                className="gap-1.5"
                disabled={chatLoading}
                onClick={() =>
                  getOrCreateChat({ variables: { userId: channel.id } })
                }
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {t("message")}
              </Button>
            </div>
          )}
        </div>

        {channel.bio && (
          <p className="text-muted-foreground mt-4 max-w-prose text-sm leading-relaxed sm:mt-5">
            {channel.bio}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between">
          {channel.socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:mt-4">
              {channel.socialLinks
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((link) => (
                  <SocialPill key={link.id} link={link} />
                ))}
            </div>
          )}
          {actionButton && (
            <div className="inline md:hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-1.5"
                    >
                      <Link href={actionButton.href}>
                        <actionButton.Icon className="h-3.5 w-3.5" />
                        <span className="hidden md:inline">
                          {actionButton.label}
                        </span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="md:hidden">
                    {actionButton.label}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>

      {isOwner === false && (
        <SponsorDropdown
          username={channel.username}
          displayName={channel.displayName}
        />
      )}

      <Dialog open={followersOpen} onOpenChange={setFollowersOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("followers")}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {loadingFollowers ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : followers.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                {t("noFollowers")}
              </p>
            ) : (
              <div className="space-y-2">
                {followers.map((f) =>
                  f.follower ? (
                    <Link
                      key={f.followerId ?? f.follower.id}
                      href={`/profile/${encodeURIComponent(f.follower.username)}`}
                      onClick={() => setFollowersOpen(false)}
                      className="border-border bg-card hover:border-primary/30 flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors hover:shadow-sm"
                    >
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage
                          src={storageUrl(f.follower.avatar) ?? undefined}
                        />
                        <AvatarFallback className="text-sm font-semibold">
                          {f.follower.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground text-sm font-medium">
                        @{f.follower.username}
                      </span>
                    </Link>
                  ) : null
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={followingOpen} onOpenChange={setFollowingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("following")}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {loadingFollowings ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))}
              </div>
            ) : followings.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                {t("noFollowing")}
              </p>
            ) : (
              <div className="space-y-2">
                {followings.map((f) =>
                  f.following ? (
                    <Link
                      key={f.followingId ?? f.following.id}
                      href={`/profile/${encodeURIComponent(f.following.username)}`}
                      onClick={() => setFollowingOpen(false)}
                      className="border-border bg-card hover:border-primary/30 flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors hover:shadow-sm"
                    >
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage
                          src={storageUrl(f.following.avatar) ?? undefined}
                        />
                        <AvatarFallback className="text-sm font-semibold">
                          {f.following.username[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground text-sm font-medium">
                        @{f.following.username}
                      </span>
                    </Link>
                  ) : null
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
