import { atom, useAtom } from "jotai";

export const userAtom = atom({
  name: "",
  id: "0",
  function: () => { },
});

export const useGlobalContextProvider = () => {
  const [user, setUser] = useAtom(userAtom);
  console.log('user in hook: ', user)
  return { user, setUser };
};
