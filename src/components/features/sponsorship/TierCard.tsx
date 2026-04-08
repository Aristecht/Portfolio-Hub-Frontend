"use client";

import { useTranslations } from "next-intl";
import { Pencil, Trash2, Check } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { cn } from "@/utils/tw-merge";

export type TierData = {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  benefits: string[];
  isActive: boolean;
  position: number;
};

export function TierCard({
  tier,
  onEdit,
  onDelete,
}: {
  tier: TierData;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations("sponsorship.tier");
  return (
    <div className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-foreground font-semibold">{tier.title}</p>
          <p className="text-primary mt-0.5 text-lg font-bold">
            {tier.amount.toLocaleString()} {tier.currency}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button size="icon" variant="ghost" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>

      {tier.description && (
        <p className="text-muted-foreground text-sm">{tier.description}</p>
      )}

      {tier.benefits.length > 0 && (
        <ul className="space-y-1">
          {tier.benefits.map((b, i) => (
            <li
              key={i}
              className="text-muted-foreground flex items-start gap-1.5 text-sm"
            >
              <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            tier.isActive ? "bg-green-500" : "bg-muted-foreground"
          )}
        />
        <span className="text-muted-foreground text-xs">
          {tier.isActive ? t("active") : t("inactive")}
        </span>
      </div>
    </div>
  );
}
