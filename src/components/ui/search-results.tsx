"use client";
import React, { useEffect, useState } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import SearchCardResult from "./search-card-result";
import { Product } from "@prisma/client";
import useSearch from "@/hooks/use-search";

interface SearchResultsProps {
  products: Product[];
}

const SearchResults = ({ products }: SearchResultsProps) => {
  const { deferredSearch } = useSearch();
  const [filterredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(deferredSearch.toLowerCase()),
    );
    setFilteredProducts(filtered);
    setFilteredProducts(filtered);
  }, [deferredSearch, products]);

  if (!deferredSearch) {
    return null;
  }

  return (
    <ul
      className="absolute left-5 top-16 z-10 box-border flex 
        max-h-80 w-[clac(100%-2.5rem)] flex-col gap-5 overflow-scroll 
        rounded-md bg-slate-50 p-5"
    >
      {deferredSearch && filterredProducts.length !== 0 ? (
        filterredProducts?.map((product) => (
          <li key={product.id}>
            <SearchCardResult product={computeProductTotalPrice(product)} />
          </li>
        ))
      ) : (
        <li>
          <p className="text-sm font-semibold text-accent">
            {`Não encontramos numnhuma sugestão :(`}
          </p>
        </li>
      )}
    </ul>
  );
};

export default SearchResults;
