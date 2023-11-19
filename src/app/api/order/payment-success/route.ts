import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { useEffect } from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature")!;
  let paymenteSuccess = false;
  useEffect(() => {
    if (paymenteSuccess) {
      localStorage.setItem("@12clickes-store/cart-products", "[]");
    }
  }, [paymenteSuccess]);

  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  );

  if (event.type === "checkout.session.completed") {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    paymenteSuccess = true;
    const lineItems = sessionWithLineItems.line_items;
  }

  return NextResponse.json({ received: true });
};
