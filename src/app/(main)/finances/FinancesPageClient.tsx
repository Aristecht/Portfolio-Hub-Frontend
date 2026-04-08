"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {
  TrendingDown,
  TrendingUp,
  Wallet,
  Users,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ArrowDownToLine,
  Loader2,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/common/ui/Avatar";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { storageUrl } from "@/utils/storage-url";
import { cn } from "@/utils/tw-merge";
import {
  useGetBalanceQuery,
  useGetDonationStatsQuery,
  useGetPaymentHistoryQuery,
  useGetPayoutHistoryQuery,
  useRequestPayoutMutation,
  PaymentsStatus,
  PayoutStatus,
  PayoutMethod,
} from "@/generated/output";
import { useAuth } from "@/hooks/useCurrentUser";
import { toast } from "sonner";

type Tab = "received" | "sent";

function BalanceCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="border-border bg-card flex flex-col gap-2 rounded-2xl border p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{label}</p>
        <div className={cn("rounded-xl p-2", accent ?? "bg-muted")}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="text-foreground text-2xl font-bold">
        {value.toLocaleString()}{" "}
        <span className="text-muted-foreground text-base font-normal">₸</span>
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: PaymentsStatus }) {
  const map: Record<
    PaymentsStatus,
    { label: string; icon: React.ElementType; cls: string }
  > = {
    [PaymentsStatus.Succeeded]: {
      label: "Succeeded",
      icon: CheckCircle2,
      cls: "text-green-600 bg-green-500/10",
    },
    [PaymentsStatus.Pending]: {
      label: "Pending",
      icon: Clock,
      cls: "text-yellow-600 bg-yellow-500/10",
    },
    [PaymentsStatus.Processing]: {
      label: "Processing",
      icon: RefreshCw,
      cls: "text-blue-600 bg-blue-500/10",
    },
    [PaymentsStatus.Failed]: {
      label: "Failed",
      icon: XCircle,
      cls: "text-red-600 bg-red-500/10",
    },
    [PaymentsStatus.Expired]: {
      label: "Expired",
      icon: XCircle,
      cls: "text-red-500 bg-red-500/10",
    },
    [PaymentsStatus.Refunded]: {
      label: "Refunded",
      icon: RefreshCw,
      cls: "text-muted-foreground bg-muted",
    },
  };
  const { label, icon: Icon, cls } = map[status] ?? map[PaymentsStatus.Pending];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        cls
      )}
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

export function FinancesPageClient() {
  const t = useTranslations("finances");
  const { profile } = useAuth();
  const [tab, setTab] = useState<Tab>("received");
  const [page] = useState(1);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const {
    data: balanceData,
    loading: balanceLoading,
    refetch: refetchBalance,
  } = useGetBalanceQuery({
    fetchPolicy: "cache-and-network",
  });
  const { data: statsData, loading: statsLoading } = useGetDonationStatsQuery({
    fetchPolicy: "cache-and-network",
  });
  const { data: historyData, loading: historyLoading } =
    useGetPaymentHistoryQuery({
      variables: { data: { page, limit: 50 } },
      fetchPolicy: "cache-and-network",
    });

  const [requestPayout, { loading: payoutLoading }] = useRequestPayoutMutation({
    onCompleted: (data) => {
      toast.success(
        `${t("withdraw.success")} ${data.requestPayout.amount.toLocaleString()} ₸`
      );
      setWithdrawOpen(false);
      refetchBalance();
      refetchPayoutHistory();
    },
    onError: (e) => toast.error(e.message),
  });

  const {
    data: payoutHistoryData,
    loading: payoutHistoryLoading,
    refetch: refetchPayoutHistory,
  } = useGetPayoutHistoryQuery({
    variables: { data: { page: 1, limit: 20 } },
    fetchPolicy: "cache-and-network",
  });

  const balance = balanceData?.getBalance;
  const stats = statsData?.getDonationStats;
  const allPayments = historyData?.getPaymentHistory.data ?? [];

  const availableBalance = balance?.availableBalance ?? 0;

  const payoutHistory = payoutHistoryData?.getPayoutHistory.data ?? [];

  const payoutStatusMap: Record<
    PayoutStatus,
    { label: string; icon: React.ElementType; cls: string }
  > = {
    [PayoutStatus.Pending]: {
      label: t("payout.status.pending"),
      icon: Clock,
      cls: "text-yellow-600 bg-yellow-500/10",
    },
    [PayoutStatus.Processing]: {
      label: t("payout.status.processing"),
      icon: RefreshCw,
      cls: "text-blue-600 bg-blue-500/10",
    },
    [PayoutStatus.Completed]: {
      label: t("payout.status.completed"),
      icon: CheckCircle2,
      cls: "text-green-600 bg-green-500/10",
    },
    [PayoutStatus.Failed]: {
      label: t("payout.status.failed"),
      icon: XCircle,
      cls: "text-red-600 bg-red-500/10",
    },
  };

  const methodLabel: Record<PayoutMethod, string> = {
    [PayoutMethod.KaspiTransfer]: "Kaspi",
    [PayoutMethod.CardTransfer]: t("payout.method.card"),
    [PayoutMethod.BankTransfer]: t("payout.method.bank"),
  };

  const payments = allPayments.filter((p) =>
    tab === "received"
      ? p.recipient.username === profile?.username
      : p.donor.username === profile?.username
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-foreground text-2xl font-bold">
            {t("pageTitle")}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
        </div>
        <Button
          onClick={() => setWithdrawOpen(true)}
          disabled={availableBalance <= 0 || balanceLoading}
          className="shrink-0"
        >
          <ArrowDownToLine className="h-4 w-4" />
          {t("withdraw.button")}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {balanceLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))
        ) : (
          <>
            <BalanceCard
              label={t("balance.available")}
              value={balance?.availableBalance ?? 0}
              icon={Wallet}
              accent="bg-primary/10"
            />
            <BalanceCard
              label={t("balance.totalReceived")}
              value={balance?.totalReceived ?? 0}
              icon={TrendingUp}
              accent="bg-green-500/10"
            />
            <BalanceCard
              label={t("balance.totalPaidOut")}
              value={balance?.totalPaidOut ?? 0}
              icon={TrendingDown}
              accent="bg-orange-500/10"
            />
          </>
        )}
        {statsLoading ? (
          <Skeleton className="h-24 rounded-2xl" />
        ) : (
          <BalanceCard
            label={t("balance.uniqueDonors")}
            value={stats?.uniqueDonorsCount ?? 0}
            icon={Users}
            accent="bg-blue-500/10"
          />
        )}
      </div>

      {!statsLoading && stats && (
        <div className="border-border bg-card grid grid-cols-2 gap-4 rounded-2xl border p-4 sm:grid-cols-4 sm:p-5">
          {[
            {
              label: t("stats.received"),
              value: stats.donationsReceivedCount,
            },
            { label: t("stats.given"), value: stats.donationsGivenCount },
            {
              label: t("stats.totalReceived"),
              value: `${stats.totalReceived.toLocaleString()} ₸`,
            },
            {
              label: t("stats.totalGiven"),
              value: `${stats.totalGiven.toLocaleString()} ₸`,
            },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-foreground text-lg font-bold">{value}</p>
              <p className="text-muted-foreground text-xs">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="border-border bg-muted/30 mb-4 flex gap-1 rounded-xl border p-1">
          {(["received", "sent"] as const).map((t_) => (
            <button
              key={t_}
              onClick={() => setTab(t_)}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors",
                tab === t_
                  ? "bg-primary text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t_ === "received" ? (
                <ArrowDownLeft className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5" />
              )}
              {t(`tabs.${t_}`)}
            </button>
          ))}
        </div>

        {historyLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : payments.length === 0 ? (
          <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
            <Wallet className="text-muted-foreground/40 mb-3 h-10 w-10" />
            <p className="text-muted-foreground text-sm">{t(`empty.${tab}`)}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {payments.map((p) => {
              const counterpart = tab === "received" ? p.donor : p.recipient;
              const isAnon = p.isAnonymous && tab === "received";
              return (
                <div
                  key={p.id}
                  className="border-border bg-card flex items-center gap-3 rounded-xl border px-4 py-3"
                >
                  <Avatar className="h-10 w-10 shrink-0">
                    {!isAnon && (
                      <AvatarImage
                        src={storageUrl(counterpart.avatar) ?? undefined}
                      />
                    )}
                    <AvatarFallback className="text-sm font-semibold">
                      {isAnon
                        ? "?"
                        : (counterpart.username?.[0] ?? "?").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {isAnon ? t("anonymous") : `@${counterpart.username}`}
                    </p>
                    {p.message && (
                      <p className="text-muted-foreground truncate text-xs">
                        {p.message}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        tab === "received"
                          ? "text-green-600"
                          : "text-foreground"
                      )}
                    >
                      {tab === "received" ? "+" : "−"}
                      {p.amount.toLocaleString()} {p.currency}
                    </span>
                    <StatusBadge status={p.status} />
                  </div>

                  <p className="text-muted-foreground hidden shrink-0 text-xs sm:block">
                    {p.paidAt
                      ? format(new Date(p.paidAt), "dd MMM yyyy")
                      : format(new Date(p.createdAt), "dd MMM yyyy")}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payout history */}
      <div>
        <h2 className="text-foreground mb-3 text-base font-semibold">
          {t("payout.historyTitle")}
        </h2>
        {payoutHistoryLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : payoutHistory.length === 0 ? (
          <div className="border-border bg-muted/20 flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 text-center">
            <ArrowDownToLine className="text-muted-foreground/40 mb-3 h-9 w-9" />
            <p className="text-muted-foreground text-sm">{t("payout.empty")}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {payoutHistory.map((item) => {
              const s =
                payoutStatusMap[item.status] ??
                payoutStatusMap[PayoutStatus.Pending];
              const StatusIcon = s.icon;
              return (
                <div
                  key={item.id}
                  className="border-border bg-card flex items-center gap-3 rounded-xl border px-4 py-3"
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      s.cls
                    )}
                  >
                    <StatusIcon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium">
                      {methodLabel[item.method]}
                    </p>
                    {item.transactionId && (
                      <p className="text-muted-foreground truncate text-xs">
                        ID: {item.transactionId}
                      </p>
                    )}
                    {item.failureReason && (
                      <p className="truncate text-xs text-red-500">
                        {item.failureReason}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-foreground text-sm font-bold">
                      {item.amount.toLocaleString()} ₸
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        s.cls
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {s.label}
                    </span>
                  </div>
                  <p className="text-muted-foreground hidden shrink-0 text-xs sm:block">
                    {format(
                      new Date(item.processedAt ?? item.createdAt),
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t("withdraw.title")}</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            {t("withdraw.confirm")}{" "}
            <span className="text-foreground font-semibold">
              {availableBalance.toLocaleString()} ₸
            </span>
            ?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setWithdrawOpen(false)}
              disabled={payoutLoading}
            >
              {t("withdraw.cancel")}
            </Button>
            <Button onClick={() => requestPayout()} disabled={payoutLoading}>
              {payoutLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("withdraw.button")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
