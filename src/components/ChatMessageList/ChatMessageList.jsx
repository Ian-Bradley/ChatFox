import React from 'react';
import ChatMessage from "../ChatMessage/ChatMessage.jsx";
import './ChatMessageList.scss';

/**
 * @props messages (array) List of all messages
 */

export default function ChatMessageList ( props )
{

    /*======================================
        RENDER FUNCTIONS - Interactions
    ========================================*/


    /*======================================
        RENDER FUNCTIONS - Displaying
    ========================================*/

    const display_messages = props.messages.map(message =>
        <ChatMessage
            key={message.id}
            messages={message}
            // calculateTimeSince={props.calculateTimeSince}
            // timestampDisplay={props.timestampDisplay}
        />
    );

    /*======================================
        COMPONENTS
    ========================================*/

    return (
        <main className="messages">
            {display_messages()}
        </main>
    );
}