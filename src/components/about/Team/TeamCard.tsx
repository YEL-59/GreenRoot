import React from "react";
import Link from "next/link";
import type { TeamMember } from "@/data/about";

interface TeamCardProps {
  member: TeamMember;
  delay?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, delay = "0.2s" }) => {
  return (
    <div className="team-item wow fadeInUp" data-wow-delay={delay}>
      {/* Team Image */}
      <div className="team-item-image">
        <Link href={member.href} className="image-anime" data-cursor-text="View">
          <figure>
            <img src={member.image} alt={member.name} />
          </figure>
        </Link>
      </div>

      {/* Team Body */}
      <div className="team-item-body">
        <div className="team-item-content">
          <h2>
            <Link href={member.href}>{member.name}</Link>
          </h2>
          <p>{member.role}</p>
        </div>
        <div className="team-social-list">
          <ul>
            {member.socials.map((social, i) => (
              <li key={i}>
                <a href={social.href} aria-label={social.icon}>
                  <i className={social.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
