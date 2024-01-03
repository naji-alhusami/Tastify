import { createContext } from "react";

interface ContextType {
  address: string | null;
  setAddress: (address: string | null) => void;
}

const StateContext = createContext<null | ContextType>(null);

export default StateContext;
