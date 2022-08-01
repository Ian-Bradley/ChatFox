import React from 'react';
import Button from '../Button/Button.js';
import IconUser from '../../images/icons/user.svg';
import './Nav.scss';

/**
 * @props user (object) User info
 */

export default function Nav ( props )
{

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

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
    //props.user.color

    return (
        <main className='container-nav'>
            <nav>
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