import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `শপিং কার্ট | ${siteConfig.title}`,
  description:
    "আপনার গ্রীনরুট শপিং কার্ট। নিরাপদ চেকআউট, কুপন ডিসকাউন্ট ও দ্রুত হোম ডেলিভারি।",
};

type CartLayoutProps = {
  children: ReactNode;
};

const CartLayout = ({ children }: CartLayoutProps) => {
  return <>{children}</>;
};

export default CartLayout;
