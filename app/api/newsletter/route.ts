const SUBSTACK_SUBSCRIBE_URL = "https://jaredlederman.substack.com/api/v1/free?nojs=true";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: unknown };
  if (typeof email !== "string" || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const form = new URLSearchParams({
    email,
    source: "website",
  });

  try {
    const response = await fetch(SUBSTACK_SUBSCRIBE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0",
      },
      body: form,
      cache: "no-store",
    });
    if (!response.ok) {
      return Response.json({ error: "Newsletter signup failed." }, { status: 502 });
    }
  } catch {
    return Response.json({ error: "Newsletter signup failed." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
