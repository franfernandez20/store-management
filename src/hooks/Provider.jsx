import { createContext, useEffect, useReducer } from "react";

// const views = [
//   "View A",
//   "View B",
//   "View C",
// ];

const initialState = {
  countGlobal: 0,
  count: 0,
  views: [],
  data: {
    proposal: null,
    requestEvent: null,
    requestSession: null,
  },
  setCountGlobal: () => {},
  setCount: () => {},
  setView: () => {},
  addView: () => {},
  removeView: () => {},
  setProposal: () => {},
  setRequestEvent: () => {},
  setRequestSession: () => {},
  incrementCount: () => {},
  runSomething: () => {},
};

const reducer = (state, { type, value }) => {
  switch (type) {
    case "set-count-global":
      return { ...state, countGlobal: value };
    case "set-count":
      return { ...state, count: value };
    case "set-view":
      return { ...state, views: value };
    case "add-view":
      return { ...state, views: [...state.views, value] };
    case "remove-view":
      return {
        ...state,
        views: state.views.filter((view) => view !== value),
      };
    case "set-proposal":
      return { ...state, data: { ...state.data, proposal: value } };
    case "set-request-event":
      return { ...state, data: { ...state.data, requestEvent: value } };
    case "set-request-session":
      return { ...state, data: { ...state.data, requestSession: value } };
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { countGlobal, count, views, data } = state;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3100/views");
      const data = await res.json();
      console.log("Data from server in Provider: ", data);
      dispatch({ type: "set-view", value: data });
    };
    fetchData();
  }, []);

  const value = {
    countGlobal,
    setCountGlobal: (count) => {
      dispatch({ type: "set-count-global", value: count });
    },
    count,
    setCount: (count) => {
      dispatch({ type: "set-count", value: count });
    },
    views,
    setView: (views) => {
      dispatch({ type: "set-view", value: views });
    },
    addView: (view) => {
      dispatch({ type: "add-view", value: view });
    },
    removeView: (view) => {
      dispatch({ type: "remove-view", value: view });
    },
    data,
    setProposal: (proposal) => {
      dispatch({ type: "set-proposal", value: proposal });
    },
    setRequestEvent: (requestEvent) => {
      dispatch({ type: "set-request-event", value: requestEvent });
    },
    setRequestSession: (requestSession) => {
      dispatch({ type: "set-request-session", value: requestSession });
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
