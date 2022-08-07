import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// COMPONENETS
import Message from '../Message/Message.jsx'

// CSS
import './MessageList.scss'

/**
 * @props clickName (function) Clicking on a user name
 */

export default function MessageList ( props )
{

    /*================================================
        ANCHOR: STATES
    ==================================================*/

    const messages = useSelector( ( state ) => { return state['messages'].messages } )

    /*================================================
        ANCHOR: HOOKS
    ==================================================*/

    const list = useRef(null)
    useEffect( () =>
    {
        list.current.scrollTop = list.current.scrollHeight
    })

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/


    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    const displayMessages = () =>
    {
        if ( !( messages === undefined ) && ( messages.length ) )
        {
            let messageArray = []
            for (let i = messages.length-1; i > 0; i--)
            {
                messageArray.push(
                    <Message
                        key={i}
                        message={messages[i]}
                        clickName={props.clickName}
                    />
                )
            }
            return messageArray
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
            {displayMessages()}
        </main>
    )
}