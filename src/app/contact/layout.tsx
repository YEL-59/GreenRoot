import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `যোগাযোগ ও ফার্ম ভিজিট | ${siteConfig.title}`,
  description:
    "গ্রীনরুট অর্গানিক ফার্মের সাথে যোগাযোগ করুন। আমাদের খামার পরিদর্শন, সরাসরি অর্ডার ও কৃষি বিষয়ক পরামর্শ।",
};

type ContactLayoutProps = {
  children: ReactNode;
};

const ContactLayout = ({ children }: ContactLayoutProps) => {
  return <>{children}</>;
};

export default ContactLayout;
