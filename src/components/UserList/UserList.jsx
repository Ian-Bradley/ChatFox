import React from 'react';
import User from "../User/User.jsx";
import './UserList.scss';

/**
 * @props users (array) List of all users
 */

export default function UserList ( props )
{

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/


    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_users = () =>
    {
        if ( !( props.users === undefined ) && ( props.users.length ) )
        {
            return (
                props.users.map(( user, index ) =>
                    <User
                        key={index}
                        user={user}
                    />
                )
            )
        }
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className="user-list">
            {display_users()}
        </main>
    );
}