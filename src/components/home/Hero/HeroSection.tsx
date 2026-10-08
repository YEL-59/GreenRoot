import React from "react";
import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";

export const HeroSection = () => {
  return (
    <div className="hero-gold bg-section">
      <div className="hero-box-gold">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <HeroContent />
            </div>
          </div>
        </div>
      </div>
      <HeroImage />
    </div>
  );
};
