import Stripe from "stripe";

const MAXIMUM_CONTRIBUTION_CENTS = 100_000_00;

function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured.");
  return new Stripe(key);
}

export async function POST(request: Request) {
  const { amount } = (await request.json()) as { amount?: unknown };

  if (
    typeof amount !== "number" ||
    !Number.isInteger(amount) ||
    amount < 100 ||
    amount > MAXIMUM_CONTRIBUTION_CENTS
  ) {
    return Response.json({ error: "Choose a contribution between $1 and $100,000." }, { status: 400 });
  }

  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    const identifier = `take-back-america-${crypto.randomUUID().replaceAll("-", "").slice(0, 8)}`;
    const session = await stripeClient().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Take Back America contribution",
              description: "Voluntary support for Take Back America media content.",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/support/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/support`,
      integration_identifier: identifier,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return Response.json({ url: session.url });
  } catch {
    return Response.json({ error: "Unable to start secure checkout. Please try again." }, { status: 503 });
  }
}
