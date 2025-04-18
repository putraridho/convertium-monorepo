import { ProfileEditButton, ProfileSideNav } from "@/modules/profile";
import { TOKEN_KEY } from "@convertium/constants";
import { Container, Header, HStack, Typography, VStack } from "@convertium/ui";
import { cookies } from "next/headers";
import React from "react";

export const metadata = {
  title: "Profile",
  description: "User profile page",
};

export default function Layout({ children }: React.PropsWithChildren) {
  const cookieStore = cookies();

  const token = cookieStore.get(TOKEN_KEY)?.value;

  return (
    <main>
      <VStack className="min-h-screen" gap={0}>
        <Header loggedIn={!!token} />
        <div className="md:grid md:grid-cols-[240px,_1fr] w-full flex-1 p-2">
          <ProfileSideNav />
          <div className="h-full overflow-auto py-8 md:px-4 rounded-xl">
            <Container>
              <VStack gap={8}>
                <HStack gap={8}>
                  <Typography as="h1" size="h3" weight="semibold" className="flex-1">
                    My Profile
                  </Typography>
                  <ProfileEditButton />
                </HStack>
                {children}
              </VStack>
            </Container>
          </div>
        </div>
      </VStack>
    </main>
  );
}
