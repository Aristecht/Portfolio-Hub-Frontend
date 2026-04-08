"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useApolloClient } from "@apollo/client/react";
import { Button } from "@/components/common/ui/Button";
import { Input } from "@/components/common/ui/Input";
import { Label } from "@/components/common/ui/Label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/common/ui/Dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/common/ui/InputOTP";
import { Spinner } from "@/components/common/ui/Spinner";
import {
  useDeactivateAccountMutation,
  useLogoutMutation,
} from "@/generated/output";
import { authStore } from "@/store/auth/auth.store";

export function DeactivateAccount() {
  const t = useTranslations("auth.settings.deactivate");
  const apolloClient = useApolloClient();
  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);
  const setIsAuthenticated = authStore((state) => state.setIsAuthenticated);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"credentials" | "pin">("credentials");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");

  const [logout] = useLogoutMutation();

  const [deactivate, { loading }] = useDeactivateAccountMutation({
    async onCompleted(data) {
      if (data.deactivateAccount.user) {
        toast.success(t("success"));
        setOpen(false);
        try {
          await logout();
        } catch {
          /* ignore */
        }
        setUser(null);
        setIsAuthenticated(false);
        await apolloClient.clearStore();
        window.location.href = "/account/login";
      } else {
        // user: null means step 1 succeeded — backend sent the confirmation code
        setStep("pin");
        toast.info(t("codeSent"));
      }
    },
    onError(error) {
      const msg = error.message.toLowerCase();
      if (
        msg.includes("токен") ||
        msg.includes("token") ||
        msg.includes("истек") ||
        msg.includes("expired")
      ) {
        setPin("");
        toast.error(t("invalidCode"));
      } else {
        toast.error(t("error"));
      }
    },
  });

  function handleResend() {
    setStep("credentials");
    setPin("");
  }

  function handleClose(value: boolean) {
    if (!value) {
      setPassword("");
      setPin("");
      setStep("credentials");
    }
    setOpen(value);
  }

  function handleSubmit() {
    if (!user?.email || !password) return;
    deactivate({
      variables: {
        data: {
          email: user.email,
          password,
          ...(step === "pin" && pin.length === 6 ? { pin } : {}),
        },
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="destructive">{t("button")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("confirmTitle")}</DialogTitle>
          <DialogDescription>
            {step === "credentials"
              ? t("confirmDescription")
              : t("pinDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {step === "credentials" && (
            <div className="space-y-2">
              <Label>{t("password")}</Label>
              <Input
                type="password"
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
          )}

          {step === "pin" && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-muted-foreground text-center text-sm">
                {t("pinHint")}
              </p>
              <InputOTP maxLength={6} value={pin} onChange={setPin}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-2 transition-colors"
                onClick={handleResend}
              >
                {t("resend")}
              </button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={
              (step === "credentials" && !password) ||
              (step === "pin" && pin.length !== 6) ||
              loading
            }
          >
            {loading ? <Spinner /> : step === "pin" ? t("confirm") : t("next")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
