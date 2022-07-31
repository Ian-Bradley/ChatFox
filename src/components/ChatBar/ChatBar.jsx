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

    //CHAT MESSAGE HANDLER
    const onKeyUp = e =>
    {
        // e.preventDefault();
        if (e.keyCode === 13)
        {
            if (e.target.value === '')
            {
                // DO NOTHING ON EMPTY FIELD ENTRY
            }
            else
            {
                let newMessage = {
                    type: 'message',
                    name: props.user.name,
                    time: new Date(),
                    color: props.user.color,
                    content: e.target.value,
                };

                props.message_send( newMessage );
                e.target.value = '';
            }
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
                    onKeyUp={onKeyUp}
                    placeholder='Type your message here'
                />
            </div>    
        </main>
    );
    
}