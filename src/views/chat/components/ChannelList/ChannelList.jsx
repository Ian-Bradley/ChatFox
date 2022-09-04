import React, { useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SIMPLE_BAR_STYLES } from 'Styles/common.js';

// COMPONENTS
import { Header, List, OpenSearch, SearchBar, AddChannel, SearchInput } from './styles.js';
import IconButton from 'Common/Buttons/IconButton.jsx';
import SearchSVG from 'Assets/icons/search.svg.js';
import PlusSVG from 'Assets/icons/plus.svg.js';
import Channel from '../Channel/Channel.jsx';
import SimpleBar from 'simplebar-react';

// REDUX
import { setModalActive } from 'Redux/slices/modals.slice.js';

// UTIL
import { debounce, escapeString } from 'Util/helpers/functions.js';
import { DEBOUNCE_DELAY } from 'Util/helpers/constants.js';

export default function listRef(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const channels = useSelector((state) => {
        return state['channels'].channels;
    });

    // Hooks
    const [searchOpen, setSearchOpen] = useState();
    const searchRef = useRef();
    const listRef = useRef();

    /*================================================
        BLOCK: SEARCHING
    ==================================================*/
    // const REGEX_IMAGE = /\.( gif|jp?g|png|svg|bmp|tiff|bat )$/i;
    // const REGEX_USERNAME = /[^A-Za-z0-9\-\_]+/g;

    const search = (list, searchValue) => {
        console.log('VALUE: ', searchValue);
        const REGEX_STRING = `/(${searchValue})/gi`;
        console.log('REGEX STRING: ', REGEX_STRING);
        REGEX_SEARCH = escapeString(REGEX_STRING);
        console.log('REGEX: ', REGEX_SEARCH);
        let REGEX_SEARCH = new RegExp(REGEX_STRING);
        console.log('REGEX: ', REGEX_SEARCH);




    };

    /*================================================*/
    /*================================================*/

    const onSearch = (e) => {
        if (e.target.value) {
            // TODO: confirm debounce is working
            // debounce(search(channels, e.target.value), DEBOUNCE_DELAY, false);
            debounce(search(channels, e.target.value), 1000, false); // NOTE: testing
        }
    };

    /*================================================*/
    /*================================================*/

    const onSearchToggle = (e) => {
        // console.log(searchRef);
        // TODO: refine to use ref height (offsetheight or clientheight) instead of -37px/-36px
        !searchOpen ? searchRef.current.children[0].focus() : searchRef.current.children[0].blur();
        // console.log(listRef);
        !searchOpen
            ? (listRef.current.style.marginTop = '0')
            : (listRef.current.style.marginTop = '-36px');
        setSearchOpen(!searchOpen);
    };

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onAddChannel = (e) => {
        dispatch(setModalActive('addChannel'));
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
                    <IconButton onClick={onSearchToggle} icon={SearchSVG} />
                </OpenSearch>
                Channels
                <AddChannel>
                    <IconButton onClick={onAddChannel} icon={PlusSVG} />
                </AddChannel>
            </Header>
            <SearchBar ref={searchRef} open={searchOpen}>
                <SearchInput onChange={onSearch} placeholder={'Search channels'}></SearchInput>
            </SearchBar>
            <List ref={listRef}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{renderChannels()}</SimpleBar>
            </List>
        </>
    );
}
