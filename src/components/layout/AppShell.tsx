"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components/layout";

export type AppShellProps = {
  children: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const isDashboardOrAdmin =
    pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  if (isDashboardOrAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
