import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import OderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { convertCurrencyToReal } from "@/helpers/convert-currency";
import { CalculateOrderValues } from "@/helpers/calculate-values-order";
import { getOrderStatus } from "../helpers/status";

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

const OrderItem = ({ order }: OrderItemProps) => {
  const calculateOrderValues = new CalculateOrderValues({
    order,
  } as OrderItemProps);
  const { total, subTotal, totalDiscount } = calculateOrderValues;
  //const { total, subTotal, totalDiscount } = calculateOrderValues({ order });

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p>Pedido com {order.orderProducts.length} produto (s)</p>
              <span className="text-sm opacity-60">
                Pedido feito em: {format(order.createAt, "dd/MMM/y 'as' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162ff]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div className="flex flex-col">
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createAt, "dd/MMM/y", { locale: ptBR })}
                  </p>
                </div>

                <div>
                  <p className=" font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col  gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Subtotal</p>
                  <p>{convertCurrencyToReal(subTotal)}</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p>{convertCurrencyToReal(totalDiscount)}</p>
                </div>
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Total</p>
                  <p>{convertCurrencyToReal(total)}</p>
                </div>
                <Separator />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
