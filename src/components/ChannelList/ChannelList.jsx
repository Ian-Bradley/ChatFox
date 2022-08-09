import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Channel from '../Channel/Channel.jsx';
import Button from '../Button/Button.jsx';
import IconSearch from '../../images/icons/search.svg';

// CSS
import './ChannelList.scss';

/**
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function UserList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    /*=================================================
        BLOCK: INTERACTIONS
    ===================================================*/

    const onSearchButton = (e) => {
        console.log('===> onSearchButton');
        console.log('===> END - onSearchButton');
    };

    /*=================================================
        BLOCK: DISPLAYING
    ===================================================*/

    const displayChannels = () => {
        if (!(channels === undefined) && channels.length) {
            let channelsArray = [];
            for (let i = 0; i < channels.length; i++) {
                channelsArray.push(
                    <Channel key={i} channel={channels[i]} clickChannel={props.clickChannel} />
                );
            }
            return channelsArray;
        }
    };

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <main className='channel-list'>
            <div className='channel-top'>
                <div className='channel-search-button'>
                    <Button
                        btnClasses={'search-button'}
                        btnFunction={onSearchButton}
                        btnIcon={IconSearch}
                    />
                </div>
            </div>
            <div className='channel-bottom'>{displayChannels()}</div>
        </main>
    );
}