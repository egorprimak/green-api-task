import React, {useContext} from 'react';
import {FaTrashAlt, FaUserAlt} from "react-icons/fa";
import './ChatCard.css';
import {useNavigate} from "react-router-dom";
import {ActiveChatIdContext} from "../../context/ActiveChatIdContext";
import {LoginDataContext} from "../../context/LoginDataContext";
import {deleteChatFromStorage} from "../../storage/chats";
import {ChatListContext} from "../../context/ChatListContext";

const ChatCard = ({chatId, chatName}) => {
    const {loginData} = useContext(LoginDataContext);
    const {activeChatId, setActiveChatId} = useContext(ActiveChatIdContext);
    const {setChatList} = useContext(ChatListContext);
    const navigate = useNavigate();

    const openChat = () => {
        setActiveChatId(chatId);
        navigate(`chat/${chatId}`);
    };

    const deleteChat = e => {
        e.stopPropagation();
        const choose = window.confirm('Действительно удалить чат?');
        if (choose) {
            setChatList(prev => prev.filter(c => c.chatId !== chatId));
            deleteChatFromStorage(loginData.idInstance, chatId);
        }

        if (chatId === activeChatId) {
            navigate('');
            setActiveChatId('');
        }
    };

    return (
        <div
            className={activeChatId === chatId ? 'chat-card chat-card_active' : 'chat-card'}
            onClick={openChat}
        >
            <div className="chat-card__avatar">
                <div className="avatar-circle">
                    <FaUserAlt className="user-icon" />
                </div>
            </div>
            <div className="chat-card__info">
                <div className="chat-card__top-info">
                    <div className="contact-name">{chatName || chatId}</div>
                </div>
            </div>
            <div className="delete-button" onClick={deleteChat}>
                <FaTrashAlt />
            </div>
        </div>
    );
};

export default ChatCard;
