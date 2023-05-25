import React, {useContext, useState} from 'react';
import {ChatListContext} from "../../context/ChatListContext";
import {LoginDataContext} from "../../context/LoginDataContext";
import PhoneInput from 'react-phone-input-2';
import './NewChatPanel.css';
import 'react-phone-input-2/lib/style.css';
import {saveChatToStorage} from "../../storage/chats";

const NewChatPanel = () => {
    const [validError, setValidError] = useState('');
    const [phone, setPhone] = useState('');

    const {chatList, setChatList} = useContext(ChatListContext);
    const {loginData} = useContext(LoginDataContext);

    const createChat = () => {
        setTimeout(() => setValidError(''), 3000);

        if (phone.length < 11) {
            setValidError('Некорректный номер');
            return;
        }

        const chatId = phone + '@c.us';
        const hasChat = !!chatList.find(c => c.chatId === chatId);

        if (hasChat) {
            setValidError('Такой чат уже существует');
            return;
        }

        const chat = {
            chatId: chatId,
            chatName: phone,
            messages: []
        };

        setChatList(prev => [...prev, chat]);
        saveChatToStorage(loginData.idInstance, chat);

        setValidError('');
        setPhone('');
    };

    return (
        <div className="new-chat-panel">
            <PhoneInput
                className="new-chat-panel__input"
                country={'ru'}
                placeholder="+7 (000) 000-00-00"
                value={phone}
                onChange={phone => setPhone(phone)}
            />
            <button className="button" onClick={createChat}>Создать чат</button>
            {validError && <div className="error-text new-chat-panel__error">{validError}</div>}
        </div>
    );
};

export default NewChatPanel;
