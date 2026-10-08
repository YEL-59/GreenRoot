import React from "react";
import Link from "next/link";
import { serviceTags } from "@/data/home";

export function ServicesFooter() {
  return (
    <div className="col-lg-12">
      <div className="our-service-footer-gold">
        <div className="our-service-footer-list-gold wow fadeInUp" data-wow-delay="0.8s">
          <ul>
            {serviceTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <div className="section-footer-text section-satisfy-img wow fadeInUp" data-wow-delay="1s">
          <div className="satisfy-client-images">
            <div className="satisfy-client-image">
              <figure className="image-anime">
                <img src="/images/author-1.jpg" alt="" />
              </figure>
            </div>
            <div className="satisfy-client-image add-more">
              <i>
                <img src="/images/icon-phone-primary.svg" alt="" />
              </i>
            </div>
          </div>
          <p>
            Let&apos;s make something great work together.{" "}
            <Link href="/contact">Get Free Quote</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
