import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import NextTopLoader from "nextjs-toploader";
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
  title: "Next.js & React Patterns – Educational Examples",
  description:
    "Hands-on, intentionally simple examples covering Server Components, Suspense, useOptimistic, useTransition, URL state, and more.",
};

// 🏛️ Architecture: Server Components by Default
// ✅ لماذا نستخدم Server Components كافتراضي؟
// ### Why use Server Components by default?
//
// Server Components:
// - Reduce JavaScript sent to the browser.
// - Improve performance.
// - Improve SEO automatically.
//
// We only use Client Components when:
// - We need interactivity (state, effects, event handlers).
// - The UI depends on browser-only APIs.
//
// Defaulting to Server keeps the app fast and lean.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextTopLoader color="#3b82f6" height={3} showSpinner={false} />
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}
