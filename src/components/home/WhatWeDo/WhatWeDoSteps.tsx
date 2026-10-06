import React from "react";
import Link from "next/link";
import { whatWeDoData } from "@/data/home";

export const WhatWeDoSteps: React.FC = () => {
  return (
    <div className="col-xl-6">
      <div className="what-we-do-content-gold">
        <div className="section-title">
          <h3 className="wow fadeInUp">{whatWeDoData.subtitle}</h3>
          <h2 className="text-anime-style-3" data-cursor="-opaque">
            {whatWeDoData.title}
          </h2>
          <p className="wow fadeInUp" data-wow-delay="0.2s">
            {whatWeDoData.description}
          </p>
        </div>

        <div className="what-we-step-list-gold wow fadeInUp" data-wow-delay="0.4s">
          {whatWeDoData.steps.map((step) => (
            <div className="what-we-item-gold" key={step.title}>
              <div className="icon-box">
                <img src={step.icon} alt="" />
              </div>
              <div className="what-we-item-content-gold">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="what-we-btn-gold wow fadeInUp" data-wow-delay="0.6s">
          <Link href={whatWeDoData.button.href} className="btn-default">
            {whatWeDoData.button.label}
          </Link>
        </div>
      </div>
    </div>
  );
};
