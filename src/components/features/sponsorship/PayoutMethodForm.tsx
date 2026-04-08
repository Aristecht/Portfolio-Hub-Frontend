"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Phone,
  CreditCard,
  Building2,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import { cn } from "@/utils/tw-merge";
import { PayoutMethod, useSetupPayoutMethodMutation } from "@/generated/output";

type PayoutMethodTab = "kaspi" | "card" | "bank";

export function PayoutMethodForm({
  existing,
  onSaved,
}: {
  existing: {
    method?: string | null;
    kaspiPhone?: string | null;
    cardNumber?: string | null;
    cardHolder?: string | null;
    iban?: string | null;
  } | null;
  onSaved: () => void;
}) {
  const t = useTranslations("sponsorship.payout");
  const [activeTab, setActiveTab] = useState<PayoutMethodTab>(() => {
    if (existing?.method === PayoutMethod.KaspiTransfer) return "kaspi";
    if (existing?.method === PayoutMethod.CardTransfer) return "card";
    if (existing?.method === PayoutMethod.BankTransfer) return "bank";
    return "kaspi";
  });

  const [kaspiPhone, setKaspiPhone] = useState(existing?.kaspiPhone ?? "");
  const [cardNumber, setCardNumber] = useState(existing?.cardNumber ?? "");
  const [cardHolder, setCardHolder] = useState(existing?.cardHolder ?? "");
  const [iban, setIban] = useState(existing?.iban ?? "");

  const [setup, { loading }] = useSetupPayoutMethodMutation({
    onCompleted: () => {
      toast.success(t("savedSuccess"));
      onSaved();
    },
    onError: (e) => toast.error(e.message),
    refetchQueries: ["GetPayoutSettings"],
  });

  const handleSave = () => {
    const methodMap: Record<PayoutMethodTab, PayoutMethod> = {
      kaspi: PayoutMethod.KaspiTransfer,
      card: PayoutMethod.CardTransfer,
      bank: PayoutMethod.BankTransfer,
    };
    const data: Record<string, unknown> = { method: methodMap[activeTab] };
    if (activeTab === "kaspi") data.kaspiPhone = kaspiPhone.trim();
    if (activeTab === "card") {
      data.cardNumber = cardNumber.trim();
      data.cardHolder = cardHolder.trim();
    }
    if (activeTab === "bank") data.iban = iban.trim();
    setup({
      variables: {
        data: data as Parameters<typeof setup>[0]["variables"]["data"],
      },
    });
  };

  const tabs: {
    key: PayoutMethodTab;
    label: string;
    icon: React.ElementType;
  }[] = [
    { key: "kaspi", label: "Kaspi", icon: Phone },
    { key: "card", label: t("tabCard"), icon: CreditCard },
    { key: "bank", label: t("tabBank"), icon: Building2 },
  ];

  return (
    <div className="space-y-5">
      <div className="border-border bg-muted/30 flex gap-1 rounded-xl border p-1">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors",
              activeTab === key
                ? "bg-primary text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {activeTab === "kaspi" && (
        <div className="space-y-2">
          <Label>{t("kaspiPhone")}</Label>
          <Input
            placeholder="+7 777 000 0000"
            value={kaspiPhone}
            onChange={(e) => setKaspiPhone(e.target.value)}
          />
          <p className="text-muted-foreground text-xs">{t("kaspiPhoneHint")}</p>
        </div>
      )}

      {activeTab === "card" && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label>{t("cardNumber")}</Label>
            <Input
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("cardHolder")}</Label>
            <Input
              placeholder="IVAN IVANOV"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            />
          </div>
        </div>
      )}

      {activeTab === "bank" && (
        <div className="space-y-2">
          <Label>{t("iban")}</Label>
          <Input
            placeholder="KZ00 000A 0000 0000 0000"
            value={iban}
            onChange={(e) => setIban(e.target.value.toUpperCase())}
          />
          <p className="text-muted-foreground text-xs">{t("ibanHint")}</p>
        </div>
      )}

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={loading}
        variant="gradient"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ShieldCheck className="h-4 w-4" />
        )}
        {t("save")}
      </Button>
    </div>
  );
}
