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
import { Header, List, OpenSearch, SearchBar, AddChannel, SearchInput } from './styles.js';

export default function listRef(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    // Hooks
    const [searchOpen, setSearchOpen] = useState(false);
    const socket = useSocket();
    const searchRef = useRef();
    const listRef = useRef();

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onSearchButton = (e) => {
        // console.log(searchRef);
        !searchOpen ? searchRef.current.children[0].focus() : searchRef.current.children[0].blur();
        // console.log(listRef);
        !searchOpen
            ? (listRef.current.style.marginTop = '0')
            : (listRef.current.style.marginTop = '-36px');
        setSearchOpen(!searchOpen);
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
                <Channel key={i} channel={channels[i]} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <>
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
                <SearchInput placeholder={'Search channels'}></SearchInput>
            </SearchBar>
            <List ref={listRef}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{renderChannels()}</SimpleBar>
            </List>
        </>
    );
}
