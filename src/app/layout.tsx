import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Preloader, MagicCursor, TemplateEffects } from "@/components/providers";
import { siteConfig } from "@/config/site";
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
  children: React.ReactNode;
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

        {/* Template CSS Stylesheets */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/slicknav.min.css" />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/mousecursor.css" />
        <link rel="stylesheet" href="/css/custom.css" />
      </head>
      <body>
        {/* Preloader animation */}
        <Preloader />

        {/* Interactive Custom Magic Cursor */}
        <MagicCursor />

        {/* Dynamic client effects: WOW, CounterUp, SkillBars, Parallax, SplitText */}
        <TemplateEffects />

        {/* Header Navigation */}
        <Header />

        {/* Main Page Content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
