import React from "react";
import { heroData } from "@/data/home";

export function HeroImage() {
  return (
    <div className="hero-image-box-gold relative mt-4 sm:mt-8">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-image-title-gold">
              <h2 className="!text-[20vw] !tracking-wider select-none">{heroData.bigTitle}</h2>
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
}
