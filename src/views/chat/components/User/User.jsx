import React from 'react';
import { Container, Name } from './styles.js';

/**
 * @props user {object}
 *      id: {number}
 *      name: {string}
 *      nickname: {string}
 *      color: {string}
 *      role: {string}
 *      channelID: {number}
 */

export default function User(props) {
    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    const onClickName = (e) => {
        console.log('===> onClickName');
        // TODO: click a user name
        console.log('===> END - onClickName');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container onClick={onClickName} data-user={props.user.nickname}>
                <Name>{props.user.nickname}</Name>
            </Container>
        </>
    );
}
