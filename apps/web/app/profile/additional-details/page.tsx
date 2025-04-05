"use client";

import { ProfileItem } from "@/modules/profile";
import { VStack } from "@convertium/ui";

export default function AdditionalDetailsPage() {
  return (
    <VStack gap={8}>
      <ProfileItem label="Home address" value="Baker Street" required />
      <ProfileItem label="Country" value="United States" required />
      <ProfileItem label="Date of birth" value="16 June 1992" />
      <ProfileItem label="Gender" value="Male" />
      <ProfileItem label="Martial status" value="Married" />
    </VStack>
  );
}
