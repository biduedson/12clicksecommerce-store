import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature")!;

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
    const session = event.data.object as any;

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    const lineItems = sessionWithLineItems.line_items;

    //Atualizar pedido
    try {
      // Attempt to update the order status
      await prismaClient.order.update({
        where: {
          id: session.metadata.orderId,
        },
        data: {
          status: "PAYMENT_CONFIRMED",
        },
      });
      console.log(`Order ${session.metadata.orderId} updated successfully.`);
    } catch (error) {
      console.error("Error updating order:", error);
    }
    localStorage.setItem("@12clickes-store/cart-products", "[]");
  }

  return NextResponse.json({ received: true });
};
