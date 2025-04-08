import { TOKEN_KEY } from "@convertium/constants";
import { API } from "@convertium/services";
import { User } from "@convertium/types";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../globals.css";
import Providers from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

API.initialize();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;

  let user: User | null = null;

  if (!!token) {
    try {
      user = await API.getOrCreateInstance()
        .user()
        .me({
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
}
