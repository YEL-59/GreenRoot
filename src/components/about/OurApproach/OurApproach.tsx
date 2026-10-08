import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { ApproachCard } from "./ApproachCard";
import { CompanyLogos } from "./CompanyLogos";

export const OurApproach = () => {
  const { approach } = aboutData;

  return (
    <div className="our-approach bg-section">
      <div className="container">
        {/* Header Row */}
        <div className="row section-row align-items-center">
          <div className="col-xl-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">{approach.subtitle}</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                {approach.title}
              </h2>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="section-content-btn">
              <div
                className="section-title-content wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <p>{approach.description}</p>
              </div>
              <div className="section-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link href="/contact" className="btn-default">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Row */}
        <div className="row">
          {approach.items.map((item, index) => (
            <div key={item.title} className="col-xl-6">
              <ApproachCard
                item={item}
                delay={index === 0 ? "0.6s" : "0.8s"}
              />
            </div>
          ))}

          {/* Trusted Companies Slider/Grid */}
          <div className="col-lg-12">
            <CompanyLogos logos={approach.companyLogos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./ApproachCard";
export * from "./CompanyLogos";
