import React from "react";
import Link from "next/link";
import { servicesList } from "@/data/services";
import { siteConfig } from "@/config/site";

interface ServiceSidebarProps {
  currentSlug: string;
}

export function ServiceSidebar({ currentSlug }: ServiceSidebarProps) {
  return (
    <div className="page-single-sidebar">
      {/* Category List */}
      <div className="page-category-list wow fadeInUp">
        <h3>Explore Our Services</h3>
        <ul>
          {servicesList.map((srv) => (
            <li
              key={srv.slug}
              className={srv.slug === currentSlug ? "active font-bold" : ""}
            >
              <Link
                href={`/services/${srv.slug}`}
                className={srv.slug === currentSlug ? "text-[#E8AF30]" : ""}
              >
                {srv.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Contact CTA Box */}
      <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.25s">
        <div className="sidebar-cta-image">
          <figure className="image-anime">
            <img src="/images/sidebar-cta-image.jpg" alt="Contact GreenRoot" />
          </figure>
        </div>

        <div className="sidebar-cta-body">
          <div className="sidebar-cta-content">
            <h3>Contact Us</h3>
            <p>
              We&apos;d love to hear from you! Whether you have questions about our
              organic produce or farm consultation.
            </p>
          </div>

          <div className="sidebar-cta-contact-item">
            <div className="icon-box">
              <img src="/images/icon-phone-primary.svg" alt="" />
            </div>

            <div className="sidebar-cta-contact-content">
              <h3>Phone Number</h3>
              <p>
                <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
