import React from 'react';
import Button from '../Button/Button.jsx';
import IconUser from '../../images/icons/user.svg';
// import IconSettings from '../../images/icons/settings.svg';
import './Nav.scss';

/**
 * @props user (object) User info
 * @props appTitle (string)
 */

export default function Nav ( props )
{

    /*================================================
        ANCHOR: RENDER FUNCTIONS - Interactions
    ==================================================*/

    const on_user = () =>
    {
        console.log('===> on_user');
        console.log('===> END - on_user');
    }

    /*================================================
        ANCHOR: RENDER FUNCTIONS - Displaying
    ==================================================*/


    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/
    //props.user.color

    return (
        <main className='container-nav'>
            <div className='container-title'>
                <span>{props.appTitle}</span>
            </div>
            <nav>
                {/* <Button
                    btnClasses  ={'nav-settings'}
                    btnFunction ={on_settings}
                    btnIcon     ={IconSettings}
                /> */}
                <Button
                    btnClasses  ={'nav-user'}
                    btnFunction ={on_user}
                    btnText     ={props.user.name}
                    btnIcon     ={IconUser}
                />
            </nav>
        </main>
    );
}