"use client";

import { ProfileItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { Avatar, VStack } from "@convertium/ui";

export default function BasicDetailsPage() {
  const me = useUser();

  return (
    <VStack gap={8}>
      <Avatar
        src={me?.profile_photo_url}
        name={[me?.first_name, me?.last_name].filter(Boolean).join(" ") || undefined}
        size={128}
        className="text-2xl"
      />
      <ProfileItem label="Salutation" value={me?.salutation || "-"} required />
      <ProfileItem label="First name" value={me?.first_name || "-"} required />
      <ProfileItem label="Last name" value={me?.last_name || "-"} required />
      <ProfileItem label="Email address" value={me?.email || "-"} required />
    </VStack>
  );
}
