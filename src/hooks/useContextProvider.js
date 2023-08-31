import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import { countAtom, nameAtom, listAtom, initAtom } from '../recoil/local-states';
import { useEffect } from 'react';
import { userAtom } from '../recoil/global-states';


export const useContextProvider = () => {
  const user = useRecoilValue(userAtom);
  const [count, setCount] = useRecoilState(countAtom);
  const [name, setName] = useRecoilState(nameAtom);
  const [list, setList] = useRecoilState(listAtom);
  const init = useSetRecoilState(initAtom);

  const incrementCount = () => {
    setCount((oldCount) => oldCount + 1);
  }

  const addList = (item) => {
    setList((oldList) => [...oldList, item]);
  }

  const removeList = (item) => {
    setList(list.filter(i => i !== item));
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading data for userId: ", user.id);
      const res = await fetch(`http://localhost:3100/data/${user.id || 0}`);
      const data = await res.json();
      console.log("Data from server in Provider: ", data);
      init(data);
    };
    fetchData();
  }, [init, user.id]);


  return { count, name, list, addList, removeList, setCount, setName, incrementCount }
}