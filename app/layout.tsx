import type { Metadata } from "next";
import { Syne, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Altitude UK — Nationwide Drone Operations & Pilot Network",
    template: "%s | Altitude UK",
  },
  description:
    "The UK's leading drone operations management platform. Connecting vetted CAA-licensed pilots with commercial and creative clients nationwide. Aerial photography, LiDAR, and thermal inspection.",
  keywords: ["drone hire UK", "drone pilot network", "aerial photography", "drone inspection", "CAA licensed pilots", "UK drone operations"],
  authors: [{ name: "Altitude UK" }],
  creator: "Altitude UK",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://altitude-hire.com",
    siteName: "Altitude UK",
    title: "Altitude UK — Nationwide Drone Operations",
    description: "Professional drone data, delivered anywhere in the UK within 48 hours.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Altitude UK Drone Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altitude UK — Nationwide Drone Operations",
    description: "Professional drone data, delivered anywhere in the UK within 48 hours.",
    creator: "@altitudeuk",
    images: ["/og-image.jpg"],
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
      className={`${syne.variable} ${dmMono.variable} ${inter.variable} h-full`}
    >
      <body className="h-full" style={{ fontFamily: "var(--font-inter)" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
