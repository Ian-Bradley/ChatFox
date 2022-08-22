import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENETS
import SimpleBar from 'simplebar-react';
import Message from '../Message/Message.jsx';
// import { Container } from './styles.js';

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
                <Message key={i} message={messages[i]} clickName={props.clickName} />
            ));
        }
        // NOTE: testing
        return [...Array(150)].map((x, i) => <div key={i}>Message</div>);
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    // return <Container ref={messageList}>{renderMessages()}</Container>;
    return <SimpleBar ref={messageList} style={SIMPLE_BAR_STYLES}>{renderMessages()}</SimpleBar>
}
