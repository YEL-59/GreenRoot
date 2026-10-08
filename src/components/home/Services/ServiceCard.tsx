import Link from "next/link";
import type { ServiceItem } from "@/types";

export type ServiceCardProps = {
  service: ServiceItem;
  delay?: string;
};

export const ServiceCard = ({ service, delay }: ServiceCardProps) => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="service-item-gold wow fadeInUp" data-wow-delay={delay}>
        <div className="service-item-image-gold">
          <Link href={service.href} data-cursor-text="View">
            <figure>
              <img src={service.image} alt={service.title} />
            </figure>
          </Link>
        </div>

        <div className="service-item-body-gold">
          <div className="icon-box">
            <img src={service.icon} alt="" />
          </div>
          <div className="service-item-content-gold">
            <h3>
              <Link href={service.href}>{service.title}</Link>
            </h3>
            <p>{service.description}</p>
          </div>
          <div className="service-item-btn-gold">
            <Link href={service.href} className="readmore-btn">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
