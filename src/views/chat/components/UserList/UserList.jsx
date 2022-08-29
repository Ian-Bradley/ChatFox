import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import User from '../User/User.jsx';
import SimpleBar from 'simplebar-react';
import { Container, Top, Total } from './styles.js';

/**
 * @props clickName (function) Clicking on a user name
 */

export default function UserList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const users = useSelector((state) => {
        return state['users'].users;
    });
    const userTotal = useSelector((state) => {
        return state['userTotal'].userTotal;
    });

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onSearchButton = (e) => {
        console.log('===> onSearchButton');
        console.log('===> END - onSearchButton');
    };

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    const renderUsers = useCallback(() => {
        if (!(users === undefined) && users.length) {
            return [...Array(users.length)].map((x, i) => (
                <User key={i} user={users[i]} clickName={props.clickName} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <Container>
            <Top>
                Users
                <Total>{userTotal}</Total>
            </Top>
            <SimpleBar style={SIMPLE_BAR_STYLES}>{renderUsers()}</SimpleBar>
        </Container>
    );
}
