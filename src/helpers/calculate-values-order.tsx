import { Prisma } from "@prisma/client";
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
export class CalculateOrderValues implements TotalValuesOrder {
  constructor(private readonly order: OrderItemProps) {}

  subTotal: number = this.order.order.orderProducts.reduce(
    (acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    },
    0,
  );

  total: number = this.order.order.orderProducts.reduce((acc, product) => {
    const productWithTotalPrice = computeProductTotalPrice(product.product);
    return acc + productWithTotalPrice.totalPrice * product.quantity;
  }, 0);

  totalDiscount = this.subTotal - this.total;
}
