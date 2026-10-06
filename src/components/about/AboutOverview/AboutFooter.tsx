import React from "react";
import Link from "next/link";

interface AboutFooterProps {
  tags: string[];
}

export const AboutFooter: React.FC<AboutFooterProps> = ({ tags }) => {
  return (
    <div className="about-us-footer">
      {/* Footer Tags List */}
      <div className="about-us-footer-list wow fadeInUp" data-wow-delay="1s">
        <ul>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      {/* Section Footer Text & Client Imagery */}
      <div
        className="section-footer-text section-satisfy-img wow fadeInUp"
        data-wow-delay="1.2s"
      >
        <div className="satisfy-client-images">
          <div className="satisfy-client-image">
            <figure className="image-anime">
              <img src="/images/author-1.jpg" alt="Author" />
            </figure>
          </div>
          <div className="satisfy-client-image add-more">
            <i>
              <img src="/images/icon-phone-primary.svg" alt="Phone" />
            </i>
          </div>
        </div>
        <p>
          Let&apos;s make something great work together.{" "}
          <Link href="/contact">Get Free Quote</Link>
        </p>
      </div>
    </div>
  );
};
