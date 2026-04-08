import { storageUrl } from "@/utils/storage-url";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/ui/Avatar";
import { cn } from "@/utils/tw-merge";

type Props = {
  avatar?: string | null;
  displayName: string;
  isOnline?: boolean;
  size?: "sm" | "md" | "lg";
};

export function UserAvatar({
  avatar,
  displayName,
  isOnline,
  size = "md",
}: Props) {
  const sizeClass =
    size === "sm" ? "size-8" : size === "lg" ? "size-12" : "size-10";
  const dotClass = size === "sm" ? "size-2" : "size-2.5";
  const avatarUrl = storageUrl(avatar);
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="relative shrink-0">
      <Avatar className={sizeClass}>
        {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} />}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {isOnline !== undefined && (
        <span
          className={cn(
            "border-background absolute -right-0.5 -bottom-0.5 rounded-full border-2",
            dotClass,
            isOnline ? "bg-green-500" : "bg-muted-foreground"
          )}
        />
      )}
    </div>
  );
}
