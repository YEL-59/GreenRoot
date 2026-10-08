import { aboutData } from "@/data/home";

export const AboutMission = () => {
  return (
    <div className="col-xl-3 col-md-6 order-xl-1 order-md-1">
      <div className="about-us-item-box-gold mission-box-gold wow fadeInUp" data-wow-delay="0.2s">
        <div className="about-us-item-gold">
          <div className="about-us-item-header-gold">
            <div className="icon-box">
              <img src={aboutData.mission.icon} alt="" />
            </div>
            <div className="about-us-item-title-gold">
              <h3>{aboutData.mission.title}</h3>
            </div>
          </div>
          <div className="about-us-item-content-gold">
            <p>{aboutData.mission.description}</p>
          </div>
        </div>

        <div className="about-us-item-body-gold">
          {aboutData.counters.map((c) => (
            <div className="about-counter-item-gold" key={c.label + c.value}>
              <div className="icon-box">
                <img src={c.icon} alt="" />
              </div>
              <div className="about-counter-item-content-gold">
                <h2>
                  <span className="counter">{c.value}</span>
                  {c.suffix}
                </h2>
                <p>{c.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
