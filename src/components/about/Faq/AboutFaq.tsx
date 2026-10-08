import { aboutData } from "@/data/about";
import { FaqAccordion } from "./FaqAccordion";

export const AboutFaq = () => {
  const { faqs } = aboutData;

  return (
    <div className="our-faqs">
      <div className="container">
        <div className="row">
          {/* Left Column: FAQs Accordion */}
          <div className="col-xl-7">
            <div className="faqs-content">
              <div className="section-title">
                <h3 className="wow fadeInUp">{faqs.subtitle}</h3>
                <h2 className="text-anime-style-3" data-cursor="-opaque">
                  {faqs.title}
                </h2>
              </div>

              <FaqAccordion items={faqs.items} />
            </div>
          </div>

          {/* Right Column: Image and CTA Counter */}
          <div className="col-xl-5">
            <div className="faqs-image-box">
              <div className="faqs-image">
                <figure className="image-anime">
                  <img src={faqs.ctaImage} alt="GreenRoot Farm FAQs" />
                </figure>
              </div>

              <div className="faq-cta-box">
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
                  <div className="satisfy-client-image add-more">
                    <h3>
                      <span className="counter">4</span>K+
                    </h3>
                  </div>
                </div>

                <div className="faqs-cta-content">
                  <h3>{faqs.ctaText}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export * from "./FaqAccordion";
