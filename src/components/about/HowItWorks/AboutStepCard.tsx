import React from "react";

export interface StepItemData {
  number: string;
  image: string;
  title: string;
  description: string;
  bullet: string;
}

interface AboutStepCardProps {
  step: StepItemData;
}

export function AboutStepCard({ step }: AboutStepCardProps) {
  return (
    <div className="how-work-item">
      <div className="how-work-step-no">
        <h3>{step.number}</h3>
      </div>
      <div className="how-work-item-image">
        <figure className="image-anime">
          <img src={step.image} alt={step.title} />
        </figure>
      </div>
      <div className="how-work-item-body">
        <div className="how-work-item-content">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
        <div className="how-work-item-list">
          <ul>
            <li>{step.bullet}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
