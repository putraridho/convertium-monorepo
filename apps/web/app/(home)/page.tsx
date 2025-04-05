import { Container, Header, VStack } from "@convertium/ui";

export default function HomePage() {
  return (
    <VStack className="min-h-screen" gap={0}>
      <Header />
      <Container className="pt-8">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of your Next.js application.</p>
      </Container>
    </VStack>
  );
}
