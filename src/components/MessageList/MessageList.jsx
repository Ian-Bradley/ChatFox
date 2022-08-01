// import React from 'react';
import React, { useEffect, useRef } from 'react';
import Message from '../Message/Message.jsx';
import './MessageList.scss';

/**
 * @props messages (array)      List of all messages
 * @props preferences (object)  App + Display info
 * @props click_name (function) Clicking on a user name
 */

export default function MessageList ( props )
{
    /*======================================
        HOOKS
    ========================================*/

    const list = useRef(null);
    useEffect(() => {
        list.current.scrollTop = list.current.scrollHeight;
    });

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/


    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_messages = () =>
    {
        if ( !( props.messages === undefined ) && ( props.messages.length ) )
        {
            let messageArray = [];
            for (let i = 0; i < props.messages.length; i++)
            {
                messageArray.push(
                    <Message
                        key={i}
                        message={props.messages[i]}
                        preferences={props.preferences}
                        click_name={props.click_name}
                    />
                );
            }
            return messageArray;
        }
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main
            className='message-list'
            ref={list}
        >
            {display_messages()}
        </main>
    );
}