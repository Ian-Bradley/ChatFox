import React from 'react';
import {
    ChannelContainer,
    ChannelName,
    ChannelDiv,
} from './styles.js';

/**
 * @props channel (Object)
    id: (String)
    name: (String)
    active: (Boolean)
    locked: (Boolean)
    password: (String)
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function Message(props) {
    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onClickChannel = (e) => {
        console.log('===> onClickChannel');
        props.clickChannel(e);
        console.log('===> END - onClickChannel');
    };

    /*================================================
        BLOCK: RENDERING
    ==================================================*/

    // TODO: display classes for active and locked

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <ChannelContainer>
            <ChannelDiv>
                <ChannelName onClick={onClickChannel}>
                    {props.channel.name}
                </ChannelName>
            </ChannelDiv>
        </ChannelContainer>
    );
}
