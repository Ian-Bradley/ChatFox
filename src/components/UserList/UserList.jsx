import React from 'react';
import User from '../User/User.jsx';
import './UserList.scss';

/**
 * @props usersTotal (number)   Total number of connected users
 * @props users (array)         List of all users
 * @props click_name (function) Clicking on a user name
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
            let usersArray = [];
            for (let i = 0; i < props.users.length; i++)
            {
                usersArray.push(
                    <User
                        key={i}
                        user={props.users[i]}
                        click_name={props.click_name}
                    />
                );
            }
            return usersArray;
        }
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className='user-list'>
            <div className='user-top'>
                <span className='user-title'>Users</span>
                <span className='user-total'>{props.usersTotal}</span>
            </div>
            <div className='user-bot'>
                {display_users()}
            </div>
        </main>
    );
}