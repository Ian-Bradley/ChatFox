import React from 'react';
import { Container, Name } from './styles.js';

/**
 * @props channel (Object)
    id: (String)
    name: (String)
    active: (Boolean)
    locked: (Boolean)
    password: (String)
 */

export default function Channel(props) {
    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onClickChannel = (e) => {
        console.log('===> onClickChannel');

        console.log('===> END - onClickChannel');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <Name onClick={onClickChannel}>{props.channel.name}</Name>
        </Container>
    );
}
