import React from "react";
import Link from "next/link";
import type { ServiceItem } from "@/data/services";

interface ServiceGridCardProps {
  service: ServiceItem;
  delay?: string;
}

export function ServiceGridCard({
  service,
  delay = "0s",
}: ServiceGridCardProps) {
  return (
    <div className="col-xl-3 col-md-6">
      <div
        className={`service-item ${service.active ? "active" : ""} wow fadeInUp`}
        data-wow-delay={delay}
      >
        <div className="icon-box">
          <img src={service.icon} alt={service.title} />
        </div>
        <div className="services-item-body">
          <div className="services-item-content">
            <h2>
              <Link href={`/services/${service.slug}`}>{service.title}</Link>
            </h2>
            <p>{service.description}</p>
          </div>
          <div className="services-item-btn">
            <Link
              href={`/services/${service.slug}`}
              className="readmore-btn"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
