"use client";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./avatar";
import { Separator } from "./separator";

const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };

  const handlersignOutClick = async () => {
    await signOut();
  };

  const { status, data } = useSession();
  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>
                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>
                  <div>
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>
                </div>
              </div>
              <Separator />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full justify-start gap-2 text-left"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}
            {status === "authenticated" && (
              <Button
                onClick={handlersignOutClick}
                variant="outline"
                className="w-full justify-start gap-2 text-left"
              >
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <HomeIcon size={16} />
              Inicio
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <PercentIcon size={16} />
              Ofertas
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-left"
            >
              <ListOrderedIcon size={16} />
              Catalago
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">
        <span className="text-primary">12Clicks</span> Store
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
