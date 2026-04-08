"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import {
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Loader2,
  CreditCard,
  Building2,
  Smartphone,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { Skeleton } from "@/components/common/ui/Skeleton";
import { Button } from "@/components/common/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/common/ui/Dialog";
import { cn } from "@/utils/tw-merge";
import {
  useGetAllPayoutsQuery,
  useGetPendingPayoutsQuery,
  useGetEarnOnFeeQuery,
  useApprovePayoutMutation,
  useRejectPayoutMutation,
  useStartProcessingPayoutMutation,
  PayoutStatus,
  PayoutMethod,
} from "@/generated/output";
import { toast } from "sonner";

type AdminTab = "pending" | "all";

const payoutStatusConfig: Record<
  PayoutStatus,
  { label: string; icon: React.ElementType; cls: string }
> = {
  [PayoutStatus.Pending]: {
    label: "Pending",
    icon: Clock,
    cls: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  [PayoutStatus.Processing]: {
    label: "Processing",
    icon: RefreshCw,
    cls: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  [PayoutStatus.Completed]: {
    label: "Completed",
    icon: CheckCircle2,
    cls: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  [PayoutStatus.Failed]: {
    label: "Failed",
    icon: XCircle,
    cls: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

function MethodIcon({ method }: { method: PayoutMethod }) {
  if (method === PayoutMethod.KaspiTransfer)
    return <Smartphone className="h-4 w-4" />;
  if (method === PayoutMethod.CardTransfer)
    return <CreditCard className="h-4 w-4" />;
  return <Building2 className="h-4 w-4" />;
}

function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  const cfg = payoutStatusConfig[status];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        cfg.cls
      )}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="border-border bg-card flex flex-col gap-2 rounded-2xl border p-5">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{label}</p>
        <div className={cn("rounded-xl p-2", accent)}>
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

interface PayoutItemProps {
  id: string;
  amount: number;
  status: PayoutStatus;
  createdAt: string;
  user: { id: string; username: string };
  payoutDetails?: {
    method: PayoutMethod;
    phone?: string | null;
    card?: string | null;
    iban?: string | null;
  } | null;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onStartProcessing?: (id: string) => void;
  loadingId?: string | null;
}

function PayoutItem({
  id,
  amount,
  status,
  createdAt,
  user,
  payoutDetails,
  onApprove,
  onReject,
  onStartProcessing,
  loadingId,
}: PayoutItemProps) {
  const [expanded, setExpanded] = useState(false);
  const isLoading = loadingId === id;

  return (
    <div className="border-border bg-card rounded-xl border">
      <div
        className="flex cursor-pointer items-center justify-between gap-4 p-4"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            {payoutDetails ? (
              <MethodIcon method={payoutDetails.method} />
            ) : (
              <DollarSign className="h-4 w-4" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-medium">
              @{user.username}
            </p>
            <p className="text-muted-foreground text-xs">
              {format(new Date(createdAt), "dd.MM.yyyy HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <p className="text-foreground font-semibold">
            {Math.floor(amount / 100).toLocaleString()} ₸
          </p>
          <PayoutStatusBadge status={status} />
          {expanded ? (
            <ChevronUp className="text-muted-foreground h-4 w-4" />
          ) : (
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-border border-t p-4">
          {payoutDetails ? (
            <div className="mb-4 space-y-2">
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Bank details
              </p>
              <div className="bg-muted rounded-lg p-3 text-sm">
                {payoutDetails.method === PayoutMethod.KaspiTransfer && (
                  <p>
                    <span className="text-muted-foreground">Kaspi phone: </span>
                    <span className="font-mono font-medium">
                      {payoutDetails.phone}
                    </span>
                  </p>
                )}
                {payoutDetails.method === PayoutMethod.CardTransfer && (
                  <p>
                    <span className="text-muted-foreground">Card: </span>
                    <span className="font-mono font-medium">
                      {payoutDetails.card}
                    </span>
                  </p>
                )}
                {payoutDetails.method === PayoutMethod.BankTransfer && (
                  <p>
                    <span className="text-muted-foreground">IBAN: </span>
                    <span className="font-mono font-medium">
                      {payoutDetails.iban}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>No bank details provided</span>
            </div>
          )}

          {(status === PayoutStatus.Pending ||
            status === PayoutStatus.Processing) && (
            <div className="flex flex-wrap gap-2">
              {status === PayoutStatus.Pending && onStartProcessing && (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartProcessing(id);
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Mark Processing
                </Button>
              )}
              {onApprove && (
                <Button
                  size="sm"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    onApprove(id);
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Approve
                </Button>
              )}
              {onReject && (
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={isLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject(id);
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <XCircle className="mr-1.5 h-3.5 w-3.5" />
                  )}
                  Reject
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function AdminPayoutsClient() {
  const t = useTranslations("admin");
  const [tab, setTab] = useState<AdminTab>("pending");

  // Approve dialog state
  const [approveDialogId, setApproveDialogId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");

  // Reject dialog state
  const [rejectDialogId, setRejectDialogId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const { data: feeData, loading: feeLoading } = useGetEarnOnFeeQuery();

  const {
    data: pendingData,
    loading: pendingLoading,
    refetch: refetchPending,
  } = useGetPendingPayoutsQuery({
    variables: { data: { page: 1, limit: 50 } },
  });

  const {
    data: allData,
    loading: allLoading,
    refetch: refetchAll,
  } = useGetAllPayoutsQuery({
    variables: { data: { page: 1, limit: 50 } },
  });

  const [startProcessing] = useStartProcessingPayoutMutation({
    onCompleted: () => {
      toast.success(t("payouts.markedProcessing"));
      setActionLoadingId(null);
      refetchPending();
      refetchAll();
    },
    onError: (err) => {
      toast.error(err.message);
      setActionLoadingId(null);
    },
  });

  const [approvePayout, { loading: approveLoading }] = useApprovePayoutMutation(
    {
      onCompleted: () => {
        toast.success(t("payouts.approved"));
        setActionLoadingId(null);
        setApproveDialogId(null);
        setTransactionId("");
        refetchPending();
        refetchAll();
      },
      onError: (err) => {
        toast.error(err.message);
        setActionLoadingId(null);
      },
    }
  );

  const [rejectPayout, { loading: rejectLoading }] = useRejectPayoutMutation({
    onCompleted: () => {
      toast.success(t("payouts.rejected"));
      setActionLoadingId(null);
      setRejectDialogId(null);
      setRejectReason("");
      refetchPending();
      refetchAll();
    },
    onError: (err) => {
      toast.error(err.message);
      setActionLoadingId(null);
    },
  });

  const handleStartProcessing = (payoutId: string) => {
    setActionLoadingId(payoutId);
    startProcessing({ variables: { payoutId } });
  };

  const handleApproveSubmit = () => {
    if (!approveDialogId || !transactionId.trim()) return;
    approvePayout({
      variables: {
        payoutId: approveDialogId,
        transactionId: transactionId.trim(),
      },
    });
  };

  const handleRejectSubmit = () => {
    if (!rejectDialogId || !rejectReason.trim()) return;
    rejectPayout({
      variables: { payoutId: rejectDialogId, reason: rejectReason.trim() },
    });
  };

  const fee = feeData?.getEarnOnFee;
  const pendingList = pendingData?.getPendingPayouts?.data ?? [];
  const allList = allData?.getAllPayouts?.data ?? [];
  const currentList = tab === "pending" ? pendingList : allList;
  const isListLoading = tab === "pending" ? pendingLoading : allLoading;

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-foreground text-2xl font-bold">
          {t("payouts.pageTitle")}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("payouts.subtitle")}
        </p>
      </div>

      {/* Commission stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {feeLoading ? (
          <>
            <Skeleton className="h-22.5 rounded-2xl" />
            <Skeleton className="h-22.5 rounded-2xl" />
          </>
        ) : (
          <>
            <StatCard
              label={t("payouts.totalReceived")}
              value={fee?.totalReceived ?? 0}
              icon={TrendingUp}
              accent="bg-green-500/10 text-green-600"
            />
            <StatCard
              label={t("payouts.platformFee")}
              value={fee?.totalPlatformFee ?? 0}
              icon={DollarSign}
              accent="bg-purple-500/10 text-purple-600"
            />
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="border-border bg-muted/40 flex gap-1 rounded-xl border p-1">
        {(["pending", "all"] as AdminTab[]).map((t_) => (
          <button
            key={t_}
            onClick={() => setTab(t_)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === t_
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t_ === "pending"
              ? `${t("payouts.tabPending")}${pendingList.length > 0 ? ` (${pendingList.length})` : ""}`
              : t("payouts.tabAll")}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {isListLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-18 rounded-xl" />
          ))
        ) : currentList.length === 0 ? (
          <div className="border-border bg-card flex flex-col items-center gap-3 rounded-2xl border py-16 text-center">
            <div className="bg-muted rounded-full p-4">
              <CheckCircle2 className="text-muted-foreground h-6 w-6" />
            </div>
            <p className="text-muted-foreground text-sm">
              {tab === "pending"
                ? t("payouts.emptyPending")
                : t("payouts.emptyAll")}
            </p>
          </div>
        ) : (
          currentList.map((item) => (
            <PayoutItem
              key={item.id}
              id={item.id}
              amount={item.amount}
              status={item.status}
              createdAt={item.createdAt}
              user={item.user}
              payoutDetails={item.payoutDetails}
              loadingId={actionLoadingId}
              onStartProcessing={
                item.status === PayoutStatus.Pending
                  ? handleStartProcessing
                  : undefined
              }
              onApprove={
                item.status === PayoutStatus.Pending ||
                item.status === PayoutStatus.Processing
                  ? (id) => setApproveDialogId(id)
                  : undefined
              }
              onReject={
                item.status === PayoutStatus.Pending ||
                item.status === PayoutStatus.Processing
                  ? (id) => setRejectDialogId(id)
                  : undefined
              }
            />
          ))
        )}
      </div>

      {/* Approve Dialog */}
      <Dialog
        open={!!approveDialogId}
        onOpenChange={(open) => {
          if (!open) {
            setApproveDialogId(null);
            setTransactionId("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("payouts.approveTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-muted-foreground text-sm">
              {t("payouts.approveHint")}
            </p>
            <input
              className="border-border bg-background text-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              placeholder={t("payouts.transactionIdPlaceholder")}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setApproveDialogId(null);
                setTransactionId("");
              }}
            >
              {t("payouts.cancel")}
            </Button>
            <Button
              disabled={!transactionId.trim() || approveLoading}
              onClick={handleApproveSubmit}
            >
              {approveLoading && (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              )}
              {t("payouts.approveConfirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={!!rejectDialogId}
        onOpenChange={(open) => {
          if (!open) {
            setRejectDialogId(null);
            setRejectReason("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("payouts.rejectTitle")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-muted-foreground text-sm">
              {t("payouts.rejectHint")}
            </p>
            <textarea
              className="border-border bg-background text-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              rows={3}
              placeholder={t("payouts.rejectReasonPlaceholder")}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogId(null);
                setRejectReason("");
              }}
            >
              {t("payouts.cancel")}
            </Button>
            <Button
              variant="destructive"
              disabled={!rejectReason.trim() || rejectLoading}
              onClick={handleRejectSubmit}
            >
              {rejectLoading && (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              )}
              {t("payouts.rejectConfirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
