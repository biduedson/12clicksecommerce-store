"use server";
import { prismaClient } from "@/lib/prisma";
import { CartProduct } from "@/providers/cart";

export const createOrder = async (
  CartProducts: CartProduct[],
  userId: string,
) => {
  const order = await prismaClient.order.create({
    data: {
      userId,
      status: "WAITING_FOR_PAYMENT",
      orderProducts: {
        createMany: {
          data: CartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  });

  return order;
};
