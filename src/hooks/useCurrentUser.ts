"use client";

import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { authStore } from "@/store/auth/auth.store";
import type { UserProfile } from "@/store/auth/auth.types";

const FIND_AUTH_PROFILE = gql`
  query FindAuthProfile {
    findProfile {
      id
      username
      email
      displayName
      avatar
      role
    }
  }
`;

type FindAuthProfileQuery = {
  findProfile: UserProfile | null;
};

export function useAuth() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const setIsAuthenticated = authStore((state) => state.setIsAuthenticated);
  const user = authStore((state) => state.user);
  const setUser = authStore((state) => state.setUser);

  const { data, loading, error } = useQuery<FindAuthProfileQuery>(
    FIND_AUTH_PROFILE,
    {
      ssr: false,
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    if (data?.findProfile) {
      setUser(data.findProfile);
      if (!isAuthenticated) setIsAuthenticated(true);
    } else if (!loading && !data?.findProfile) {
      setUser(null);
      if (isAuthenticated) setIsAuthenticated(false);
    }
  }, [data, loading, setUser, setIsAuthenticated, isAuthenticated]);

  const auth = () => setIsAuthenticated(true);
  const exit = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    user,
    profile: data?.findProfile ?? null,
    isAuthenticated,
    loading,
    error: error?.message ?? null,
    auth,
    exit,
  };
}
