import React from 'react'
import { useSelector } from 'react-redux'
import './ChatBar.scss'

/**
 * @props sendMessage (function)
 */

export default function ChatBar ( props )
{
    /*================================================
        ANCHOR: STATES
    ==================================================*/

    const user = useSelector( ( state ) => { return state['user'].user } )

    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const onTypingMessage = e =>
    {
        if ( ( e.keyCode === 13 ) && ( e.target.value !== '' ) )
        {
            props.sendMessage({
                    type: 'message',
                    name: user.name,
                    time: new Date().toGMTString(),
                    color: user.color,
                    content: e.target.value,
                })
            e.target.value = ''
        }
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/


    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/

    return (
        <main className='container-chatbar'>
            <div className='chatbar'>
                <input
                    className='chatbar-input'
                    onKeyUp={onTypingMessage}
                    placeholder='Type your message here'
                />
            </div>    
        </main>
    )
    
}