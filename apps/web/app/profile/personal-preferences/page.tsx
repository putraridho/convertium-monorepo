"use client";

import { ProfileItem } from "@/modules/profile";
import { useUser } from "@/providers";
import { VStack } from "@convertium/ui";

export default function PersonalPreferencesPage() {
  const me = useUser();

  return (
    <VStack gap={8}>
      <ProfileItem label="Hobbies and interest" value={me?.hobbies?.join(", ") || "-"} />
      <ProfileItem label="Favorite sport(s)" value={me?.sports?.join(", ") || "-"} />
      <ProfileItem label="Preferred music genre(s)" value={me?.music_genres?.join(", ") || "-"} />
      <ProfileItem label="Preferred movie/TV show(s)" value={me?.movies?.join(", ") || "-"} />
    </VStack>
  );
}
