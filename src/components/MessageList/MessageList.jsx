import React from 'react';
import Message from '../Message/Message.jsx';
import './MessageList.scss';

/**
 * @props messages (array)     List of all messages
 * @props preferences (object) App+Display info
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
                        preferences={props.preferences}
                    />
                )
            )
        }
    }

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className='message-list'>
            {display_messages()}
        </main>
    );
}