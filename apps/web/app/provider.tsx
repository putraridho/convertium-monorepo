"use client";

import { CONFIG } from "@convertium/constants";
import { API } from "@convertium/services";
import { Toaster } from "@convertium/ui";
import { HeroUIProvider } from "@heroui/system";
import { useEffect } from "react";

API.initialize();

export default function Providers({ children }: React.PropsWithChildren) {
  useEffect(() => {
    if (!CONFIG.API_BASE_URL) throw new Error("API_BASE_URL is not defined");
    if (process.env.APP_ENV === "production" && process.env.NODE_ENV !== "production") return;
  }, []);

  return (
    <HeroUIProvider>
      {children}
      <Toaster />
    </HeroUIProvider>
  );
}
