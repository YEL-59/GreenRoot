import Link from "next/link";
import type { SocialLink } from "@/types";

export function GetInTouchCircle({ href = "/contact", className = "get-in-touch-circle-gold" }) {
  return (
    <div className={className}>
      <Link href={href}>
        <img src="/images/get-in-touch-circle.svg" alt="" />
      </Link>
    </div>
  );
}

export function SocialIcons({ links, className }: { links: SocialLink[]; className: string }) {
  return (
    <div className={className}>
      <ul>
        {links.map((s) => (
          <li key={s.label}>
            <a href={s.href} aria-label={s.label}>
              <i className={s.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
