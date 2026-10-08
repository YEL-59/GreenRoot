
type AboutImagesProps = {
  image1: string;
  image2: string;
};

export const AboutImages = ({ image1, image2 }: AboutImagesProps) => {
  return (
    <div className="about-us-images">
      <div className="about-us-image-1">
        <figure className="image-anime">
          <img src={image1} alt="About GreenRoot Farm 1" />
        </figure>
      </div>
      <div className="about-us-image-2">
        <figure className="image-anime">
          <img src={image2} alt="About GreenRoot Farm 2" />
        </figure>
      </div>
    </div>
  );
};
