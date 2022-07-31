import React from 'react';
import './ChatBar.scss';

/**
 * @props user (object) User info
 */

export default function ChatBar ( props )
{
    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/

    const on_typing_message = e =>
    {
        if ( ( e.keyCode === 13 ) && ( e.target.value !== '' ) )
        {
            props.send_message({
                    type: 'message',
                    name: props.user.name,
                    time: new Date(),
                    color: props.user.color,
                    content: e.target.value,
                });
            e.target.value = '';
        }
    };

    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/


    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className='container-chatbar'>
            <div className='chatbar'>
                <input
                    className='chatbar-input'
                    onKeyUp={on_typing_message}
                    placeholder='Type your message here'
                />
            </div>    
        </main>
    );
    
}