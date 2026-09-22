import { NextResponse } from "next/server";
import {
  authorSessionCookie,
  createAuthorSession,
  isAuthorCredentials,
} from "@/lib/author-auth";

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }
  if (!isAuthorCredentials(body.email, body.password)) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(authorSessionCookie.name, createAuthorSession(), authorSessionCookie.options);
  return response;
}
