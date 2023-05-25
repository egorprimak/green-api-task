import {createContext} from "react";

export const LoginDataContext = createContext({
    loginData: {idInstance: '', apiTokenInstance: ''},
    setLoginData: () => {}
});
