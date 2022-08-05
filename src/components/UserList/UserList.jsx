import React from 'react';
import { useSelector } from 'react-redux';

// >>> COMPONENTS
import User from '../User/User.jsx';
// import Button from '../Button/Button.jsx';
// import IconSearch from '../../images/icons/search.svg';

// >>> CSS
import './UserList.scss';

/**
 * @props click_name (function) Clicking on a user name
 */

/*======================================*/
/*======================================*/

export default function UserList ( props )
{
    /*======================================
        ANCHOR: STATES
    ========================================*/

    const userTotal = useSelector( ( state ) => { return state['userTotal'].userTotal; } );

    /*=================================================
        ANCHOR: INTERACTIONS
    ===================================================*/

    const on_search_button = e =>
    {
        console.log('===> on_search_button');
        
        console.log('===> END - on_search_button');
    }

    /*=================================================
        ANCHOR: DISPLAYING
    ===================================================*/

    const display_users = () =>
    {
        // if ( !( props.users === undefined ) && ( props.users.length ) )
        // {
        //     let usersArray = [];
        //     for (let i = 0; i < props.users.length; i++)
        //     {
        //         usersArray.push(
        //             <User
        //                 key={i}
        //                 user={props.users[i]}
        //                 click_name={props.click_name}
        //             />
        //         );
        //     }
        //     return usersArray;
        // }
    }

    /*=================================================
        ANCHOR: COMPONENTS
    ===================================================*/

    return (
        <main className='user-list'>
            <div className='user-top'>
                <span className='user-title'>Users</span>
                <span className='user-total'>{userTotal}</span>
                <div className='user-search-button'>
                    {/* <Button
                        btnClasses  ={'search-button'}
                        btnFunction ={on_search_button}
                        btnIcon     ={IconSearch}
                    /> */}
                </div>
            </div>
            <div className='user-bottom'>
                {display_users()}
            </div>
        </main>
    );
}