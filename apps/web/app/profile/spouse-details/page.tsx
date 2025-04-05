"use client";

import { ProfileItem } from "@/modules/profile";
import { VStack } from "@convertium/ui";

export default function SpouseDetailsPage() {
  return (
    <VStack gap={8}>
      <ProfileItem label="Salutation" value="Mrs." required />
      <ProfileItem label="First name" value="Jane" required />
      <ProfileItem label="Last name" value="Doe" required />
    </VStack>
  );
}
