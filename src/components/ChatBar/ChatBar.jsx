import React from 'react';
import { useSelector } from 'react-redux';
import { ChatBarContainer, ChatBarInputContainer, ChatBarInput } from './styles.js';
/**
 * @props sendMessage (function)
 */

export default function ChatBar(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const user = useSelector((state) => {
        return state['user'].user;
    });

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onTypingMessage = (e) => {
        if (e.keyCode === 13 && e.target.value !== '') {
            props.sendMessage({
                type: 'message',
                name: user.name,
                time: new Date().toGMTString(),
                color: user.color,
                content: e.target.value,
            });
            e.target.value = '';
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <ChatBarContainer>
            <ChatBarInputContainer>
                <ChatBarInput
                    onKeyUp={onTypingMessage}
                    placeholder='Type your message here'
                />
            </ChatBarInputContainer>
        </ChatBarContainer>
    );
}
