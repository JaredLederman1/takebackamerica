import AuthorPortal from "@/components/AuthorPortal";
import { hasAuthorSession } from "@/lib/author-auth";

export const metadata = {
  title: "Author Studio | Take Back America",
  robots: { index: false, follow: false },
};

export default async function PostPage() {
  return <AuthorPortal authenticated={await hasAuthorSession()} />;
}
