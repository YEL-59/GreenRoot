import Link from "next/link";
import type { TeamMember } from "@/types";

export type TeamMemberCardProps = {
  member: TeamMember;
  delay?: string;
};

export const TeamMemberCard = ({ member, delay }: TeamMemberCardProps) => {
  return (
    <div className="col-xl-3 col-md-6">
      <div className="team-item-gold wow fadeInUp" data-wow-delay={delay}>
        <div className="team-item-header-gold">
          <div className="team-item-image-gold">
            <figure className="image-anime">
              <img src={member.image} alt={member.name} />
            </figure>
          </div>
          <div className="team-item-content-gold">
            <h2>
              <Link href={member.href}>{member.name}</Link>
            </h2>
            <p>{member.role}</p>
          </div>
        </div>
        <div className="team-social-icons-gold">
          <ul>
            {member.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label}>
                  <i className={s.icon}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
