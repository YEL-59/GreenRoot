import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { TestimonialSlide } from "./TestimonialSlide";

export const AboutTestimonials = () => {
  const { testimonials } = aboutData;

  return (
    <div className="our-testimonials bg-section">
      <div className="container">
        {/* Section Title */}
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">{testimonials.subtitle}</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                {testimonials.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="row">
          <div className="col-lg-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.items.map((item) => (
                <TestimonialSlide key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* Section Rating Footer */}
          <div className="col-lg-12">
            <div
              className="section-footer-text section-satisfy-img wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <p>
                <span>Free</span> Where Experiences Speak Louder -{" "}
                <Link href="/contact">Discover Why Customers Love Us!</Link>
              </p>

              <ul>
                <li>
                  <span className="counter">{testimonials.rating}</span>/5
                </li>
                <li>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                  <i className="fa-solid fa-star text-gold"></i>
                </li>
                <li>{testimonials.totalReviews}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./TestimonialSlide";
