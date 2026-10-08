import React from "react";
import { servicesData } from "@/data/home";
import { ServiceCard } from "./ServiceCard";
import { ServicesFooter } from "./ServicesFooter";

const delays = ["0s", "0.2s", "0.4s", "0.6s"];

export const ServicesSection = () => {
  return (
    <div className="our-services-gold bg-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Our service</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Delivering natural farm services with trusted quality
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {/* 4 Service Cards */}
          {servicesData.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              delay={delays[idx % delays.length]}
            />
          ))}

          {/* Child 2: Services Footer strip */}
          <ServicesFooter />
        </div>
      </div>
    </div>
  );
};
