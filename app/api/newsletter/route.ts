const ZOHO_OPT_IN_URL = "https://zgnp-zngp.maillist-manage.com/weboptin.zc";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: unknown };
  if (typeof email !== "string" || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const form = new URLSearchParams({
    CONTACT_EMAIL: email,
    submitType: "optinCustomView",
    emailReportId: "",
    formType: "QuickForm",
    zx: "137f94f32",
    zcvers: "3.0",
    oldListIds: "",
    mode: "OptinCreateView",
    zcld: "117bd2a5a1d71676b",
    zctd: "",
    zc_trackCode: "ZCFORMVIEW",
    zc_formIx: "3ze4080922531b1dae6e70d1c37f690d87f6a1452d423ee18d08e593008cedfa08",
    scriptless: "yes",
  });

  try {
    const response = await fetch(ZOHO_OPT_IN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
      cache: "no-store",
    });
    if (!response.ok) return Response.json({ error: "Newsletter signup failed." }, { status: 502 });
  } catch {
    return Response.json({ error: "Newsletter signup failed." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
