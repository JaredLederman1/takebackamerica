import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "tba_author_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getConfig() {
  const email = process.env.AUTHOR_EMAIL;
  const password = process.env.AUTHOR_PASSWORD;
  const secret = process.env.AUTHOR_SESSION_SECRET;
  if (!email || !password || !secret) return null;
  return { email, password, secret };
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function isEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

export function isAuthorCredentials(email: string, password: string) {
  const config = getConfig();
  if (!config) return false;

  return (
    isEqual(email, config.email) && isEqual(password, config.password)
  );
}

export function createAuthorSession() {
  const config = getConfig();
  if (!config) throw new Error("Author authentication is not configured.");
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const value = `${config.email}:${expiresAt}`;
  return `${value}:${sign(value, config.secret)}`;
}

export function isAuthorSession(session: string | undefined) {
  const config = getConfig();
  if (!config || !session) return false;
  const [email, expiresAt, signature] = session.split(":");
  if (!email || !expiresAt || !signature || Number(expiresAt) < Date.now() / 1000) return false;

  const expectedSignature = sign(`${email}:${expiresAt}`, config.secret);
  return (
    isEqual(email, config.email) && isEqual(signature, expectedSignature)
  );
}

export async function hasAuthorSession() {
  const cookieStore = await cookies();
  return isAuthorSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export const authorSessionCookie = {
  name: SESSION_COOKIE,
  options: {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  },
};
