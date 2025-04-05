"use client";

import { ProfileItem } from "@/modules/profile";
import { VStack } from "@convertium/ui";

export default function PersonalPreferencesPage() {
  return (
    <VStack gap={8}>
      <ProfileItem label="Hobbies and interest" value="Hobby 1" />
      <ProfileItem label="Favorite sport(s)" value="Sport 1" />
      <ProfileItem label="Preferred music genre(s)" value="Genre 1" />
      <ProfileItem label="Preferred movie/TV show(s)" value="Movie 1" />
    </VStack>
  );
}
