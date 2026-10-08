import React from "react";
import Link from "next/link";
import { aboutData } from "@/data/about";
import { TeamCard } from "./TeamCard";

export function AboutTeam() {
  const { team } = aboutData;

  return (
    <div className="our-team">
      <div className="container">
        {/* Section Header Row */}
        <div className="row section-row align-items-center">
          <div className="col-xl-6">
            <div className="section-title">
              <h3 className="wow fadeInUp">{team.subtitle}</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                {team.title}
              </h2>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="section-content-btn">
              <div
                className="section-title-content wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <p>{team.description}</p>
              </div>
              <div className="section-btn wow fadeInUp" data-wow-delay="0.4s">
                <Link href="/team" className="btn-default">
                  View All Farmers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="row">
          {team.members.map((member, index) => (
            <div key={member.name} className="col-xl-3 col-md-6">
              <TeamCard
                member={member}
                delay={`${0.2 * index}s`}
              />
            </div>
          ))}

          {/* Section Footer */}
          <div className="col-lg-12">
            <div
              className="section-footer-text section-satisfy-img wow fadeInUp"
              data-wow-delay="0.8s"
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
        </div>
      </div>
    </div>
  );
};

export * from "./TeamCard";
