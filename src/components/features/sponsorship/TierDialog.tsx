"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import {
  useCreateDonationTierMutation,
  useUpdateDonationTierMutation,
} from "@/generated/output";

export type TierFormData = {
  title: string;
  description: string;
  amount: string;
  benefits: string;
};

export const EMPTY_TIER: TierFormData = {
  title: "",
  description: "",
  amount: "",
  benefits: "",
};

export function TierDialog({
  open,
  onClose,
  initial,
  tierId,
}: {
  open: boolean;
  onClose: () => void;
  initial?: TierFormData;
  tierId?: string;
}) {
  const t = useTranslations("sponsorship.tier");
  const isEdit = !!tierId;
  const [form, setForm] = useState<TierFormData>(initial ?? EMPTY_TIER);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => setForm(initial ?? EMPTY_TIER), 0);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const [create, { loading: creating }] = useCreateDonationTierMutation({
    onCompleted: () => {
      toast.success(t("createSuccess"));
      onClose();
    },
    onError: (e) => toast.error(e.message),
    refetchQueries: ["GetTiersByAuthor"],
    awaitRefetchQueries: true,
  });

  const [update, { loading: updating }] = useUpdateDonationTierMutation({
    onCompleted: () => {
      toast.success(t("updateSuccess"));
      onClose();
    },
    onError: (e) => toast.error(e.message),
    refetchQueries: ["GetTiersByAuthor"],
    awaitRefetchQueries: true,
  });

  const loading = creating || updating;

  const handleSubmit = () => {
    const benefits = form.benefits
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean);
    const amount = parseFloat(form.amount);
    if (!form.title.trim() || isNaN(amount) || amount <= 0) {
      toast.error(t("validationError"));
      return;
    }
    if (isEdit && tierId) {
      update({
        variables: {
          data: {
            tierId,
            title: form.title.trim(),
            description: form.description.trim() || undefined,
            amount,
            benefits: benefits.length > 0 ? benefits : undefined,
          },
        },
      });
    } else {
      create({
        variables: {
          data: {
            title: form.title.trim(),
            description: form.description.trim() || undefined,
            amount,
            benefits: benefits.length > 0 ? benefits : undefined,
          },
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t("editTitle") : t("createTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t("titleLabel")}</Label>
            <Input
              placeholder={t("titlePlaceholder")}
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>{t("amountLabel")}</Label>
            <Input
              type="number"
              placeholder="500"
              min={1}
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({ ...f, amount: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              {t("descriptionLabel")}{" "}
              <span className="text-muted-foreground font-normal">
                ({t("optional")})
              </span>
            </Label>
            <Input
              placeholder={t("descriptionPlaceholder")}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              {t("benefitsLabel")}{" "}
              <span className="text-muted-foreground font-normal">
                ({t("optional")})
              </span>
            </Label>
            <textarea
              className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-1 focus-visible:outline-none"
              placeholder={t("benefitsPlaceholder")}
              value={form.benefits}
              onChange={(e) =>
                setForm((f) => ({ ...f, benefits: e.target.value }))
              }
            />
            <p className="text-muted-foreground text-xs">{t("benefitsHint")}</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            <X className="h-4 w-4" />
            {t("cancel")}
          </Button>
          <Button variant="gradient" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            {isEdit ? t("save") : t("create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
