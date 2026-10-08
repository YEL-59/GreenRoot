import React from "react";
import { teamMembers } from "@/data/home";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamFooter } from "./TeamFooter";

const delays = ["0s", "0.2s", "0.4s", "0.6s"];

export function TeamSection() {
  return (
    <div className="our-team-gold bg-section dark-section">
      <div className="container">
        <div className="row section-row">
          <div className="col-lg-12">
            <div className="section-title section-title-center">
              <h3 className="wow fadeInUp">Our Team</h3>
              <h2 className="text-anime-style-3" data-cursor="-opaque">
                Skilled experts nurturing nature with sustainable care
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          {teamMembers.map((member, i) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              delay={delays[i % delays.length]}
            />
          ))}

          {/* Child 2: Team Footer review strip */}
          <TeamFooter />
        </div>
      </div>
    </div>
  );
};
