import type { Metadata } from "next";
import { PageHeader, AboutHowItWorks, AboutTestimonials, AboutFaq } from "@/components/about";
import { ServicesGrid, ServicesWhyChoose } from "@/components/services";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Our Services | ${siteConfig.title}`,
  description:
    "Explore GreenRoot's sustainable agriculture services, organic soil care, farm-to-table delivery, and certified crop production.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page Header Banner */}
      <PageHeader
        title={servicesData.header.title}
        breadcrumb={servicesData.header.breadcrumb}
      />

      {/* 8 Core Services Grid */}
      <ServicesGrid />

      {/* How It Works (4-Step Process) */}
      <AboutHowItWorks />

      {/* Why Choose Us (Interactive Tabs & Visuals) */}
      <ServicesWhyChoose />

      {/* Customer Testimonials */}
      <AboutTestimonials />

      {/* FAQs */}
      <AboutFaq />
    </>
  );
}
