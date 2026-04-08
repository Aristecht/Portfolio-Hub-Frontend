import { Button } from "@/components/common/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/Card";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface AuthWrapperProps {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function AuthWrapper({
  children,
  heading,
  backButtonHref,
  backButtonLabel,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-124">
        <CardHeader className="flex flex-row items-center justify-center">
          <Image
            src="/images/logotype.png"
            alt="Portfolio-Hub"
            width={75}
            height={75}
          />
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter>
          {backButtonHref && backButtonLabel && (
            <Button size={"sm"} variant={"link"} className="mx-auto p-2">
              <Link href={backButtonHref}>{backButtonLabel}</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
