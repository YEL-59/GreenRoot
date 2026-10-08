import Link from "next/link";
import { testimonialsData } from "@/data/home";
import { TestimonialCard } from "./TestimonialCard";

const delays = ["0s", "0.2s", "0.4s"];

export const TestimonialsSection = () => {
  return (
    <div className="our-testimonials-gold bg-section dark-section parallaxie">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="testimonials-content-gold">
              <div className="testimonials-header-gold">
                <div className="section-title">
                  <h3 className="wow fadeInUp">{testimonialsData.subtitle}</h3>
                  <h2 className="text-anime-style-3" data-cursor="-opaque">
                    {testimonialsData.title}
                  </h2>
                </div>

                <div className="testimonials-btn-gold wow fadeInUp" data-wow-delay="0.2s">
                  <Link href={testimonialsData.button.href} className="btn-default btn-highlighted">
                    {testimonialsData.button.label}
                  </Link>
                </div>
              </div>

              <div className="testimonials-image-gold wow fadeInUp" data-wow-delay="0.4s">
                <figure>
                  <img src={testimonialsData.image} alt="" />
                </figure>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="testimonials-item-list-gold">
              {testimonialsData.items.map((item, i) => (
                <TestimonialCard
                  key={item.author.name}
                  item={item}
                  delay={delays[i % delays.length]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
