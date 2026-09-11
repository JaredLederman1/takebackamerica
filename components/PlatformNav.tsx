import Link from "next/link";
import {
  Newspaper,
  Play,
  Mic,
  CalendarDays,
  Users,
  Heart,
  ArrowUpRight,
} from "lucide-react";
const platforms = [
  { label: "Articles", href: "/articles", Icon: Newspaper },
  { label: "Videos", href: "/videos", Icon: Play },
  { label: "Podcast", href: "/podcast", Icon: Mic },
  { label: "Events", href: "/events", Icon: CalendarDays },
  { label: "Get Involved", href: "/get-involved", Icon: Users },
  { label: "Support", href: "/support", Icon: Heart },
];
export default function PlatformNav() {
  return (
    <nav className="platform-nav" aria-label="Explore the platform">
      <div className="container platform-inner">
        {platforms.map(({ label, href, Icon }) => (
          <Link href={href} key={href}>
            <Icon size={21} strokeWidth={1.5} />
            <span>{label}</span>
            <ArrowUpRight className="platform-arrow" size={15} />
          </Link>
        ))}
      </div>
    </nav>
  );
}
