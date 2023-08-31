import { atom, selector } from "recoil";

const initialState = {
  count: 0,
  list: [],
  name: "initial name",
  data: {
    nested1: null,
    nested2: null,
  },
  setCount: () => { },
  setName: () => { },
  setList: () => { },
  addList: () => { },
  removeList: () => { },
  runSomething: () => { },
};

const countAtom = atom({
  key: "count",
  default: initialState.count,
});

const nameAtom = atom({
  key: "name",
  default: initialState.name,
});

const listAtom = atom({
  key: "list",
  default: initialState.list,
});

const dataAtom = atom({
  key: "data",
  default: initialState.data,
});

const initAtom = selector({
  key: 'init',
  get: ({ get }) => {
    const count = get(countAtom);
    const name = get(nameAtom);
    const list = get(listAtom);
    const data = get(dataAtom);
    return { count, name, list, data };
  },
  set: ({ set, reset }, newValue) => {
    if (!Object.keys(newValue || {}).length) {
      reset(countAtom);
      reset(nameAtom);
      reset(listAtom);
      reset(dataAtom);
      return;
    }
    set(countAtom, newValue.count);
    set(nameAtom, newValue.name);
    set(listAtom, newValue.list);
    set(dataAtom, newValue.data);
  }

});


export {
  countAtom,
  nameAtom,
  listAtom,
  dataAtom,
  initAtom,
}
