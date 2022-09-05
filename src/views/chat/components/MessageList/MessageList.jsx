import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENETS
import SimpleBar from 'simplebar-react';
import Message from '../Message/Message.jsx';
// import { Container } from './styles.js';

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

    const messageList = useRef(null);
    useEffect(() => {
        messageList.current.scrollTop = messageList.current.scrollHeight;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    /*================================================
        BLOCK: RENDERING
    ==================================================*/

    const renderMessages = useCallback(() => {
        if (!(messages === undefined) && messages.length) {
            return [...Array(messages.length)].map((x, i) => (
                <Message key={i} message={messages[i]} />
            ));
        }
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <SimpleBar scrollableNodeProps={{ ref: messageList }} style={SIMPLE_BAR_STYLES}>
            {renderMessages()}
        </SimpleBar>
    );
}
