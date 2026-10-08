import React from "react";
import { pricingPlans } from "@/data/home";
import { PricingCard } from "./PricingCard";
import { PricingBenefits } from "./PricingBenefits";

const delays = ["0s", "0.2s", "0.4s"];

export const PricingSection = () => {
  return (
    <div className="our-pricing-gold bg-section dark-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Pricing Plan</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Healthy organic food made budget friendly
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {pricingPlans.map((plan, i) => (
            <PricingCard key={plan.title} plan={plan} delay={delays[i]} />
          ))}

          {/* Child 2: Benefits strip */}
          <PricingBenefits />
        </div>
      </div>
    </div>
  );
};
