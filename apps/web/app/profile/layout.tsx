import { ProfileEditButton, ProfileSideNav } from "@/modules/profile";
import { Container, Grid, Header, HStack, Typography, VStack } from "@convertium/ui";
import React from "react";

export const metadata = {
  title: "Profile",
  description: "User profile page",
};

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <VStack className="min-h-screen" gap={0}>
        <Header />
        <Grid className="grid-cols-[240px,_1fr] w-full flex-1 p-2">
          <ProfileSideNav />
          <div className="h-full overflow-auto py-8 px-4 rounded-xl">
            <Container>
              <VStack gap={8}>
                <HStack gap={8}>
                  <Typography as="h1" size="h2" weight="semibold" className="flex-1">
                    My Profile
                  </Typography>
                  <ProfileEditButton />
                </HStack>
                {children}
              </VStack>
            </Container>
          </div>
        </Grid>
      </VStack>
    </main>
  );
}
