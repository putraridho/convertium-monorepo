"use client";

import { ProfileItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { VStack } from "@convertium/ui";

export default function SpouseDetailsPage() {
  const me = useUser();

  return (
    <VStack gap={8}>
      <ProfileItem label="Salutation" value={me?.spouse_salutation || "-"} required />
      <ProfileItem label="First name" value={me?.spouse_first_name || "-"} required />
      <ProfileItem label="Last name" value={me?.spouse_last_name || "-"} required />
    </VStack>
  );
}
