import React from "react";
import Link from "next/link";
import { whatWeDoData } from "@/data/home";

export const WhatWeDoImages = () => {
  return (
    <div className="col-xl-6">
      <div className="what-we-images-gold">
        <div className="what-we-image-box-1-gold">
          <div className="what-we-image-1-gold">
            <figure className="image-anime">
              <img src={whatWeDoData.image1} alt="" />
            </figure>
          </div>

          <div className="get-in-touch-circle-gold">
            <Link href="/contact">
              <img src="/images/get-in-touch-circle.svg" alt="" />
            </Link>
          </div>
        </div>

        <div className="what-we-image-box-2-gold">
          <div className="what-we-image-2-gold">
            <figure className="image-anime">
              <img src={whatWeDoData.image2} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
