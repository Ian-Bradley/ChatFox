import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Sidebar from './Sidebar.jsx';
import User from '../User/User.jsx';

export default function UserList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const users = useSelector((state) => {
        return state['users'].users;
    });

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    const renderUsers = useCallback(() => {
        if (!(users === undefined) && users.length) {
            return [...Array(users.length)].map((x, i) => (
                <User key={i} user={users[i]} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <>
            <Sidebar type={'user'} header={users.length} list={users}>
                {renderUsers()}
            </Sidebar>
        </>
    );
}
