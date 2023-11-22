import React from "react";
import SearchBar from "./search-bar";
import { prismaClient } from "@/lib/prisma";
import SearchResults from "./search-results";

const Search = async () => {
  const products = await prismaClient.product.findMany({});
  return (
    <div className="relative flex flex-col">
      <SearchBar>
        <SearchResults products={products} />
      </SearchBar>
    </div>
  );
};

export default Search;
