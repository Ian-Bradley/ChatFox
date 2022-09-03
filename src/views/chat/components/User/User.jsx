import React from 'react';
import { Container, Name } from './styles.js';

/**
 * @props clickName {function}
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
        props.clickName(e);
        console.log('===> END - onClickName');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Container>
                <Name onClick={onClickName}>{props.user.nickname}</Name>
            </Container>
        </>
    );
}
