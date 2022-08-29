import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import { useSocket } from 'Util/api/websocket.js';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import SimpleBar from 'simplebar-react';
import Channel from '../Channel/Channel.jsx';
import PlusSVG from 'Assets/icons/plus.svg.js';
import SearchSVG from 'Assets/icons/search.svg.js';
import IconButton from 'Shared/Buttons/IconButton.jsx';
import { Container, Top, Search, AddChannel } from './styles.js';

/**
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function ChannelList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    // Hooks
    const socket = useSocket();

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onSearchButton = (e) => {
        console.log('===> onSearchButton');
        console.log('===> END - onSearchButton');
    };

    /*================================================*/
    /*================================================*/

    const onAddChannel = (e) => {
        console.log('===> onAddChannel');
        let newUpdate = {
            type: 'addChannel',
            channel: {
                name: 'test',
                active: false,
                locked: false,
                password: '',
                users: [],
            }
        };
        socket.send(JSON.stringify(newUpdate));
        console.log('===> END - onAddChannel');
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
            <Top>
                <Search>
                    <IconButton onClick={onSearchButton} icon={SearchSVG} />
                </Search>
                Channels
                <AddChannel>
                    <IconButton onClick={onAddChannel} icon={PlusSVG} />
                </AddChannel>
            </Top>
            <SimpleBar style={SIMPLE_BAR_STYLES}>{renderChannels()}</SimpleBar>
        </Container>
    );
}
