import React from 'react';
import Message from "../Message/Message.jsx";
import './MessageList.scss';

/**
 * @props messages (array) List of all messages
 */

export default function MessageList ( props )
{

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
            return (
                props.messages.map(( message, index ) =>
                    <Message
                        key={index}
                        message={message}
                    />
                )
            )
        }
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className="message-list">
            {display_messages()}
        </main>
    );
}