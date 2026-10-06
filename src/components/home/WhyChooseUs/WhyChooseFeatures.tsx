import React from "react";
import Link from "next/link";
import { whyChooseData } from "@/data/home";

export const WhyChooseFeatures: React.FC = () => {
  return (
    <div className="col-xl-6">
      <div className="why-choose-us-content-gold">
        <div className="section-title">
          <h3 className="wow fadeInUp">{whyChooseData.subtitle}</h3>
          <h2 className="text-anime-style-3" data-cursor="-opaque">
            {whyChooseData.title}
          </h2>
          <p className="wow fadeInUp" data-wow-delay="0.2s">
            {whyChooseData.description}
          </p>
        </div>

        <div className="why-choose-item-list-gold wow fadeInUp" data-wow-delay="0.4s">
          {whyChooseData.features.map((item) => (
            <div className="why-choose-item-gold" key={item.title}>
              <div className="icon-box">
                <img src={item.icon} alt="" />
              </div>
              <div className="why-choose-item-content-gold">
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="why-choose-progress-list-gold">
          {whyChooseData.skills.map((skill) => (
            <div className="skills-progress-bar-gold" key={skill.label}>
              <div className="skillbar-gold" data-percent={`${skill.percent}%`}>
                <div className="skill-data-gold">
                  <div className="skill-title-gold">{skill.label}</div>
                  <div className="skill-no-gold">{skill.percent}%</div>
                </div>
                <div className="skill-progress-gold">
                  <div className="count-bar-gold"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="why-choose-footer-gold wow fadeInUp" data-wow-delay="0.6s">
          <div className="why-choose-btn-gold">
            <Link href={whyChooseData.button.href} className="btn-default">
              {whyChooseData.button.label}
            </Link>
          </div>

          <div className="why-choose-author-box-gold">
            <div className="author-image">
              <figure className="image-anime">
                <img src={whyChooseData.author.image} alt={whyChooseData.author.name} />
              </figure>
            </div>
            <div className="why-choose-author-content-gold">
              <h3>{whyChooseData.author.name}</h3>
              <p>{whyChooseData.author.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
