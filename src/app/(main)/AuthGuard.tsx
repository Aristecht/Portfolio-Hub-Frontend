"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useCurrentUser";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/account/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) return null;

  return <>{children}</>;
}
