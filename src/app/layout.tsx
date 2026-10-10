import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout";
import { Preloader, MagicCursor, TemplateEffects } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart";
import { FarmGuideAssistant } from "@/components/guide";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://greenroot.farm"),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "GreenRoot",
    "Organic Farm Bangladesh",
    "Pure Raw Cow Milk",
    "Bilona Cow Ghee",
    "Sundarban Wild Honey",
    "Cold Pressed Mustard Oil",
    "খাঁটি গরুর দুধ",
    "গাওয়া ঘি",
    "সুন্দরবনের মধু",
    "অর্গানিক খামার পণ্য",
  ],
  authors: [{ name: "GreenRoot Agro & Dairy" }],
  creator: "GreenRoot Team",
  publisher: "GreenRoot",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "https://greenroot.farm",
    siteName: siteConfig.name,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/images/hero-image-1.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/hero-image-1.jpg"],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
          {/* Preloader animation */}
          <Preloader />

          {/* Interactive Custom Magic Cursor */}
          <MagicCursor />

          {/* Dynamic client effects: WOW, CounterUp, SkillBars, Parallax, SplitText */}
          <TemplateEffects />

          {/* Conditionally renders marketing Header & Footer for storefront, isolates Dashboard & Admin */}
          <AppShell>{children}</AppShell>

          {/* Global Slide-out Shopping Cart Drawer */}
          <CartDrawer />

          {/* Interactive Animated Mascot Guide & Help Assistant */}
          <FarmGuideAssistant />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
