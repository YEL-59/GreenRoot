import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `নিরাপদ চেকআউট | ${siteConfig.title}`,
  description:
    "গ্রীনরুট অর্গানিক ফার্ম - সহজ ও নিরাপদ পেমেন্ট, ক্যাশ অন ডেলিভারি এবং দ্রুত হোম ডেলিভারি।",
};

type CheckoutLayoutProps = {
  children: ReactNode;
};

const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
  return <>{children}</>;
};

export default CheckoutLayout;
