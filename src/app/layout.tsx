import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laravel Forge Documentation Style",
  description: "Next.js project with Laravel Forge documentation style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <div className="flex min-h-screen">
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-laravel-red mb-4">Documentation</h1>
              <nav className="space-y-2">
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-laravel-red rounded-md">
                  Introduction
                </a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-laravel-red rounded-md">
                  Getting Started
                </a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-laravel-red rounded-md">
                  Configuration
                </a>
                <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-laravel-red rounded-md">
                  Deployment
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
