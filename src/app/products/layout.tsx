import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `ফার্ম শপ - তাজা ও খাঁটি অর্গানিক পণ্য | ${siteConfig.title}`,
  description:
    "গ্রীনরুট ফার্ম শপ থেকে কিনুন ১০০% খাঁটি গরুর দুধ, গাওয়া ঘি, সুন্দরবনের মধু, সরিষার তেল ও টাটকা মৌসুমি শাকসবজি। দ্রুত হোম ডেলিভারি।",
};

type ProductsLayoutProps = {
  children: ReactNode;
};

const ProductsLayout = ({ children }: ProductsLayoutProps) => {
  return <>{children}</>;
};

export default ProductsLayout;
