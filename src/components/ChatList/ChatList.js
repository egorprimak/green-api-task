import React from 'react';
import './ChatList.css';
import ChatCard from "../ChatCard/ChatCard";

const ChatList = ({chatList}) => {
    return (
        <div className="chat-list">
            {chatList.map(c =>
                <ChatCard key={c.chatId} chatId={c.chatId} chatName={c.chatName} />
            )}
        </div>
    );
};

export default ChatList;
