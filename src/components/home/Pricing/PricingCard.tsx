import React from "react";
import Link from "next/link";
import type { PricingPlan } from "@/types";

export interface PricingCardProps {
  plan: PricingPlan;
  delay?: string;
}

export function PricingCard({ plan, delay }: PricingCardProps) {
  return (
    <div className="col-xl-4 col-md-6">
      <div className="pricing-item-gold wow fadeInUp" data-wow-delay={delay}>
        <div className="pricing-item-header-box-gold">
          <div className="pricing-item-header-gold">
            <div className="icon-box">
              <img src={plan.icon} alt="" />
            </div>
            <div className="pricing-item-title-gold">
              <h3>{plan.title}</h3>
            </div>
          </div>

          <div className="pricing-item-content-gold">
            <p>{plan.description}</p>
          </div>

          <div className="pricing-item-price-gold">
            <h2>
              {plan.price} <sub>{plan.period}</sub>
            </h2>
          </div>
        </div>

        <div className="pricing-item-body-gold">
          <div className="pricing-item-btn-gold">
            <Link href={plan.href} className="btn-default btn-highlighted">
              Get Started With Plan
            </Link>
          </div>

          <div className="pricing-item-list-gold">
            <h3>What&apos;s included:</h3>
            <ul>
              {plan.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
