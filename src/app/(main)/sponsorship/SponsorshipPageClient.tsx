"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, Gift, ShieldCheck } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/common/ui/Dialog";
import { Skeleton } from "@/components/common/ui/Skeleton";
import {
  PayoutMethod,
  useGetPayoutSettingsQuery,
  useRemovePayoutMethodMutation,
  useGetTiersByAuthorQuery,
  useDeleteDonationTierMutation,
} from "@/generated/output";
import { useAuth } from "@/hooks/useCurrentUser";
import { PayoutMethodForm } from "../../../components/features/sponsorship/PayoutMethodForm";
import { TierCard } from "../../../components/features/sponsorship/TierCard";
import {
  TierDialog,
  TierFormData,
} from "../../../components/features/sponsorship/TierDialog";

export function SponsorshipPageClient() {
  const t = useTranslations("sponsorship");
  const { profile } = useAuth();
  const username = profile?.username ?? "";

  const { data: payoutData, loading: payoutLoading } =
    useGetPayoutSettingsQuery({ fetchPolicy: "cache-and-network" });

  const {
    data: tiersData,
    loading: tiersLoading,
    refetch: refetchTiers,
  } = useGetTiersByAuthorQuery({
    variables: { username },
    skip: !username,
    fetchPolicy: "cache-and-network",
  });

  const [removePayoutMethod, { loading: removing }] =
    useRemovePayoutMethodMutation({
      onCompleted: () => {
        toast.success(t("payout.removedSuccess"));
      },
      onError: (e) => toast.error(e.message),
      refetchQueries: ["GetPayoutSettings"],
    });

  const [tierDialogOpen, setTierDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<{
    id: string;
    form: TierFormData;
  } | null>(null);
  const [deletingTierId, setDeletingTierId] = useState<string | null>(null);

  const [deleteTier, { loading: deleting }] = useDeleteDonationTierMutation({
    onCompleted: () => {
      toast.success(t("tier.deleteSuccess"));
      setDeletingTierId(null);
      refetchTiers();
    },
    onError: (e) => toast.error(e.message),
  });

  const payoutSettings = payoutData?.getPayoutSettings;
  const hasPayoutMethod = !!payoutSettings?.method;

  const tiers = (tiersData?.getTiersByAuthor ?? [])
    .slice()
    .sort((a, b) => a.position - b.position);

  const canAddTier = tiers.length < 3;

  const openCreate = () => {
    setEditingTier(null);
    setTierDialogOpen(true);
  };

  const openEdit = (tier: (typeof tiers)[0]) => {
    setEditingTier({
      id: tier.id,
      form: {
        title: tier.title,
        description: tier.description,
        amount: String(tier.amount),
        benefits: tier.benefits.join("\n"),
      },
    });
    setTierDialogOpen(true);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-foreground text-2xl font-bold">{t("pageTitle")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
      </div>

      <section className="border-border bg-card rounded-2xl border p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-foreground font-semibold">
              {t("payout.title")}
            </h2>
            <p className="text-muted-foreground mt-0.5 text-sm">
              {t("payout.subtitle")}
            </p>
          </div>
          {hasPayoutMethod && (
            <Button
              size="sm"
              variant="ghost"
              className="shrink-0 text-red-500 hover:text-red-600"
              onClick={() => removePayoutMethod()}
              disabled={removing}
            >
              {removing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              {t("payout.remove")}
            </Button>
          )}
        </div>

        {payoutLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 rounded-xl" />
            <Skeleton className="h-10 rounded-xl" />
          </div>
        ) : hasPayoutMethod ? (
          <div className="border-border rounded-xl border p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-primary h-5 w-5" />
              <p className="text-foreground text-sm font-medium">
                {t("payout.configured")}
              </p>
            </div>
            <div className="mt-3 space-y-1.5 text-sm">
              {payoutSettings?.method && (
                <p className="text-muted-foreground">
                  {t("payout.method")}:{" "}
                  <span className="text-foreground font-medium">
                    {payoutSettings.method === PayoutMethod.KaspiTransfer
                      ? "Kaspi"
                      : payoutSettings.method === PayoutMethod.CardTransfer
                        ? t("payout.tabCard")
                        : t("payout.tabBank")}
                  </span>
                </p>
              )}
              {payoutSettings?.kaspiPhone && (
                <p className="text-muted-foreground">
                  {t("payout.kaspiPhone")}:{" "}
                  <span className="text-foreground font-medium">
                    {payoutSettings.kaspiPhone}
                  </span>
                </p>
              )}
              {payoutSettings?.cardNumber && (
                <p className="text-muted-foreground">
                  {t("payout.cardNumber")}:{" "}
                  <span className="text-foreground font-medium">
                    •••• {payoutSettings.cardNumber.slice(-4)}
                  </span>
                </p>
              )}
              {payoutSettings?.cardHolder && (
                <p className="text-muted-foreground">
                  {t("payout.cardHolder")}:{" "}
                  <span className="text-foreground font-medium">
                    {payoutSettings.cardHolder}
                  </span>
                </p>
              )}
              {payoutSettings?.iban && (
                <p className="text-muted-foreground">
                  {t("payout.iban")}:{" "}
                  <span className="text-foreground font-medium">
                    {payoutSettings.iban}
                  </span>
                </p>
              )}
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-muted-foreground mb-3 text-sm font-medium">
                {t("payout.update")}
              </p>
              <PayoutMethodForm
                existing={payoutSettings ?? null}
                onSaved={() => {}}
              />
            </div>
          </div>
        ) : (
          <PayoutMethodForm existing={null} onSaved={() => {}} />
        )}
      </section>

      <section className="border-border bg-card rounded-2xl border p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-foreground font-semibold">{t("tier.title")}</h2>
            <p className="text-muted-foreground mt-0.5 text-sm">
              {t("tier.subtitle")}
            </p>
          </div>
          {hasPayoutMethod && canAddTier && (
            <Button
              size="sm"
              variant="gradient"
              className="shrink-0 gap-1.5"
              onClick={openCreate}
            >
              <Plus className="h-4 w-4" />
              {t("tier.create")}
            </Button>
          )}
        </div>

        {!hasPayoutMethod ? (
          <div className="border-border flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
            <Gift className="text-muted-foreground/40 h-10 w-10" />
            <p className="text-muted-foreground text-sm">
              {t("tier.requiresPayout")}
            </p>
          </div>
        ) : tiersLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-2xl" />
            ))}
          </div>
        ) : tiers.length === 0 ? (
          <div className="border-border flex flex-col items-center gap-3 rounded-xl border border-dashed py-12 text-center">
            <Gift className="text-muted-foreground/40 h-10 w-10" />
            <p className="text-muted-foreground text-sm">{t("tier.empty")}</p>
            <Button size="sm" variant="outline" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              {t("tier.create")}
            </Button>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <TierCard
                key={tier.id}
                tier={tier}
                onEdit={() => openEdit(tier)}
                onDelete={() => setDeletingTierId(tier.id)}
              />
            ))}
            {canAddTier && (
              <button
                onClick={openCreate}
                className="border-border hover:border-primary/40 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed py-8 transition-colors"
              >
                <Plus className="text-muted-foreground h-6 w-6" />
                <span className="text-muted-foreground text-sm">
                  {t("tier.addMore")}
                </span>
              </button>
            )}
          </div>
        )}
      </section>

      <TierDialog
        open={tierDialogOpen}
        onClose={() => {
          setTierDialogOpen(false);
          setEditingTier(null);
          refetchTiers();
        }}
        initial={editingTier?.form}
        tierId={editingTier?.id}
      />

      <Dialog
        open={!!deletingTierId}
        onOpenChange={(v) => !v && setDeletingTierId(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("tier.deleteTitle")}</DialogTitle>
            <DialogDescription>{t("tier.deleteDesc")}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeletingTierId(null)}>
              {t("tier.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deletingTierId)
                  deleteTier({ variables: { tierId: deletingTierId } });
              }}
              disabled={deleting}
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("tier.delete")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
