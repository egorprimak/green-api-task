import React, {useContext, useState} from 'react';
import './LeftMenu.css';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import {FaUserAlt} from "react-icons/fa";
import {AccountSettingsContext} from "../../context/AccountSettingsContext";
import {LoginDataContext} from "../../context/LoginDataContext";
import {ACCOUNT_SETTINGS, LOGIN_DATA, LOGIN_PAGE} from "../../consts";
import {useNavigate} from "react-router-dom";
import ChatList from "../ChatList/ChatList";
import {ActiveChatIdContext} from "../../context/ActiveChatIdContext";
import NewChatPanel from "../NewChatPanel/NewChatPanel";

const LeftMenu = ({chatList}) => {
    const [openProfileInfo, setOpenProfileInfo] = useState(false);
    const navigate = useNavigate();

    const {setAccountSettings} = useContext(AccountSettingsContext);
    const {setLoginData} = useContext(LoginDataContext);
    const {setActiveChatId} = useContext(ActiveChatIdContext);

    const logout = () => {
        setLoginData({idInstance: '', apiTokenInstance: ''});
        setAccountSettings(null);
        setActiveChatId(null);

        localStorage.removeItem(ACCOUNT_SETTINGS);
        localStorage.removeItem(LOGIN_DATA);

        navigate(LOGIN_PAGE);
    };

    const openProfile = () => {
        setOpenProfileInfo(true);
    };

    const closeProfileInfo = () => {
        setOpenProfileInfo(false);
    };

    return (
        <div className="left-menu">
            <div className="left-menu__header">
                <div className="left-menu__profile">
                    <div className="avatar-circle">
                        <FaUserAlt className="user-icon"/>
                    </div>
                    <div className="link-button left-menu__profile-link" onClick={openProfile}>Профиль</div>
                </div>
                <button className="button" onClick={logout}>Выйти</button>
            </div>
            <NewChatPanel />
            { chatList.length
                ? <ChatList chatList={chatList}/>
                : <div className="empty-list-text">Список чатов пуст</div>
            }
            {openProfileInfo && <ProfileInfo close={closeProfileInfo}/>}
        </div>
    );
};

export default LeftMenu;
