import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import PostHogProvider from '@/components/providers/PostHogProvider'
import { Suspense } from 'react'
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
  title: "NocoBase — Build Apps Without Code",
  description:
    "The easiest way for small businesses to create beautiful, functional apps — no coding, no stress, no waiting.",
  openGraph: {
    title: "NocoBase — Build Apps Without Code",
    description:
    "The easiest way for small businesses to create beautiful, functional apps — no coding, no stress, no waiting.",
    type: "website",
    siteName: "NocoBase",
  },
  twitter: {
    card: "summary_large_image",
    title: "NocoBase — Build Apps Without Code",
    description:
    "The easiest way for small businesses to create beautiful, functional apps — no coding, no stress, no waiting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        <ClerkProvider>
          <Suspense fallback={null}>
            <PostHogProvider>
              {children}
            </PostHogProvider>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}
