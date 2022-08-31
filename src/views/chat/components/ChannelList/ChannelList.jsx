import React, { useState, useCallback, useRef } from 'react';
import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import { useSocket } from 'Util/api/websocket.js';
import { useSelector } from 'react-redux';

// COMPONENTS
import SimpleBar from 'simplebar-react';
import Channel from '../Channel/Channel.jsx';
import PlusSVG from 'Assets/icons/plus.svg.js';
import SearchSVG from 'Assets/icons/search.svg.js';
import IconButton from 'Shared/Buttons/IconButton.jsx';
import { Container, Header, List, OpenSearch, SearchBar, AddChannel, SearchInput } from './styles.js';

/**
 * @props clickChannel (Function) Clicking on a chat channel
 */

export default function listRef(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    // Hooks
    const [searchOpen, setsearchOpen] = useState(false);
    const listRef = useRef();
    const searchRef = useRef();
    const socket = useSocket();
    
    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onSearchButton = (e) => {
        !searchOpen ? searchRef.current.children[0].focus() : searchRef.current.children[0].blur();
        !searchOpen ? listRef.current.style.marginTop = '0' : listRef.current.style.marginTop = '-36px';
        setsearchOpen(!searchOpen);
    };

    /*================================================*/
    /*================================================*/

    const onAddChannel = (e) => {
        // NOTE: testing
        // let newUpdate = {
        //     type: 'addChannel',
        //     channel: {
        //         name: 'test',
        //         active: false,
        //         locked: false,
        //         password: '',
        //         users: [],
        //     },
        // };
        // socket.send(JSON.stringify(newUpdate));
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
            <Header>
                <OpenSearch>
                    <IconButton onClick={onSearchButton} icon={SearchSVG} />
                </OpenSearch>
                Channels
                <AddChannel>
                    <IconButton onClick={onAddChannel} icon={PlusSVG} />
                </AddChannel>
            </Header>
            <SearchBar ref={searchRef} open={searchOpen}>
                <SearchInput placeholder={'Search channels'} ref={searchRef}></SearchInput>
            </SearchBar>
            <List ref={listRef}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{renderChannels()}</SimpleBar>
            </List>
        </Container>
    );
}
