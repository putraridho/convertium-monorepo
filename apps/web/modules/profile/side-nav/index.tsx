"use client";

import { useUser } from "@/providers";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavItem } from "./nav-item";

export function ProfileSideNav() {
  const me = useUser();
  const pathname = usePathname();

  const path = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  const isEditPage = useMemo(() => path[0] === "edit-profile", [path]);

  const navItems = useMemo(
    () => [
      { href: `/${isEditPage ? "edit-profile" : "profile"}/basic-details`, label: "Basic Details" },
      { href: `/${isEditPage ? "edit-profile" : "profile"}/additional-details`, label: "Additional Details" },
      {
        href: `/${isEditPage ? "edit-profile" : "profile"}/spouse-details`,
        label: "Spouse Details",
        disabled: me?.martial_status?.toLowerCase() !== "married",
      },
      { href: `/${isEditPage ? "edit-profile" : "profile"}/personal-preferences`, label: "Personal Preferences" },
    ],
    [isEditPage, me?.martial_status],
  );

  return (
    <ul className="flex flex-col gap-2 p-2 md:p-4 bg-default-100 rounded-2xl">
      {navItems
        .filter((item) => !item.disabled)
        .map((item) => (
          <NavItem key={item.href} href={item.href} active={pathname === item.href}>
            {item.label}
          </NavItem>
        ))}
    </ul>
  );
}
