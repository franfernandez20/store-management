import { useContext } from "react";
import { GlobalContext } from "./GlobalProvider";

export const useGlobalContextProvider = () => {
  return useContext(GlobalContext);
};
