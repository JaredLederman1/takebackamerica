import { NextResponse } from "next/server";
import { authorSessionCookie } from "@/lib/author-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(authorSessionCookie.name, "", { ...authorSessionCookie.options, maxAge: 0 });
  return response;
}
