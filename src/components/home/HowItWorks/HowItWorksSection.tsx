import React from "react";
import { howItWorksSteps } from "@/data/home";
import { StepItem } from "./StepItem";
import { HowItWorksFooter } from "./HowItWorksFooter";

const delays = ["0s", "0.2s", "0.4s", "0.6s"];

export const HowItWorksSection: React.FC = () => {
  return (
    <div className="how-it-works-gold">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">How it Work</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Discover how our eco-friendly farming system works
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {howItWorksSteps.map((step, i) => (
            <StepItem
              key={step.no}
              step={step}
              boxIndex={i + 1}
              delay={delays[i]}
            />
          ))}

          {/* Child: Footer rating strip */}
          <HowItWorksFooter />
        </div>
      </div>
    </div>
  );
};
