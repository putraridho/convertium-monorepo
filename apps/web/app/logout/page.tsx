"use client";

import { useAuthGuard } from "@/providers";
import { HStack, Loading, Typography } from "@convertium/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    (async function signout() {
      try {
        await logout();
      } catch (_) {
      } finally {
        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
    })();
  }, [logout, router]);

  return (
    <HStack gap={2} className="flex min-h-screen items-center justify-center">
      <Loading size="lg" className="text-default-400" />
      <Typography size="lg" weight="medium" className="text-default-400">
        Signing out...
      </Typography>
    </HStack>
  );
}
