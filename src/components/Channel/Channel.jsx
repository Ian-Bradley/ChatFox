import React from 'react';
import './Channel.scss';

/**
 * @props channel (Object)
    id: (String)
    name: (String)
    active: (Boolean)
    locked: (Boolean)
    password: (String)
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function Message(props) {
    /*================================================
        BLOCK: INTERACTIONS
    ==================================================*/

    const onClickChannel = (e) => {
        console.log('===> onClickChannel');
        props.clickChannel(e);
        console.log('===> END - onClickChannel');
    };

    /*================================================
        BLOCK: DISPLAYING
    ==================================================*/

    // TODO: display classes for active and locked

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <main className='container-channel'>
            <div className='channel'>
                <span className={'channel-name'} onClick={onClickChannel}>
                    {props.channel.name}
                </span>
            </div>
        </main>
    );
}
