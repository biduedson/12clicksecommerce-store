import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import { AuthProvider } from "@/providers/auth";
import Footer from "@/components/ui/footer";
import CartProvider from "@/providers/cart";
import ToastProvider from "@/providers/toast";
import SearchProvider from "@/providers/search";
import Search from "@/components/ui/search";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "12clicks",
  description: "Ecommerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <SearchProvider>
              <CartProvider>
                <ToastProvider>
                  <Header />
                  <Search />
                  <div className="flex-1">{children}</div>
                  <Footer />
                </ToastProvider>
              </CartProvider>
            </SearchProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
