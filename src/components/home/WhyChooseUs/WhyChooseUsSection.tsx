import React from "react";
import { WhyChooseImages } from "./WhyChooseImages";
import { WhyChooseFeatures } from "./WhyChooseFeatures";

export function WhyChooseUsSection() {
  return (
    <div className="why-choose-us-gold">
      <div className="container">
        <div className="row">
          {/* Child 1: Left Images & Experience Counter */}
          <WhyChooseImages />

          {/* Child 2: Right Content, Features, Skill bars, Author */}
          <WhyChooseFeatures />
        </div>
      </div>
    </div>
  );
};
