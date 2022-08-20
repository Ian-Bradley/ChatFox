import React from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../../util/websocket.js';
import { Container, InputContainer, Input } from './styles.js';

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
        if (e.keyCode === 13 && e.target.value !== '') {
            console.log('===> sendMessage');
            let newUpdate = {
                type: 'newMessage',
                message: {
                    name: user.name,
                    time: new Date().toGMTString(),
                    color: user.color,
                    content: e.target.value,
                },
            };
            socket.send(JSON.stringify(newUpdate));
            e.target.value = '';
            console.log('>>>>>>>>> MESSAGE SENT - newMessage >>>>>>>>>');
            console.log('===> END - sendMessage');
        }
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <InputContainer>
                <Input type='text' onKeyUp={onTypingMessage} placeholder='Type your message here' />
            </InputContainer>
        </Container>
    );
}
