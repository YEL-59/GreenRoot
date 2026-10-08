import React from "react";

type AdvantageCounterBoxProps = {
  icon: string;
  years: number;
  title: string;
  description: string;
  bullets: string[];
};

export const AdvantageCounterBox = ({
  icon,
  years,
  title,
  description,
  bullets,
}: AdvantageCounterBoxProps) => {
  return (
    <div
      className="our-advantage-box wow fadeInUp"
      data-wow-delay="0.6s"
    >
      <div className="our-advantage-header">
        <div className="our-advantage-counter-box">
          <div className="icon-box">
            <img src={icon} alt="" />
          </div>
          <div className="our-advantage-counter-content">
            <h2>
              <span className="counter">{years}</span>+
            </h2>
          </div>
        </div>

        <div className="our-advantage-header-content">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="our-advantage-box-footer">
        <p>{description}</p>
        <ul>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
