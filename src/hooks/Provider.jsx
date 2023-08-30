import { createContext, useEffect, useReducer } from "react";
import { useGlobalContextProvider } from "./useGlobalContextProvider";
// import { useGlobalContextProvider } from "./useGlobalContextProvider";

const initialState = {
  count: 0,
  list: [],
  name: "",
  data: {
    nested1: null,
    nested2: null,
  },
  setCount: () => {},
  setName: () => {},
  setList: () => {},
  addList: () => {},
  removeList: () => {},
  runSomething: () => {},
};

const reducer = (state, { type, value }) => {
  switch (type) {
    case "initState":
      return {
        ...state,
        count: value?.count || state.count,
        list: value?.list || state.list,
        name: value?.name || state.name,
        data: value?.data || state.data,
      };
    case "set-count":
      return { ...state, count: value };
    case "set-list":
      return { ...state, list: value };
    case "add-list":
      return { ...state, list: [...state.list, value] };
    case "remove-list":
      return {
        ...state,
        list: state.list.filter((item) => item !== value),
      };
    case "set-name":
      return { ...state, name: value };
    case "set-data":
      return { ...state, data: value };
    case "set-nested1":
      return { ...state, data: { ...state.data, nested1: value } };
    case "set-nested2":
      return { ...state, data: { ...state.data, nested2: value } };
    case "increment-count":
      return { ...state, count: state.count + 1 };
    case "run-something":
      // do something here
      return state;
    default:
      throw new Error("Store has not this action type: " + type);
  }
};

const Context = createContext(initialState);

const Provider = ({ children }) => {
  const { user } = useGlobalContextProvider();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, count, list, data } = state;

  const setState = (value) => {
    dispatch({ type: "initState", value });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading data for userId: ", user.id);
      const res = await fetch(`http://localhost:3100/data/${user.id || 0}`);
      const data = await res.json();
      console.log("Data from server in Provider: ", data);
      setState(data);
    };
    fetchData();
  }, [user.id]);

  const value = {
    count,
    setCount: (count) => {
      dispatch({ type: "set-count", value: count });
    },
    list,
    setList: (list) => {
      dispatch({ type: "set-list", value: list });
    },
    addList: (item) => {
      dispatch({ type: "add-list", value: item });
    },
    removeList: (item) => {
      dispatch({ type: "remove-list", value: item });
    },
    name,
    setName: (name) => {
      dispatch({ type: "set-name", value: name });
    },
    data,
    setData: (data) => {
      dispatch({ type: "set-data", value: data });
    },
    setNested1: (nested1) => {
      dispatch({ type: "set-nested1", value: nested1 });
    },
    setNested2: (nested2) => {
      dispatch({ type: "set-nested2", value: nested2 });
    },
    incrementCount: () => {
      dispatch({ type: "increment-count" });
    },

    runSomething: () => {
      dispatch({ type: "run-something" });
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Provider, Context };
