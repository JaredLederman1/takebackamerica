import Stripe from "stripe";

function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured.");
  return new Stripe(key);
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) return new Response("Webhook configuration is missing.", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripeClient().webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return new Response("Invalid webhook signature.", { status: 400 });
  }

  if (
    (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") &&
    event.data.object.payment_status !== "unpaid"
  ) {
    // This contribution has no fulfillment action. Keep this verified handler so a
    // future receipt, CRM, or accounting integration has a trusted event boundary.
  }

  return Response.json({ received: true });
}
