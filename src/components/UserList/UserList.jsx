import React from 'react'
import { useSelector } from 'react-redux'

// COMPONENTS
import User from '../User/User.jsx'
import Button from '../Button/Button.jsx'
import IconSearch from '../../images/icons/search.svg'

// CSS
import './UserList.scss'

/**
 * @props clickName (function) Clicking on a user name
 */

export default function UserList ( props )
{
    /*================================================
        ANCHOR: STATES
    ==================================================*/

    const users     = useSelector( ( state ) => { return state['users'].users } )
    const userTotal = useSelector( ( state ) => { return state['userTotal'].userTotal } )

    /*=================================================
        ANCHOR: INTERACTIONS
    ===================================================*/

    const onSearchButton = e =>
    {
        console.log('===> onSearchButton')
        console.log('===> END - onSearchButton')
    }

    /*=================================================
        ANCHOR: DISPLAYING
    ===================================================*/

    const displayUsers = () =>
    {
        if ( !( users === undefined ) && ( users.length ) )
        {
            let usersArray = []
            for (let i = 0; i < users.length; i++)
            {
                usersArray.push(
                    <User
                        key={i}
                        user={users[i]}
                        clickName={props.clickName}
                    />
                )
            }
            return usersArray
        }
    }

    /*=================================================
        ANCHOR: COMPONENTS
    ===================================================*/

    return (
        <main className='user-list'>
            <div className='user-top'>
                <span className='user-total'>{userTotal}</span>
                <div className='user-search-button'>
                    <Button
                        btnClasses  ={'search-button'}
                        btnFunction ={onSearchButton}
                        btnIcon     ={IconSearch}
                    />
                </div>
            </div>
            <div className='user-bottom'>
                {displayUsers()}
            </div>
        </main>
    )
}