import React, {useContext} from 'react';
import './Message.css';
import {LoginDataContext} from "../../context/LoginDataContext";

const Message = ({message}) => {
    const {loginData} = useContext(LoginDataContext);

    const classes = ['message-wrapper'];

    if (message.sender === loginData.idInstance) {
        classes.push('message-wrapper_my');
    } else {
        classes.push('message-wrapper_contact');
    }

    return (
        <div className={classes.join(' ')}>
            <div className="message" id={message.id}>
                {message.message}
            </div>
        </div>
    );
};

export default Message;
