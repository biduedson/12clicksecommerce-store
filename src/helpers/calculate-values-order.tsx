import { Prisma } from "@prisma/client";
import { useMemo } from "react";
import { computeProductTotalPrice } from "./product";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

interface TotalValuesOrder {
  total: number;
  subTotal: number;
  totalDiscount: number;
}

export function calculateOrderValues({
  order,
}: OrderItemProps): TotalValuesOrder {
  const subTotal = order.orderProducts.reduce((acc, orderProduct) => {
    return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity;
  }, 0);

  const total = order.orderProducts.reduce((acc, product) => {
    const productWithTotalPrice = computeProductTotalPrice(product.product);
    return acc + productWithTotalPrice.totalPrice * product.quantity;
  }, 0);
  const totalDiscount = subTotal - total;

  return {
    total: total,
    subTotal: subTotal,
    totalDiscount: totalDiscount,
  };
}
