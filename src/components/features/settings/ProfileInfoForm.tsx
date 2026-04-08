"use client";

import { useEffect } from "react";
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
  profileSchema,
  TypeProfileSchema,
} from "@/schemas/settings/profile.schema";
import { useChangeProfileInfoMutation } from "@/generated/output";
import { Spinner } from "@/components/common/ui/Spinner";

interface Props {
  displayName: string;
  username: string;
  bio: string;
}

export function ProfileInfoForm({ displayName, username, bio }: Props) {
  const t = useTranslations("auth.settings.profile");
  const tv = useTranslations("auth.settings.profile.validation");

  const form = useForm<TypeProfileSchema>({
    resolver: zodResolver(profileSchema(tv)),
    defaultValues: { displayName, username, bio: bio ?? "" },
  });

  useEffect(() => {
    form.reset({ displayName, username, bio: bio ?? "" });
  }, [displayName, username, bio, form]);

  const [changeProfile, { loading }] = useChangeProfileInfoMutation({
    onCompleted() {
      toast.success(t("success"));
    },
    onError() {
      toast.error(t("error"));
    },
    refetchQueries: ["FindProfile"],
  });

  function onSubmit(data: TypeProfileSchema) {
    changeProfile({ variables: { data } });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("displayName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("displayNamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("username")}</FormLabel>
              <FormControl>
                <Input placeholder={t("usernamePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("bio")}</FormLabel>
              <FormControl>
                <textarea
                  placeholder={t("bioPlaceholder")}
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-20 w-full resize-none rounded-md border px-3 py-2 text-sm shadow-sm transition-shadow outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
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
