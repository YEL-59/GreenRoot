import React from "react";
import Link from "next/link";
import { faqData } from "@/data/home";
import { siteConfig } from "@/config/site";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  return (
    <div className="our-faqs-gold">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="faqs-content-gold">
              <div className="section-title">
                <h3 className="wow fadeInUp">{faqData.subtitle}</h3>
                <h2 className="text-anime-style-3" data-cursor="-opaque">
                  {faqData.title}
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  {faqData.description}
                </p>
              </div>

              <div className="faqs-image-gold">
                <figure className="image-anime reveal">
                  <img src={faqData.image} alt="" />
                </figure>
              </div>

              <div className="faqs-footer-gold wow fadeInUp" data-wow-delay="0.4s">
                <div className="faqs-btn-gold">
                  <Link href="/contact" className="btn-default">
                    Get in Touch
                  </Link>
                </div>
                <div className="faqs-contact-item-gold">
                  <div className="icon-box">
                    <img src="/images/icon-phone-primary.svg" alt="" />
                  </div>
                  <div className="faqs-contact-item-content-gold">
                    <h3>Phone Number</h3>
                    <p>
                      <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            {/* Child: FAQ Accordion */}
            <FaqAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};
