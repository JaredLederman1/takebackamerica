import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
export type FeaturedItem = {
  title: string;
  label: string;
  excerpt: string;
  image: string;
  href: string;
  play?: boolean;
  comingSoon?: boolean;
};
export default function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <article className="featured-card">
      <Link href={item.href}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 950px) 50vw, 25vw"
        />
        {item.comingSoon && <span className="card-soon">Coming soon</span>}
        {item.play && (
          <span className="card-play" aria-hidden="true">
            <Play size={19} fill="currentColor" />
          </span>
        )}
        <div className="featured-card-copy">
          <span className="content-label">{item.label}</span>
          <h3>{item.title}</h3>
          <p>{item.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
