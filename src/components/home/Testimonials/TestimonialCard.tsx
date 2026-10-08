import type { Testimonial } from "@/types";

export type TestimonialCardProps = {
  item: Testimonial;
  delay?: string;
};

export const TestimonialCard = ({ item, delay }: TestimonialCardProps) => {
  return (
    <div className="testimonials-item-gold wow fadeInUp" data-wow-delay={delay}>
      <div className="testimonials-item-header-gold">
        <div className="testimonial-item-rating-gold">
          {Array.from({ length: item.rating }).map((_, i) => (
            <i className="fa-solid fa-star" key={i}></i>
          ))}
        </div>
        <div className="testimonial-item-content-gold">
          <p>{item.content}</p>
        </div>
      </div>

      <div className="testimonial-item-body-gold">
        <div className="testimonial-author-gold">
          <div className="testimonial-author-image-gold">
            <figure className="image-anime">
              <img src={item.author.image} alt={item.author.name} />
            </figure>
          </div>
          <div className="testimonial-author-content-gold">
            <h3>{item.author.name}</h3>
            <p>{item.author.role}</p>
          </div>
        </div>
        <div className="testimonial-item-quote-gold">
          <img src="/images/testimonial-quote-gold.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
