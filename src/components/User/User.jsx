import React from 'react';
import './User.scss';

/**
 * @props user (object)
 * -> id (string)
 * -> name (string)
 * -> color (string)
 * @props click_name (function) Clicking on a user name
 */

export default function Message ( props )
{
    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_click_name = e =>
    {
        console.log('===> on_click_name');
        props.click_name( e );
        console.log('===> END - on_click_name');
    }

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    
    /*======================================
        COMPONENTS
    ========================================*/
    
    return (
        <main className='container-user'>
            <div className='user'>
                <span className={'user-name'} style={{color: props.user.color}} onClick={on_click_name}>
                    {props.user.name}
                </span>
            </div>
        </main>
    );
}