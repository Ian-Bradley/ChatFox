import React from 'react';
import './Nav.scss';

/**
 * @props totalUsers (number) Total number of connected users
 * @props user (object) User info
 */

export default function Nav ( props )
{

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_users = () =>
    {
        console.log('===> on_users');
        console.log('===> END - on_users');
    }

    /*======================================*/
    /*======================================*/

    const on_user = () =>
    {
        console.log('===> on_user');
        console.log('===> END - on_user');
    }

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/


    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <nav>
            <div>
                <button className='nav-users' onClick={on_users}>
                    {props.totalUsers} users online
                </button>
            </div>
            <div>
                <button className={'nav-user ' + props.user.color} onClick={on_user}>
                    {props.user.name}
                </button>
            </div>
        </nav>
    );
}