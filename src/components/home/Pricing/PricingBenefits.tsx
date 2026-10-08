import { pricingBenefits } from "@/data/home";

export const PricingBenefits = () => {
  return (
    <div className="col-lg-12">
      <div className="pricing-benefit-list-gold wow fadeInUp" data-wow-delay="0.6s">
        <ul>
          {pricingBenefits.map((b) => (
            <li key={b.label}>
              <img src={b.icon} alt="" />
              {b.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
