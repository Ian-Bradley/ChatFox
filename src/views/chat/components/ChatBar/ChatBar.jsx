import { useSocket } from 'Util/api/websocket.js';
import { useSelector } from 'react-redux';
import React from 'react';

// COMPONENTS
import { Container, InputContainer, Input } from './styles.js';

// UTIL
import { KEYCODE_ENTER } from 'Util/helpers/constants.js';

export default function ChatBar(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const user = useSelector((state) => {
        return state['user'].user;
    });
    // Hooks
    const socket = useSocket();

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onTypingMessage = (e) => {
        if (e.keyCode === KEYCODE_ENTER && e.target.value !== '') {
            let newUpdate = {
                type: 'newMessage',
                message: {
                    channelID: user.channelID,
                    timestamp: Date().now(),
                    name: user.name,
                    nickname: user.nickname,
                    color: user.color,
                    content: e.target.value,
                },
            };
            socket.send(JSON.stringify(newUpdate));
            e.target.value = '';
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <InputContainer>
                <Input type='text' onKeyUp={onTypingMessage} placeholder='Send a message' />
            </InputContainer>
        </Container>
    );
}
