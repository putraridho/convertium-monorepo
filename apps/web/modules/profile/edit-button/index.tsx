"use client";

import { Button } from "@convertium/ui";
import { CaretLeft, PencilSimpleLine } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function ProfileEditButton() {
  const pathname = usePathname();

  const path = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);

  const isEditPage = useMemo(() => path[0] === "edit-profile", [path]);

  return (
    <Link href={`/${isEditPage ? "profile" : "edit-profile"}/${path[1]}`}>
      <Button
        prefix={isEditPage ? <CaretLeft size={16} weight="bold" /> : <PencilSimpleLine size={16} weight="bold" />}
      >
        <span className="hidden md:block">{isEditPage ? "Go back to My Profile" : "Edit Profile"}</span>
        <span className="block md:hidden">{isEditPage ? "My Profile" : "Edit Profile"}</span>
      </Button>
    </Link>
  );
}
