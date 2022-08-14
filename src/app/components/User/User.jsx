import React from 'react';
import { Container, Name } from './styles.js';

/**
 * @props user (Object)
    id: (Number)
    name: (String)
    nickname: (String)
    color: (String [HEX])
 * @props clickName (Function) Clicking on a user name
 */

export default function User(props) {
    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onClickName = (e) => {
        console.log('===> onClickName');
        props.clickName(e);
        console.log('===> END - onClickName');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Container>
            <Name onClick={onClickName}>{props.user.nickname}</Name>
        </Container>
    );
}
