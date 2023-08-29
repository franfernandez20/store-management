
import { useContext } from "react";
import { Context } from "./Provider";

export const useContextProvider = () => {
  return useContext(Context);
};