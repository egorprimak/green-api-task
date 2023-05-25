import React, {useEffect, useState} from 'react';
import {LoginDataContext} from "./context/LoginDataContext";
import {ACCOUNT_SETTINGS, DASHBOARD_PAGE, LOGIN_DATA, LOGIN_PAGE} from "./consts";
import AppRouter from "./components/AppRouter";
import {useNavigate} from "react-router-dom";
import './App.css';
import {AccountSettingsContext} from "./context/AccountSettingsContext";
import {ActiveChatIdContext} from "./context/ActiveChatIdContext";
import {ChatListContext} from "./context/ChatListContext";

const App = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({idInstance: '', apiTokenInstance: ''});
    const [accountSettings, setAccountSettings] = useState(null);
    const [activeChatId, setActiveChatId] = useState(null);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const storageLoginData = localStorage.getItem(LOGIN_DATA);
        const accountSettings = localStorage.getItem(ACCOUNT_SETTINGS);

        if (storageLoginData && accountSettings) {
            setLoginData(JSON.parse(storageLoginData));
            setAccountSettings(JSON.parse(accountSettings));

            navigate(DASHBOARD_PAGE);
            return;
        }

        navigate(LOGIN_PAGE);
    }, []);

    return (
        <LoginDataContext.Provider value={{loginData, setLoginData}}>
            <AccountSettingsContext.Provider value={{accountSettings, setAccountSettings}}>
                <ActiveChatIdContext.Provider value={{activeChatId, setActiveChatId}}>
                    <ChatListContext.Provider value={{chatList, setChatList}}>
                        <div className="App">
                            <AppRouter/>
                        </div>
                    </ChatListContext.Provider>
                </ActiveChatIdContext.Provider>
            </AccountSettingsContext.Provider>
        </LoginDataContext.Provider>
    );
};

export default App;
