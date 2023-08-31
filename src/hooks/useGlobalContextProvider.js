import { useRecoilState } from 'recoil'
import { userAtom } from '../recoil/global-states';


export const useGlobalContextProvider = () => {
  const [user, setUser] = useRecoilState(userAtom);
  return { user, setUser }
}