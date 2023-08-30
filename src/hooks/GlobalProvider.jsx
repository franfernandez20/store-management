import { createContext, useReducer } from "react";

const initialState = {
  user: {
    name: "",
    id: "0",
    function: () => {},
  },
  setUser: () => {},
};

const reducer = (state, { type, value }) => {
  switch (type) {
    case "initState":
      return {
        ...state,
        user: value?.user || state.user,
      };
    case "set-user":
      return { ...state, user: value };
    default:
      throw new Error("Store has not this action type: " + type);
  }
};

const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state;

  const setState = (value) => {
    dispatch({ type: "initState", value });
  };

  const value = {
    user,
    setUser: (value) => dispatch({ type: "set-user", value }),
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
