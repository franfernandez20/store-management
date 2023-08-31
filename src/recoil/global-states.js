import { atom } from "recoil";

const userAtom = atom({
  key: "user",
  default: {
    name: "",
    id: "0",
    function: () => { },
  }
});

export {
  userAtom
}
