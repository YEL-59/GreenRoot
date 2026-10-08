import React from "react";
import Link from "next/link";

export function WhyChooseVisuals() {
  return (
    <div className="why-choose-image-box">
      <div className="why-choose-image-box-1">
        <div className="why-choose-image">
          <figure>
            <img src="/images/why-choose-image-1.png" alt="Organic Harvest" />
          </figure>
        </div>
      </div>

      <div className="why-choose-image-box-2">
        <div className="why-choose-info-box">
          <div className="icon-box">
            <img src="/images/icon-why-choose-us-info-box.svg" alt="" />
          </div>
          <div className="why-choose-info-content">
            <h3>Transparent & Traceable Produce</h3>
          </div>
        </div>

        <div className="why-choose-image">
          <figure className="image-anime">
            <img src="/images/why-choose-image-2.jpg" alt="Organic Farmland" />
          </figure>
        </div>

        <div className="contact-us-circle">
          <Link href="/contact">
            <img src="/images/contact-us-circle.svg" alt="Contact Us" />
          </Link>
        </div>
      </div>
    </div>
  );
};
