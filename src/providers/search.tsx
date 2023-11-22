"use client";
import React, { ReactNode, SetStateAction } from "react";

interface IsearchProps {
  search: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deferredSearch: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}

export const ISearch = React.createContext({} as IsearchProps);

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );
  return (
    <ISearch.Provider value={{ search, onChange, deferredSearch, setSearch }}>
      {children}
    </ISearch.Provider>
  );
};

export default SearchProvider;
