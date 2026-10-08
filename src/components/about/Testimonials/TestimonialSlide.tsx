import type { TestimonialItem } from "@/data/about";

type TestimonialSlideProps = {
  item: TestimonialItem;
};

export const TestimonialSlide = ({ item }: TestimonialSlideProps) => {
  return (
    <div className="testimonial-item">
      <div className="testimonial-item-image">
        <figure className="image-anime">
          <img src={item.image} alt={item.name} />
        </figure>
      </div>
      <div className="testimonial-item-body">
        <div className="testimonial-item-header">
          <div className="testimonial-item-rating">
            {Array.from({ length: item.rating }).map((_, i) => (
              <i key={i} className="fa fa-solid fa-star"></i>
            ))}
          </div>
          <div className="testimonial-item-quote">
            <img src="/images/testimonial-item-quote.svg" alt="Quote" />
          </div>
        </div>
        <div className="testimonial-item-content">
          <h3>{item.quote}</h3>
        </div>
        <div className="testimonial-author-content">
          <h3>{item.name}</h3>
          <p>{item.designation}</p>
        </div>
      </div>
    </div>
  );
};
