import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { LogInIcon, ShapesIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { loginClick } from "@/helpers/login";
import { Button } from "@/components/ui/button";

const OrderPage = async () => {
  const user = await getServerSession(authOptions);
  const login = await loginClick;

  if (!user) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <AlertDialog>
          <p>Efetue o login para verificar seus pedidos.</p>
          <AlertDialogTrigger>
            <Button className="flex justify-center gap-1">
              <LogInIcon size={16} />
              Login
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Deseja fazer login em sua conta?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Você sera redirecionado a tela de login de sua conta google.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={login}>Continuar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <div className="p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <ShapesIcon size={16} />
        meus pedidos
      </Badge>
      <div className="mt-5 flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
