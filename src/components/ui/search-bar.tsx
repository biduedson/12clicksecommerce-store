"use client";
import useSearch from "@/hooks/use-search";
import { SearchIcon } from "lucide-react";
import React, { ReactNode } from "react";

const SearchBar = ({ children }: { children: ReactNode }) => {
  const { search, onChange } = useSearch();

  return (
    <div className="w-full p-5">
      <div
        className="flex items-center justify-between rounded-md 
      bg-white px-5"
      >
        <input
          type="text"
          className="w-[95%] bg-transparent py-2 text-sm text-secondary
           focus:outline-none"
          typeof="text"
          id="seach-bar"
          value={search}
          onChange={onChange}
          spellCheck={false}
        />
        <SearchIcon color="#acacac" />
      </div>
      {children}
    </div>
  );
};

export default SearchBar;
