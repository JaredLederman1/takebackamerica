import AuthorPortal from "@/components/AuthorPortal";
import { hasAuthorSession } from "@/lib/author-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in | Take Back America",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await hasAuthorSession()) redirect("/post");
  return <AuthorPortal authenticated={false} />;
}
