import { cn } from "@/lib/utils";

export interface SatisfyClientImagesProps {
  images: string[];
  /** renders the trailing `.add-more` bubble with this icon */
  addMoreIcon?: string;
}

export function SatisfyClientImages({ images, addMoreIcon }: SatisfyClientImagesProps) {
  return (
    <div className="satisfy-client-images">
      {images.map((src) => (
        <div className="satisfy-client-image" key={src}>
          <figure className="image-anime">
            <img src={src} alt="" />
          </figure>
        </div>
      ))}
      {addMoreIcon && (
        <div className={cn("satisfy-client-image", "add-more")}>
          <i>
            <img src={addMoreIcon} alt="" />
          </i>
        </div>
      )}
    </div>
  );
}
