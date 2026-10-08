import React from "react";
import type { ServiceDetailData } from "@/data/services";
import { ServiceSidebar } from "./ServiceSidebar";
import { ServiceWhyChooseCards } from "./ServiceWhyChooseCards";
import { ServiceBenefitsSection } from "./ServiceBenefitsSection";
import { ServiceDetailFaq } from "./ServiceDetailFaq";

type ServiceDetailViewProps = {
  service: ServiceDetailData;
};

export const ServiceDetailView = ({
  service,
}: ServiceDetailViewProps) => {
  return (
    <div className="page-service-single">
      <div className="container">
        <div className="row">
          {/* Left Column: Sidebar (Explore services + CTA) */}
          <div className="col-lg-4">
            <ServiceSidebar currentSlug={service.slug} />
          </div>

          {/* Right Column: Main Service Details Content */}
          <div className="col-lg-8">
            <div className="service-single-content">
              {/* Featured Hero Image */}
              <div className="page-single-image">
                <figure className="image-anime reveal">
                  <img src={service.heroImage} alt={service.title} />
                </figure>
              </div>

              {/* Service Entry Descriptions */}
              <div className="service-entry">
                {service.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="wow fadeInUp"
                    data-wow-delay={`${0.2 * idx}s`}
                  >
                    {p}
                  </p>
                ))}

                {/* Why Choose This Service */}
                <ServiceWhyChooseCards
                  intro={service.whyChooseIntro}
                  points={service.whyChoosePoints}
                  audienceDesc={service.audienceDesc}
                />

                {/* Benefits by Choosing Us */}
                <ServiceBenefitsSection
                  intro={service.benefitsIntro}
                  benefits={service.benefits}
                  image={service.benefitImage}
                />
              </div>

              {/* Service FAQs */}
              <ServiceDetailFaq faqs={service.faqs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./ServiceSidebar";
export * from "./ServiceWhyChooseCards";
export * from "./ServiceBenefitsSection";
export * from "./ServiceDetailFaq";
