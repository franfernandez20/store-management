
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { userAtom } from "./useGlobalContextProvider";
import { useEffect } from "react";

const countAtom = atom(0);
const listAtom = atom([]);
const nameAtom = atom("");
const dataAtom = atom({
  nested1: null,
  nested2: null,
});

const incrementCountAtom = atom(null, (get, set) => {
  set(countAtom, get(countAtom) + 1);
});

const addListAtom = atom(null, (get, set, value) => {
  set(listAtom, [...get(listAtom), value]);
});

const removeListAtom = atom(null, (get, set, value) => {
  set(
    listAtom,
    get(listAtom).filter((item) => item !== value)
  );
});

const setNested1Atom = atom(null, (get, set, value) => {
  set(dataAtom, { ...get(dataAtom), nested1: value });
});

const setNested2Atom = atom(null, (get, set, value) => {
  set(dataAtom, { ...get(dataAtom), nested2: value });
});

const runSomethingAtom = atom(null, (get, set) => {
  // do something here
});

const initAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  async (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    console.log("Loading data for userId: ", get(userAtom).id);
    const res = await fetch(`http://localhost:3100/data/${get(userAtom).id || "0"}`);
    const dbData = await res.json();
    console.log("Data from server in Provider: ", dbData);
    const { name, count, list, data } = dbData;
    set(nameAtom, name || "");
    set(countAtom, count || 0);
    set(listAtom, list || []);
    set(dataAtom, data || {});
  }
)


export const useContextProvider = () => {
  const user = useAtomValue(userAtom);
  const [count, setCount] = useAtom(countAtom);
  const list = useAtomValue(listAtom);
  const [name, setName] = useAtom(nameAtom);
  const [data, setData] = useAtom(dataAtom);
  const incrementCount = useSetAtom(incrementCountAtom);
  const addList = useSetAtom(addListAtom);
  const removeList = useSetAtom(removeListAtom);
  const setNested1 = useSetAtom(setNested1Atom);
  const setNested2 = useSetAtom(setNested2Atom);
  const runSomething = useSetAtom(runSomethingAtom);
  const init = useSetAtom(initAtom);

  useEffect(() => {
    init();
  }, [user.id]);

  return {
    count,
    list,
    name,
    data,
    incrementCount,
    addList,
    removeList,
    setCount,
    setName,
    setData,
    setNested1,
    setNested2,
    runSomething,

  }

};