import { useDispatch } from 'react-redux';
import React from 'react';

// COMPONENTS
import { Container, Name, Icon } from './styles.js';
import ChatSVG from 'Assets/icons/chat.svg.js';

// REDUX
import { setChannelID } from 'Redux/slices/user.slice.js';
import { getMessages } from 'Redux/slices/messages.slice.js';

/**
 * @props channel {object}
 *      id: {number}
 *      name: {string}
 *      active: {boolean}
 *      locked: {boolean}
 *      password: {string}
 */

export default function Channel(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const dispatch = useDispatch();

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onClickChannel = (e) => {
        dispatch(setChannelID(props.channel.id));
        dispatch(getMessages(props.channel.id));
    };

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <>
            <Container onClick={onClickChannel} data-name={props.channel.name}>
                <Icon>{ChatSVG()}</Icon>
                <Name>{props.channel.name}</Name>
                {/* {TODO: locked SVG} */}
            </Container>
        </>
    );
}
