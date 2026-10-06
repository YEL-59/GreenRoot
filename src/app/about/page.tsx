import type { Metadata } from "next";
import {
  PageHeader,
  AboutOverview,
  OurApproach,
  OurAdvantage,
  AboutHowItWorks,
  AboutTeam,
  AboutTestimonials,
  AboutFaq,
} from "@/components/about";
import { aboutData } from "@/data/about";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.title}`,
  description:
    "Learn about GreenRoot's commitment to clean, conscious organic farming, healthy soils, and sustainable agriculture.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header & Breadcrumb */}
      <PageHeader
        title={aboutData.header.title}
        breadcrumb={aboutData.header.breadcrumb}
      />

      {/* About Overview (Farm Mission & Images) */}
      <AboutOverview />

      {/* Our Approach (Mission & Vision Cards & Partner Logos) */}
      <OurApproach />

      {/* Our Advantage (Quality, Video, Experience Counter) */}
      <OurAdvantage />

      {/* How It Works (4-Step Organic Process) */}
      <AboutHowItWorks />

      {/* Meet Our Farmers (Team) */}
      <AboutTeam />

      {/* Testimonials */}
      <AboutTestimonials />

      {/* Frequently Asked Questions */}
      <AboutFaq />
    </>
  );
}
