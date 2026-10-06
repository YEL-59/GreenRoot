import React from "react";
import Link from "next/link";
import type { BlogPost } from "@/types";

export interface BlogCardProps {
  post: BlogPost;
  delay?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, delay }) => {
  return (
    <div className="col-xl-4 col-md-6">
      <div className="post-item wow fadeInUp" data-wow-delay={delay}>
        <div className="post-item-box">
          <div className="post-featured-image">
            <Link href={post.href} data-cursor-text="View">
              <figure className="image-anime">
                <img src={post.image} alt={post.title} />
              </figure>
            </Link>
          </div>

          <div className="post-item-content">
            <h2>
              <Link href={post.href}>{post.title}</Link>
            </h2>
            <p>{post.excerpt}</p>
          </div>
        </div>

        <div className="post-item-btn">
          <Link href={post.href} className="readmore-btn">
            read more
          </Link>
        </div>
      </div>
    </div>
  );
};
