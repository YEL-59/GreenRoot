import React from "react";

type CompanyLogosProps = {
  logos: string[];
};

export const CompanyLogos = ({ logos }: CompanyLogosProps) => {
  return (
    <div className="approach-company-slider-box wow fadeInUp" data-wow-delay="1s">
      <div className="company-supports-content">
        <hr />
        <p>Trusted By More Than 100+ Companies</p>
        <hr />
      </div>

      <div className="company-supports-slider">
        <div className="flex flex-wrap items-center justify-around gap-6 py-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="company-supports-logo opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src={logo}
                alt={`Company Partner ${index + 1}`}
                className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
