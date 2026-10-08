import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AppShell } from "@/components/layout";
import { Preloader, MagicCursor, TemplateEffects } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart";
import { FarmGuideAssistant } from "@/components/guide";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.title}`,
  description: siteConfig.description,
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zxx">
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
      </body>
    </html>
  );
}
