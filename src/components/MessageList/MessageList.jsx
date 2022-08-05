import React, { useEffect, useState, useRef } from 'react';
import Message from '../Message/Message.jsx';
import './MessageList.scss';

/**
 * @props click_name (function) Clicking on a user name
 */

export default function MessageList ( props )
{

    /*======================================
        ANCHOR: STATES
    ========================================*/

    const [messages, setMessages] = useState([]); // get from mongoDB based on channelID

    /*================================================
        ANCHOR: HOOKS
    ==================================================*/

    const list = useRef(null);
    useEffect(() => {
        list.current.scrollTop = list.current.scrollHeight;
    });

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/


    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const display_messages = () =>
    {
        if ( !( messages === undefined ) && ( messages.length ) )
        {
            let messageArray = [];
            for (let i = messages.length-1; i > 0; i--)
            {
                messageArray.push(
                    <Message
                        key={i}
                        message={messages[i]}
                        preferences={props.preferences}
                        click_name={props.click_name}
                    />
                );
            }
            return messageArray;
        }
    }

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <main
            className='message-list'
            ref={list}
        >
            {display_messages()}
        </main>
    );
}