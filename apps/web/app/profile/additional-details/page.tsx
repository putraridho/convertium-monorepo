"use client";

import { ProfileItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { VStack } from "@convertium/ui";
import { tz } from "@convertium/utils";

export default function AdditionalDetailsPage() {
  const me = useUser();

  return (
    <VStack gap={8}>
      <ProfileItem label="Home address" value={me?.address || "-"} required />
      <ProfileItem label="Country" value={me?.country || "-"} required />
      <ProfileItem label="Date of birth" value={me?.date_of_birth ? tz(me.date_of_birth).format("DD MMM YYYY") : "-"} />
      <ProfileItem label="Gender" value={me?.gender || "-"} />
      <ProfileItem label="Martial status" value={me?.martial_status || "-"} />
    </VStack>
  );
}
