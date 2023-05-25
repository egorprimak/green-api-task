import {createContext} from "react";

export const AccountSettingsContext = createContext({
    accountSettings: null,
    setAccountSettings: () => {},
});
