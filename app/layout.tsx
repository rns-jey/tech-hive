import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageHeader from "@/components/organisms/page-header";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Hive",
  description:
    "A vibrant developer community where tech enthusiasts connect, share ideas, and explore coding tutorials, articles, and projects in a collaborative environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>{children} </ClerkProvider>
      </body>
    </html>
  );
}
