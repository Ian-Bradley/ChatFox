

import React from 'react';

import './ChatNav.scss';

/**
 * @props teamRed (object)       Team data for remaining guesses and cards
 * @props teamBlue (object)      Team data for remaining guesses and cards
 */

export default function ChatNav ( props ) {

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
            <div className={'nav-left'}>
                <button className='nav-users' onClick={on_users}>
                    {this.state.totalUsers} users online
                </button>
            </div>
            <div className={'nav-right'}>
                <button className='nav-user' onClick={on_user}>
                    {this.state.user}
                </button>
            </div>
        </nav>
    );
}