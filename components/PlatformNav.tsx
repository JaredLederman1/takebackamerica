import Link from "next/link";
import {
  FileText,
  CirclePlay,
  Mic,
  CalendarDays,
  Heart,
} from "lucide-react";
const platforms = [
  {
    label: "Articles",
    href: "/articles",
    Icon: FileText,
    lines: ["Deep analysis.", "Real solutions."],
  },
  {
    label: "Videos",
    href: "/videos",
    Icon: CirclePlay,
    lines: ["Short form.", "Long form."],
  },
  {
    label: "Podcast",
    href: "/podcast",
    Icon: Mic,
    lines: ["Conversations", "that matter."],
  },
  {
    label: "Events",
    href: "/events",
    Icon: CalendarDays,
    lines: ["On campuses.", "In communities."],
  },
  {
    label: "Donate",
    href: "/support",
    Icon: Heart,
    lines: ["Fuel the mission."],
  },
];
export default function PlatformNav() {
  return (
    <nav className="platform-nav" aria-label="Explore the platform">
      <div className="container platform-inner">
        {platforms.map(({ label, href, Icon, lines }) => (
          <Link href={href} key={href}>
            <Icon
              size={34}
              strokeWidth={1.7}
              fill={label === "Donate" ? "currentColor" : "none"}
            />
            <strong>{label}</strong>
            <span>
              {lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
