import React from "react";
import { servicesList } from "@/data/services";
import { ServiceGridCard } from "./ServiceGridCard";

export const ServicesGrid = () => {
  return (
    <div className="page-services">
      <div className="container">
        <div className="row service-item-list">
          {servicesList.map((service, index) => (
            <ServiceGridCard
              key={service.id}
              service={service}
              delay={`${0.2 * (index % 4)}s`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export * from "./ServiceGridCard";
