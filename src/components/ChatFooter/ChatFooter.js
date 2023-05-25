import React, {useState} from 'react';
import './ChatFooter.css';

const ChatFooter = ({create}) => {
    const [text, setText] = useState('');

    const createMessage = () => {
        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }
        create(trimmed);
        setText('');
    }

    return (
        <div className="chat-footer">
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                type="text"
                className="input chat-footer__input"
                placeholder="Введите сообщение"
            />
            <button className="button" onClick={createMessage}>Отправить</button>
        </div>
    );
};

export default ChatFooter;
