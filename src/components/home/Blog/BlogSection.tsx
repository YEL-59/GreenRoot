import { blogPosts } from "@/data/home";
import { BlogCard } from "./BlogCard";

const delays = ["0s", "0.2s", "0.4s"];

export const BlogSection = () => {
  return (
    <div className="our-blog">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Latest Blogs</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Dive into educational, inspiring, and farm fresh content
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {blogPosts.map((post, i) => (
            <BlogCard key={post.title} post={post} delay={delays[i % delays.length]} />
          ))}
        </div>
      </div>
    </div>
  );
};
