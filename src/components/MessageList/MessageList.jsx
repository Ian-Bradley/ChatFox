import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// COMPONENETS
import Message from '../Message/Message.jsx';

// CSS
import { MessageListContainer } from './styles.js';

/**
 * @props clickName (function) Clicking on a user name
 */

export default function MessageList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const messages = useSelector((state) => {
        return state['messages'].messages;
    });

    /*================================================
        BLOCK: HOOKS
    ==================================================*/

    const list = useRef(null);
    useEffect(() => {
        list.current.scrollTop = list.current.scrollHeight;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    /*================================================
        BLOCK: RENDERING
    ==================================================*/

    const renderMessages = () => {
        if (!(messages === undefined) && messages.length) {
            let messageArray = [];
            for (let i = messages.length - 1; i > 0; i--) {
                messageArray.push(
                    <Message key={i} message={messages[i]} clickName={props.clickName} />
                );
            }
            return messageArray;
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <MessageListContainer ref={list}>
            {renderMessages()}
        </MessageListContainer>
    );
}
