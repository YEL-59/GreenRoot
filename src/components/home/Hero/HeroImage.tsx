import React from "react";
import { heroData } from "@/data/home";

export const HeroImage: React.FC = () => {
  return (
    <div className="hero-image-box-gold wow fadeInUp">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-image-title-gold">
              <h2>{heroData.bigTitle}</h2>
            </div>
            <div className="hero-image-gold">
              <figure>
                <img src={heroData.image} alt={heroData.title} />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
