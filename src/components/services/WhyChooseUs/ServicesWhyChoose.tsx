import React from "react";
import { WhyChooseTabs } from "./WhyChooseTabs";
import { WhyChooseVisuals } from "./WhyChooseVisuals";

export const ServicesWhyChoose = () => {
  return (
    <div className="why-choose-us">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Column: Heading & Tabs */}
          <div className="col-xl-6">
            <div className="why-choose-content">
              <div className="section-title">
                <h3 className="wow fadeInUp">Why Choose Us</h3>
                <h2 className="text-anime-style-3" data-cursor="-opaque">
                  Committed to honest and clean sustainable farming
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  We believe in delivering food that&apos;s grown with care,
                  transparency, and respect for the environment. Every step we take
                  is focused on bringing you fresh, honest nourishment.
                </p>
              </div>

              <WhyChooseTabs />
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="col-xl-6">
            <WhyChooseVisuals />
          </div>

          {/* Bottom Footer: Satisfy Clients */}
          <div className="col-lg-12">
            <div
              className="section-footer-text section-satisfy-img wow fadeInUp"
              data-wow-delay="0.6s"
            >
              <div className="satisfy-client-images">
                <div className="satisfy-client-image">
                  <figure className="image-anime">
                    <img src="/images/author-1.jpg" alt="Client 1" />
                  </figure>
                </div>
                <div className="satisfy-client-image add-more">
                  <img src="/images/icon-phone-primary.svg" alt="Phone" />
                </div>
              </div>
              <p>
                Trust a farm where innovation, nature, and integrity come together to
                serve you better every day.
              </p>
              <ul>
                <li>
                  <span className="counter">4.9</span>/5
                </li>
                <li>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                </li>
                <li>Our 4,200 Reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./WhyChooseTabs";
export * from "./WhyChooseVisuals";
