import {createContext} from "react";

export const ChatListContext = createContext({
    chatList: [],
    setChatList: () => {}
});
