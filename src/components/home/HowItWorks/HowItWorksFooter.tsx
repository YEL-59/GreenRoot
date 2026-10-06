import React from "react";
import Link from "next/link";

export const HowItWorksFooter: React.FC = () => {
  return (
    <div className="col-lg-12">
      <div className="section-footer-text wow fadeInUp" data-wow-delay="0.8s">
        <p>
          <span>Free</span>Where Nature Meets Quality -{" "}
          <Link href="/services">Discover Our Organic Farming Services!</Link>
        </p>
        <ul>
          <li>
            <span className="counter">4.9</span>/5
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>Our 4200 Review</li>
        </ul>
      </div>
    </div>
  );
};
