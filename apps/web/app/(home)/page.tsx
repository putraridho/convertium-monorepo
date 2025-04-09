import { TOKEN_KEY } from "@convertium/constants";
import { Container, Header, VStack } from "@convertium/ui";
import { cookies } from "next/headers";

export default function HomePage() {
  const cookieStore = cookies();

  const token = cookieStore.get(TOKEN_KEY)?.value;

  return (
    <VStack className="min-h-screen" gap={0}>
      <Header loggedIn={!!token} />
      <Container className="pt-8">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of your Next.js application.</p>
      </Container>
    </VStack>
  );
}
