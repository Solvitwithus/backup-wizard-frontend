import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Backup Wizard",
  description: "Backup Access Point",
  manifest: "/manifest.json",
  icons: {
    icon: ["/icons/icon-192x192.png", "/icons/icon-512x512.png"],
    apple: "/icons/icon-192x192.png",
  },
  themeColor: "#059669",
  appleWebApp: {
    title: "Backup Wizard",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ── Viewport — CRITICAL: prevents mobile font boosting ── */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#059669" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Backup Wizard" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}
        style={{ background: "#f8fafc" }}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
