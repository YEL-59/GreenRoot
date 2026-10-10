import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyChooseUsSection,
  OurStorySection,
  WhatWeDoSection,
  PricingSection,
  HowItWorksSection,
  TeamSection,
  FaqSection,
  TestimonialsSection,
  BlogSection,
  FeaturedProductsSection,
  BangladeshMarketTrustSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProductsSection />
      <BangladeshMarketTrustSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <OurStorySection />
      <WhatWeDoSection />
      <PricingSection />
      <HowItWorksSection />
      <TeamSection />
      <FaqSection />
      <TestimonialsSection />
      <BlogSection />
    </>
  );
}
