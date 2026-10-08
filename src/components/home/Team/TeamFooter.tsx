
export const TeamFooter = () => {
  return (
    <div className="col-lg-12">
      <div className="section-footer-text section-satisfy-img wow fadeInUp" data-wow-delay="0.8s">
        <div className="satisfy-client-images">
          <div className="satisfy-client-image">
            <figure className="image-anime">
              <img src="/images/author-1.jpg" alt="" />
            </figure>
          </div>
          <div className="satisfy-client-image add-more">
            <i>
              <img src="/images/icon-phone-primary.svg" alt="" />
            </i>
          </div>
        </div>
        <p>Trust a farm where innovation, nature, and integrity come together to serve you better every day.</p>
        <ul>
          <li>
            <span className="counter">4.9</span>/5
          </li>
          <li>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </li>
          <li>Over 4200 Reviews</li>
        </ul>
      </div>
    </div>
  );
};
