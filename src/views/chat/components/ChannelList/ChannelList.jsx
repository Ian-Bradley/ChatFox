import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import SimpleBar from 'simplebar-react';
import Channel from '../Channel/Channel.jsx';
import { Container, Top } from './styles.js';

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

    const renderChannels = useCallback(() => {
        if (!(channels === undefined) && channels.length) {
            return [...Array(channels.length)].map((x, i) => (
                <Channel key={i} channel={channels[i]} clickChannel={props.clickChannel} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <Container>
            <Top>Channels</Top>
            <SimpleBar style={SIMPLE_BAR_STYLES}>{renderChannels()}</SimpleBar>
        </Container>
    );
}
