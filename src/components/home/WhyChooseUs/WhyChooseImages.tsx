import React from "react";
import { whyChooseData } from "@/data/home";

export const WhyChooseImages: React.FC = () => {
  return (
    <div className="col-xl-6">
      <div className="why-choose-images-gold">
        <div className="why-choose-image-1-gold">
          <figure className="image-anime">
            <img src={whyChooseData.image1} alt="" />
          </figure>
        </div>

        <div className="why-choose-image-2-gold">
          <figure>
            <img src={whyChooseData.image2} alt="" />
          </figure>
        </div>

        <div className="why-choose-counter-box-gold">
          <div className="why-choose-counter-body-gold">
            <div className="icon-box">
              <img src={whyChooseData.counter.icon} alt="" />
            </div>
            <div className="why-choose-counter-content-gold">
              <h2>
                <span className="counter">{whyChooseData.counter.value}</span>
                {whyChooseData.counter.suffix}
              </h2>
              <p>{whyChooseData.counter.label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
