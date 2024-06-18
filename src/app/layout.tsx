import type { Metadata } from "next";
import "./globals.css";
import { AppWrapper } from "@/context";
import Providers from "@/components/Providers";
import App from "./App";

export const metadata: Metadata = {
  title: "Animox",
  description: "Explore Th Diverse Realms of Anime Magic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppWrapper>
            <App children={children} />
          </AppWrapper>
        </Providers>
      </body>
    </html>
  );
}
