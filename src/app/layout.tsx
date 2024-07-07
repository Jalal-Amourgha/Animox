import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/context";
import App from "./App";
import { AuthProvider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Animox",
  description: "Anime website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <App>{children}</App>
        </AuthProvider>
      </body>
    </html>
  );
}
