"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Gift, Check, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PaymentMethod,
  useGetTiersByAuthorQuery,
  useCreatePaymentMutation,
} from "@/generated/output";

type Tier = {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  benefits: string[];
  isActive: boolean;
  position: number;
};

type Props = {
  username: string;
  displayName: string;
};

export function SponsorDropdown({ username, displayName }: Props) {
  const t = useTranslations("profile.sponsor");

  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const { data, loading } = useGetTiersByAuthorQuery({
    variables: { username },
    fetchPolicy: "cache-and-network",
  });

  const [createPayment, { loading: paying }] = useCreatePaymentMutation();

  const tiers = (data?.getTiersByAuthor ?? [])
    .filter((t) => t.isActive)
    .sort((a, b) => a.position - b.position)
    .slice(0, 3);

  if (!loading && tiers.length === 0) return null;

  const handleSelectTier = (tier: Tier) => {
    setSelectedTier(tier);
    setPaymentOpen(true);
  };

  const handlePay = async (method: PaymentMethod) => {
    if (!selectedTier) return;
    try {
      const res = await createPayment({
        variables: {
          data: { tierId: selectedTier.id, paymentMethod: method },
        },
      });
      const url = res.data?.createPayment.paymentUrl;
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
        setPaymentOpen(false);
      }
    } catch {
      toast.error(t("paymentError"));
    }
  };

  return (
    <div className="border-border border-t px-4 py-4 sm:px-5 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-foreground text-sm font-semibold">
            {t("title", { name: displayName })}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {t("subtitle")}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="gradient" className="shrink-0 gap-1.5">
              <Gift className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("button")}</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-2">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
              </div>
            ) : (
              tiers.map((tier) => (
                <DropdownMenuItem
                  key={tier.id}
                  className="flex cursor-pointer flex-col items-start gap-1 rounded-lg px-3 py-2.5"
                  onClick={() => handleSelectTier(tier)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-foreground text-sm font-semibold">
                      {tier.title}
                    </span>
                    <span className="text-primary text-sm font-bold">
                      {tier.amount.toLocaleString()} {tier.currency}
                    </span>
                  </div>
                  {tier.description && (
                    <p className="text-muted-foreground line-clamp-2 text-xs">
                      {tier.description}
                    </p>
                  )}
                  {tier.benefits.length > 0 && (
                    <ul className="mt-0.5 space-y-0.5">
                      {tier.benefits.slice(0, 3).map((b, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-center gap-1 text-xs"
                        >
                          <Check className="text-primary h-3 w-3 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("choosePayment")}</DialogTitle>
          </DialogHeader>

          {selectedTier && (
            <div className="border-border mb-4 rounded-xl border p-3">
              <p className="text-foreground text-sm font-semibold">
                {selectedTier.title}
              </p>
              <p className="text-primary mt-0.5 text-lg font-bold">
                {selectedTier.amount.toLocaleString()} {selectedTier.currency}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="h-14 w-full justify-start gap-3 px-4"
              disabled={paying}
              onClick={() => handlePay(PaymentMethod.FreedomPay)}
            >
              {paying ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="bg-primary text-primary-foreground rounded px-1.5 py-0.5 text-xs font-bold">
                  FP
                </span>
              )}
              <div className="text-left">
                <p className="text-foreground text-sm font-medium">
                  Freedom Pay
                </p>
                <p className="text-muted-foreground text-xs">
                  {t("freedomPayDesc")}
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-14 w-full justify-start gap-3 px-4"
              disabled={paying}
              onClick={() => handlePay(PaymentMethod.KaspiPay)}
            >
              {paying ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="rounded bg-red-500 px-1.5 py-0.5 text-xs font-bold text-white">
                  K
                </span>
              )}
              <div className="text-left">
                <p className="text-foreground text-sm font-medium">Kaspi Pay</p>
                <p className="text-muted-foreground text-xs">
                  {t("kaspiPayDesc")}
                </p>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
