import AuthorPortal from "@/components/AuthorPortal";
import { hasAuthorSession } from "@/lib/author-auth";
import { getArticleBySlug } from "@/lib/articles";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Author Studio | Take Back America",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ slug?: string }> };

export default async function PostPage({ searchParams }: Props) {
  if (!await hasAuthorSession()) redirect("/login");

  const slug = (await searchParams).slug;
  const article = slug ? getArticleBySlug(slug) : undefined;
  return <AuthorPortal authenticated initialArticle={article} />;
}
