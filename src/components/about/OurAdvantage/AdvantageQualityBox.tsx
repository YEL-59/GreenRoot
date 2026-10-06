import React from "react";

interface AdvantageQualityBoxProps {
  icon: string;
  title: string;
  description: string;
  customers: string;
}

export const AdvantageQualityBox: React.FC<AdvantageQualityBoxProps> = ({
  icon,
  title,
  description,
  customers,
}) => {
  return (
    <div className="our-advantage-box wow fadeInUp">
      <div className="our-advantage-box-body">
        <div className="icon-box">
          <img src={icon} alt="" />
        </div>
        <div className="our-advantage-box-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <div className="our-advantage-review-box">
        <div className="satisfy-client-images">
          {["author-1.jpg", "author-2.jpg", "author-3.jpg", "author-4.jpg"].map(
            (author, i) => (
              <div key={i} className="satisfy-client-image">
                <figure className="image-anime">
                  <img src={`/images/${author}`} alt={`Client ${i + 1}`} />
                </figure>
              </div>
            )
          )}
        </div>
        <div className="our-advantage-review-content">
          <p>{customers}</p>
        </div>
      </div>
    </div>
  );
};
