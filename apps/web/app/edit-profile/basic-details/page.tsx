"use client";

import { ProfileItem } from "@/modules/profile";
import { Avatar, VStack } from "@convertium/ui";

export default function BasicDetailsPage() {
  return (
    <VStack gap={8}>
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        name="John Doe Jr."
        size={128}
        className="text-2xl"
      />
      <ProfileItem label="Salutation" value="Mr." required />
      <ProfileItem label="First name" value="John" required />
      <ProfileItem label="Last name" value="Doe Jr." required />
      <ProfileItem label="Email address" value="johndoe@anyemail.com" required />
    </VStack>
  );
}
