import React from "react";
import type { ServiceDetailData } from "@/data/services";

type ServiceWhyChooseCardsProps = {
  intro: string;
  points: ServiceDetailData["whyChoosePoints"];
  audienceDesc: string;
};

export const ServiceWhyChooseCards = ({
  intro,
  points,
  audienceDesc,
}: ServiceWhyChooseCardsProps) => {
  return (
    <div className="service-why-choose-box">
      <h2 className="text-anime-style-3">Why choose this service</h2>
      <p className="wow fadeInUp">{intro}</p>

      {/* 4 Cards Grid */}
      <div
        className="service-why-choose-item-list wow fadeInUp"
        data-wow-delay="0.4s"
      >
        {points.map((pt) => (
          <div key={pt.title} className="service-single-item">
            <div className="icon-box">
              <img src={pt.icon} alt={pt.title} />
            </div>
            <div className="service-single-item-content">
              <h3>{pt.title}</h3>
              <p>{pt.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="wow fadeInUp" data-wow-delay="0.8s">
        {audienceDesc}
      </p>
    </div>
  );
};
