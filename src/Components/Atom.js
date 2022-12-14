import { atom } from "recoil";



 export const IsAuthState = atom({
    key: 'isAuth', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });