import React, {useContext, useEffect} from 'react';
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import './Dashboard.css';
import {Route, Routes} from "react-router-dom";
import {chatRoutes} from "../../router";
import {LoginDataContext} from "../../context/LoginDataContext";
import {ChatListContext} from "../../context/ChatListContext";
import {getChatsByIdInstance} from "../../storage/chats";

const Dashboard = () => {
    const {loginData} = useContext(LoginDataContext);
    const {chatList, setChatList} = useContext(ChatListContext);

    useEffect(() => {
        if (!loginData.idInstance) {
            return;
        }

        const profileChats = getChatsByIdInstance(loginData.idInstance);

        if (!profileChats) {
            return;
        }

        setChatList(profileChats.chats);
    }, [loginData]);


    return (
        <div className="dashboard">
            <LeftMenu chatList={chatList}/>
            <Routes>
                {chatRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}></Route>
                )}
            </Routes>
        </div>
    );
};

export default Dashboard;
