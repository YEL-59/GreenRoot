import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTitleProps = {
  subtitle: string;
  title: ReactNode;
  description?: ReactNode;
  /** adds `.section-title-center` */
  center?: boolean;
  /** hero uses h1, all other sections h2 */
  as?: "h1" | "h2";
  descriptionDelay?: string;
  className?: string;
};

/** Template `.section-title` block: h3 tag-line, animated heading, optional paragraph. */
export const SectionTitle = ({
  subtitle,
  title,
  description,
  center = false,
  as: Heading = "h2",
  descriptionDelay = "0.2s",
  className,
}: SectionTitleProps) => {
  return (
    <div className={cn("section-title", center && "section-title-center", className)}>
      <h3 className="wow fadeInUp">{subtitle}</h3>
      <Heading className="text-anime-style-3" data-cursor="-opaque">
        {title}
      </Heading>
      {description && (
        <p className="wow fadeInUp" data-wow-delay={descriptionDelay}>
          {description}
        </p>
      )}
    </div>
  );
};
