"use client";
import { ProductWithTotalPrice } from "@/helpers/product";
import React from "react";
import Image from "next/image";
import { convertCurrencyToReal } from "@/helpers/convert-currency";
import Link from "next/link";
import useSearch from "@/hooks/use-search";

const SearchCardResult = ({
  product,
}: {
  product: ProductWithTotalPrice | undefined;
}) => {
  const { setSearch } = useSearch();

  if (!product) {
    return null;
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      onClick={() => setSearch("")}
      key={product.id}
      className="flex gap-4"
    >
      <div
        className="flex h-14 w-14 items-center justify-center 
            rounded-md bg-accent"
      >
        <Image
          src={product.imageUrls[0]}
          sizes="100vw"
          alt={product.name}
          width={0}
          height={0}
          className="aspect-square h-10 w-10"
        />
      </div>
      <div>
        <p className="text-black opacity-70">{product.name}</p>
        <span className="text-md pr-2 font-bold text-primary">
          {convertCurrencyToReal(product.totalPrice)}
        </span>
        <span className="text-xs line-through">
          {convertCurrencyToReal(Number(product.basePrice))}
        </span>
      </div>
    </Link>
  );
};

export default SearchCardResult;
