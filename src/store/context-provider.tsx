'use client'
import { useState } from "react";
import StateContext from "./state-context";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);

  const value = {
    address,
    setAddress,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default ContextProvider;
