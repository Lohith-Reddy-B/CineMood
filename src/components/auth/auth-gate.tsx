"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/policy/about",
  "/policy/contact",
  "/policy/privacy",
  "/policy/terms",
  "/policy/disclaimer",
  "/policy/cookies",
  "/policy/community",
]);

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const allowedPublic = Array.from(PUBLIC_PATHS).some((path) => pathname === path || pathname.startsWith(`${path}/`));

    if (!user && !allowedPublic) {
      router.replace("/login");
      return;
    }

    if (user && !user.emailVerified && !pathname.startsWith("/verify-email")) {
      router.replace(`/verify-email/pending`);
      return;
    }

    if (user && pathname === "/") {
      router.replace("/browse");
    }
  }, [loading, pathname, router, user]);

  return <>{children}</>;
}
