"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { NavItem } from "./nav-item";

const NAV_ITEMS = [
  { href: "/profile/basic-details", label: "Basic Details" },
  { href: "/profile/additional-details", label: "Additional Details" },
  { href: "/profile/spouse-details", label: "Spouse Details" },
  { href: "/profile/personal-preferences", label: "Personal Preferences" },
];

const NAV_EDIT_ITEMS = [
  { href: "/edit-profile/basic-details", label: "Basic Details" },
  { href: "/edit-profile/additional-details", label: "Additional Details" },
  { href: "/edit-profile/spouse-details", label: "Spouse Details" },
  { href: "/edit-profile/personal-preferences", label: "Personal Preferences" },
];

export function ProfileSideNav() {
  const pathname = usePathname();

  const path = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  const isEditPage = useMemo(() => path[0] === "edit-profile", [path]);

  return (
    <ul className="flex flex-col gap-2 p-4 bg-default-100 rounded-2xl">
      {(isEditPage ? NAV_EDIT_ITEMS : NAV_ITEMS).map((item) => (
        <NavItem key={item.href} href={item.href} active={pathname === item.href}>
          {item.label}
        </NavItem>
      ))}
    </ul>
  );
}
