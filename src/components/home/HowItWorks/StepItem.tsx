import type { HowWorksStep } from "@/types";

export type StepItemProps = {
  step: HowWorksStep;
  boxIndex: number;
  delay?: string;
};

export const StepItem = ({ step, boxIndex, delay }: StepItemProps) => {
  return (
    <div className="col-xl-3 col-md-6">
      <div
        className={`how-works-item-gold box-${boxIndex} wow fadeInUp`}
        data-wow-delay={delay}
      >
        <div className="how-works-item-header-gold">
          <div className="how-works-item-no-gold">
            <h2>{step.no}</h2>
          </div>
          <div className="how-works-item-image-gold">
            <figure>
              <img src={step.image} alt={step.title} />
            </figure>
          </div>
        </div>
        <div className="how-works-item-content-gold">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      </div>
    </div>
  );
};
