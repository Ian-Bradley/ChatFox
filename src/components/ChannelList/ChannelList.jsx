import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
// import Channel from '../Channel/Channel.jsx';
import Button from '../Button/Button.jsx';
import IconSearch from '../../images/icons/search.svg';

// CSS
import './ChannelList.scss';

/**
 * @props click_channel (function) Clicking on a chat channel
 */
{/* <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' /> */}

export default function UserList ( props )
{
    /*======================================
        ANCHOR: STATES
    ========================================*/

    const channels = useSelector( ( state ) => { return state['channels'].channels; } );

    /*=================================================
        ANCHOR: INTERACTIONS
    ===================================================*/

    const on_search_button = e =>
    {
        console.log('===> on_search_button');
        console.log('===> END - on_search_button');
    }

    /*=================================================
        ANCHOR: DISPLAYING
    ===================================================*/

    const display_channels = () =>
    {
        // if ( !( channels === undefined ) && ( channels.length ) )
        // {
        //     let channelsArray = [];
        //     for (let i = 0; i < channels.length; i++)
        //     {
        //         channelsArray.push(
        //             <Channel
        //                 key={i}
        //                 channel={channels[i]}
        //                 click_channel={props.click_channel}
        //             />
        //         );
        //     }
        //     return channelsArray;
        // }
    }

    /*=================================================
        ANCHOR: COMPONENTS
    ===================================================*/

    return (
        <main className='user-list'>
            <div className='user-top'>
                <span className='user-title'>Users</span>
                <div className='user-search-button'>
                    <Button
                        btnClasses  ={'search-button'}
                        btnFunction ={on_search_button}
                        btnIcon     ={IconSearch}
                    />
                </div>
            </div>
            <div className='user-bottom'>
                {display_channels()}
            </div>
        </main>
    );
}