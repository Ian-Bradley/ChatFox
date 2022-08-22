import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENETS
import Message from '../Message/Message.jsx';
import { Container } from './styles.js';

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

    // const renderMessages = () => {
    //     if (!(messages === undefined) && messages.length) {
    //         let messageArray = [];
    //         for (let i = messages.length - 1; i > 0; i--) {
    //             messageArray.push(
    //                 <Message key={i} message={messages[i]} clickName={props.clickName} />
    //             );
    //         }
    //         return messageArray;
    //     }
    // };

    // NOTE: testing
    const renderMessages = useCallback(() => {
        if (!(messages === undefined) && messages.length) {
            [...Array(messages.length)].map((x, i) => (
                <Message key={i} message={messages[i]} clickName={props.clickName} />
            ));
        }
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return <Container ref={list}>{renderMessages()}</Container>;
}
