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
import { emailSchema, TypeEmailSchema } from "@/schemas/settings/email.schema";
import { useChangeEmailMutation } from "@/generated/output";
import { Spinner } from "@/components/common/ui/Spinner";

export function ChangeEmailForm() {
  const t = useTranslations("auth.settings.email");
  const tv = useTranslations("auth.settings.email.validation");

  const form = useForm<TypeEmailSchema>({
    resolver: zodResolver(emailSchema(tv)),
    defaultValues: { email: "" },
  });

  const [changeEmail, { loading }] = useChangeEmailMutation({
    onCompleted() {
      toast.success(t("success"));
      form.reset();
    },
    onError() {
      toast.error(t("error"));
    },
  });

  function onSubmit(data: TypeEmailSchema) {
    changeEmail({ variables: { data } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
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
