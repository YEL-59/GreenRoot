import Link from "next/link";
import { aboutData, clientAvatars } from "@/data/home";

export const AboutVision = () => {
  return (
    <div className="col-xl-3 col-md-6 order-xl-3 order-md-2">
      <div className="about-us-item-box-gold vision-box-gold wow fadeInUp" data-wow-delay="0.4s">
        <div className="about-us-item-gold">
          <div className="about-us-item-header-gold">
            <div className="icon-box">
              <img src={aboutData.vision.icon} alt="" />
            </div>
            <div className="about-us-item-title-gold">
              <h3>{aboutData.vision.title}</h3>
            </div>
          </div>
          <div className="about-us-item-content-gold">
            <p>{aboutData.vision.description}</p>
          </div>
        </div>

        <div className="about-us-item-body-gold">
          <div className="about-client-rating-box-gold">
            <div className="satisfy-client-images">
              {clientAvatars.map((img) => (
                <div className="satisfy-client-image" key={img}>
                  <figure className="image-anime">
                    <img src={img} alt="" />
                  </figure>
                </div>
              ))}
            </div>
            <div className="about-satisfy-client-content-gold">
              <ul>
                <li>
                  <i className="fa-solid fa-star"></i> {aboutData.rating}
                </li>
              </ul>
            </div>
          </div>

          <div className="about-client-rating-body-gold">
            <div className="about-client-rating-content-gold">
              <p>{aboutData.review.text}</p>
            </div>
            <div className="about-client-rating-btn-gold">
              <Link href={aboutData.review.href} className="readmore-btn">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
