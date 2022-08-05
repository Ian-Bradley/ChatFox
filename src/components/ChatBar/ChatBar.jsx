import React from 'react';
import { useSelector } from 'react-redux';

// >>> COMPONENTS

// >>> CSS
import './ChatBar.scss';


export default function ChatBar ( props )
{
    /*======================================
        ANCHOR: STATES
    ========================================*/

    const userTotal = useSelector( ( state ) => { return state['userTotal'].userTotal; } );

    /*======================================
        ANCHOR: INTERACTIONS
    ========================================*/

    const on_typing_message = e =>
    {
        if ( ( e.keyCode === 13 ) && ( e.target.value !== '' ) )
        {
            props.send_message({
                    type: 'message',
                    name: props.user.name,
                    time: new Date().toGMTString(),
                    color: props.user.color,
                    content: e.target.value,
                });
            e.target.value = '';
        }
    }

    /*======================================
        ANCHOR: DISPLAYING
    ========================================*/


    /*======================================
        ANCHOR: COMPONENTS
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