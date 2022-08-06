import React from 'react'
import './Channel.scss'

/**
 * @props channel (Object)
    id: (String)
    name: (String)
    active: (Boolean)
    locked: (Boolean)
    password: (String)
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function Message ( props )
{
    /*================================================
        ANCHOR: INTERACTIONS
    ==================================================*/

    const on_clickChannel = e =>
    {
        console.log('===> on_clickChannel')
        props.clickChannel(e)
        console.log('===> END - on_clickChannel')
    }

    /*================================================
        ANCHOR: DISPLAYING
    ==================================================*/

    // TODO: display classes for active and locked

    /*================================================
        ANCHOR: COMPONENTS
    ==================================================*/
    
    return (
        <main className='container-channel'>
            <div className='channel'>
                <span className={'channel-name'} onClick={on_clickChannel}>
                    {props.channel.name}
                </span>
            </div>
        </main>
    )
}