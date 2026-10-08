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
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProductsSection />
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
