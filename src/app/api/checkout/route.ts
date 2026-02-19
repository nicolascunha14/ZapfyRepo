import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe não configurado. Adicione STRIPE_SECRET_KEY ao .env.local" },
      { status: 500 }
    );
  }

  // Initialize inside the handler so env vars are available at runtime (not build time)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  if (!process.env.STRIPE_PRESALE_PRICE_ID) {
    return NextResponse.json(
      { error: "STRIPE_PRESALE_PRICE_ID não configurado no .env.local" },
      { status: 500 }
    );
  }

  // Read optional email from request body
  let customerEmail: string | undefined;
  try {
    const body = await req.json();
    if (body?.email && typeof body.email === "string" && body.email.includes("@")) {
      customerEmail = body.email;
    }
  } catch {
    // body is optional
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_PRESALE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/obrigado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/pre-venda`,
    locale: "pt-BR",
    payment_method_types: ["card"],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    ...(customerEmail ? { customer_email: customerEmail } : {}),
  });

  return NextResponse.json({ url: session.url });
}
