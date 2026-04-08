"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/ui/Form";
import { Input } from "@/components/common/ui/Input";
import { Button } from "@/components/common/ui/Button";
import {
  passwordSchema,
  TypePasswordSchema,
} from "@/schemas/settings/password.schema";
import { useChangePasswordMutation } from "@/generated/output";
import { Spinner } from "@/components/common/ui/Spinner";

export function ChangePasswordForm() {
  const t = useTranslations("auth.settings.password");
  const tv = useTranslations("auth.settings.password.validation");

  const form = useForm<TypePasswordSchema>({
    resolver: zodResolver(passwordSchema(tv)),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const [changePassword, { loading }] = useChangePasswordMutation({
    onCompleted() {
      toast.success(t("success"));
      form.reset();
    },
    onError() {
      toast.error(t("error"));
    },
  });

  function onSubmit(data: TypePasswordSchema) {
    changePassword({ variables: { data } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("oldPassword")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("oldPasswordPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("newPassword")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("newPasswordPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading && <Spinner />}
          {t("save")}
        </Button>
      </form>
    </Form>
  );
}
