import React from "react";
import Link from "next/link";

type PageHeaderProps = {
  title: string;
  breadcrumb: { label: string; href: string; active?: boolean }[];
};

export const PageHeader = ({ title, breadcrumb }: PageHeaderProps) => {
  return (
    <div className="page-header bg-section dark-section parallaxie">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="page-header-box">
              <h1 className="text-anime-style-3" data-cursor="-opaque">
                {title}
              </h1>
              <nav className="wow fadeInUp">
                <ol className="breadcrumb">
                  {breadcrumb.map((crumb) =>
                    crumb.active ? (
                      <li
                        key={crumb.label}
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {crumb.label}
                      </li>
                    ) : (
                      <li key={crumb.label} className="breadcrumb-item">
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </li>
                    )
                  )}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
