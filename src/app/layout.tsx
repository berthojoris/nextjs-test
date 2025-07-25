import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextForge - Modern Next.js Template",
  description: "A modern Next.js template with beautiful UI components, type safety, and developer experience in mind",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 pl-72 pt-16 px-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
