import React from "react";
import type { ServiceDetailData } from "@/data/services";

type ServiceBenefitsSectionProps = {
  intro: string;
  benefits: ServiceDetailData["benefits"];
  image: string;
};

export const ServiceBenefitsSection = ({
  intro,
  benefits,
  image,
}: ServiceBenefitsSectionProps) => {
  return (
    <div className="service-benefit-box">
      <h2 className="text-anime-style-3">Benefits by choosing us</h2>
      <p className="wow fadeInUp">{intro}</p>

      <div className="service-benefit-item-image">
        {/* Benefits List */}
        <div
          className="service-benefit-item-list wow fadeInUp"
          data-wow-delay="0.2s"
        >
          {benefits.map((b) => (
            <div key={b.title} className="service-benefit-item-box">
              <div className="service-single-item">
                <div className="icon-box">
                  <img src={b.icon} alt="" />
                </div>
                <div className="service-single-item-content">
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </div>
              </div>
              <div className="service-benefit-item-body">
                <ul>
                  <li>{b.bullet}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Side Image */}
        <div
          className="service-benefit-image wow fadeInUp"
          data-wow-delay="0.4s"
        >
          <figure className="image-anime reveal">
            <img src={image} alt="Service Benefits" />
          </figure>
        </div>
      </div>
    </div>
  );
};
