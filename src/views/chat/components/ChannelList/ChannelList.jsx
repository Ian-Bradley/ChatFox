import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import Channel from '../Channel/Channel.jsx';
// import IconSearch from 'Assets/icons/search.svg';
import { Container, Top, Bottom, Search, SearchButton } from './styles.js';

/**
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function ChannelList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onSearchButton = (e) => {
        console.log('===> onSearchButton');
        console.log('===> END - onSearchButton');
    };

    /*=================================================
        BLOCK: RENDERING
    ===================================================*/

    // const renderChannels = () => {
    //     if (!(channels === undefined) && channels.length) {
    //         let channelsArray = [];
    //         for (let i = 0; i < channels.length; i++) {
    //             channelsArray.push(
    //                 <Channel key={i} channel={channels[i]} clickChannel={props.clickChannel} />
    //             );
    //         }
    //         return channelsArray;
    //     }
    // };

    // NOTE: testing
    const renderChannels = useCallback(() => {
        if (!(channels === undefined) && channels.length) {
            [...Array(channels.length)].map((x, i) => (
                <Channel key={i} channel={channels[i]} clickChannel={props.clickChannel} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <Container>
            <Top>
                <Search>
                    {/* <SearchButton onclick={onSearchButton}>{IconSearch}</SearchButton> */}
                </Search>
            </Top>
            <Bottom>{renderChannels()}</Bottom>
        </Container>
    );
}
