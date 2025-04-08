"use client";

import { AuthGuard } from "@/providers";
import { CONFIG } from "@convertium/constants";
import { Queries } from "@convertium/queries";
import { API } from "@convertium/services";
import { User } from "@convertium/types";
import { Toaster } from "@convertium/ui";
import { HeroUIProvider } from "@heroui/system";
import { useEffect } from "react";

API.initialize();

export default function Providers({
  children,
  user,
}: React.PropsWithChildren<{
  user: User | null;
}>) {
  useEffect(() => {
    if (!CONFIG.API_BASE_URL) throw new Error("API_BASE_URL is not defined");
    if (process.env.APP_ENV === "production" && process.env.NODE_ENV !== "production") return;
  }, []);

  return (
    <Queries.Provider>
      <AuthGuard.Provider user={user}>
        <HeroUIProvider>
          {children}
          <Toaster />
        </HeroUIProvider>
      </AuthGuard.Provider>
    </Queries.Provider>
  );
}
