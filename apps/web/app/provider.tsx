"use client";

import { HeroUIProvider } from "@heroui/system";

export default function Providers({ children }: React.PropsWithChildren) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
