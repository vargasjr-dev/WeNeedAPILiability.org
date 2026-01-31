import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "API Liability - Human Accountability for Autonomous Systems",
  description: "Every automated action should have a human accountable. A policy proposal ensuring that all actions taken by autonomous systems are legally attributable to a specific human individual.",
  keywords: ["AI liability", "autonomous systems", "accountability", "policy", "AI governance", "API liability"],
  authors: [{ name: "David Vargas" }],
  openGraph: {
    title: "API Liability - Human Accountability for Autonomous Systems",
    description: "Every automated action should have a human accountable. A policy proposal for AI accountability.",
    type: "website",
    locale: "en_US",
    siteName: "WeNeedAPILiability.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Liability - Human Accountability for Autonomous Systems",
    description: "Every automated action should have a human accountable. A policy proposal for AI accountability.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
