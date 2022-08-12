import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import User from '../User/User.jsx';
import Button from '../Button/Button.jsx';
import IconSearch from '../../images/icons/search.svg';

// CSS COMPONENTS
import {
    UserListContainer,
    UserListTop,
    UserListBottom,
    UserListTotal,
    UserListSearch,
} from './styles.js';
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

    const renderUsers = () => {
        if (!(users === undefined) && users.length) {
            let usersArray = [];
            for (let i = 0; i < users.length; i++) {
                usersArray.push(<User key={i} user={users[i]} clickName={props.clickName} />);
            }
            return usersArray;
        }
    };

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <UserListContainer>
            <UserListTop>
                <UserListTotal>{userTotal}</UserListTotal>
                <UserListSearch>
                    <Button
                        btnClasses={'search-button'}
                        btnFunction={onSearchButton}
                        btnIcon={IconSearch}
                    />
                </UserListSearch>
            </UserListTop>
            <UserListBottom>{renderUsers()}</UserListBottom>
        </UserListContainer>
    );
}
