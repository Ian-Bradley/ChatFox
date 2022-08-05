import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Button from '../Button/Button.jsx';
import IconUser from '../../images/icons/user.svg';
import IconSettings from '../../images/icons/settings.svg';

// CSS
import './Nav.scss';

/**
 * @props 
 */

export default function Nav ( props )
{
    /*======================================
        ANCHOR: STATES
    ========================================*/

    const user = useSelector( ( state ) => { return state['user'].user; } );

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const on_user = () =>
    {
        console.log('===> on_user');
        console.log('===> END - on_user');
    }

    /*======================================*/
    /*======================================*/

    const on_settings = () =>
    {
        console.log('===> on_settings');
        console.log('===> END - on_settings');
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/


    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <main className='container-nav'>
            <div className='container-title'>
                <span>{document.title}</span>
            </div>
            <nav>
                <Button
                    btnClasses  ={'nav-settings'}
                    btnFunction ={on_settings}
                    btnIcon     ={IconSettings}
                />
                <Button
                    btnClasses  ={'nav-user'}
                    btnFunction ={on_user}
                    btnText     ={user.name}
                    btnIcon     ={IconUser}
                />
            </nav>
        </main>
    );
}