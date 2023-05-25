import React, {memo, useContext, useEffect, useState} from 'react';
import './Chat.css';
import {useParams} from "react-router-dom";
import {FaUserAlt} from "react-icons/fa";
import Message from "../../../../components/Message/Message";
import ChatFooter from "../../../../components/ChatFooter/ChatFooter";
import {ChatListContext} from "../../../../context/ChatListContext";
import {useFetch} from "../../../../hooks/useFetch";
import Spinner from "../../../../components/Spinner/Spinner";
import {SendingService} from "../../../../api/sending";
import {LoginDataContext} from "../../../../context/LoginDataContext";
import {getRandomString} from "../../../../utils/getRandomString";
import {saveChatToStorage} from "../../../../storage/chats";

const Chat = memo(() => {
    const params = useParams();

    const [messages, setMessages] = useState([
        // {id: 1, message: 'hello', sender: '1101823306'},
        // {id: 2, message: 'how are you', sender: '1101823306'},
        // {id: 3, message: 'i\'m fine, and you', sender: '9999999'},
    ]);
    const [currentChat, setCurrentChat] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [needSaveChat, setNeedSaveChat] = useState(false);

    const {loginData} = useContext(LoginDataContext);
    const {chatList, setChatList} = useContext(ChatListContext);

    const [fetchMessages, loadingMessages] = useFetch(() => {
        setMessages([]);
        const id = params.id;
        if (!id) {
            return;
        }

        const chat = chatList.find(c => c.chatId === id);
        setCurrentChat(chat);
        setMessages(chat.messages);
    });

    const [sendMessage] = useFetch(async () => {
        const {idInstance, apiTokenInstance} = loginData;
        await SendingService.sendMessage(idInstance, apiTokenInstance, newMessage);

        const newMessages = [...messages, newMessage];
        const changedChat = {...currentChat, messages: [...messages, newMessage]};
        const filteredChatList = chatList.filter(c => c.chatId !== currentChat.chatId);

        setMessages(newMessages);
        setCurrentChat(changedChat);
        setChatList([...filteredChatList, changedChat]);

        setNewMessage(null);
        setNeedSaveChat(true);
    });

    useEffect(() => {
        fetchMessages();
    }, [params]);

    useEffect(() => {
        if (!newMessage) {
            return;
        }
        sendMessage();
    }, [newMessage]);

    useEffect(() => {
        if (!needSaveChat) {
            return;
        }

        saveChatToStorage(loginData.idInstance, currentChat);
        setNeedSaveChat(false);
    }, [needSaveChat]);

    const createMessage = text => {
        const message = {
            id: getRandomString(),
            chatId: currentChat.chatId,
            message: text,
            sender: loginData.idInstance
        };
        setNewMessage(message);
    };

    if (loadingMessages) {
        return (
            <div className="spinner-wrapper">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <div className="avatar-circle">
                    <FaUserAlt className="user-icon" />
                </div>
                <div className="contact-name chat-contact">{currentChat?.chatName || currentChat?.chatId}</div>
            </div>
            <div className="chat-content">
                {messages.map(m =>
                    <Message key={m.id} message={m} />
                )}
            </div>
            <ChatFooter create={createMessage} />
        </div>
    );
})

export default Chat;
