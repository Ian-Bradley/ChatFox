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
import { escapeRegex, normalizeString } from 'Util/helpers/functions.js';

export default function ChannelList(props) {
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

    /*================================================
        BLOCK: SEARCHING
    ==================================================*/

    const search = (list, searchValue) => {
        // TODO: regex returns incorrectly (sometimes)
        console.log('========REGEX========');
        searchValue = normalizeString(searchValue);
        const REGEX_SEARCH = new RegExp(`(${escapeRegex(searchValue)})`, 'gi');
        console.log(REGEX_SEARCH);
        list.map((item) => {
            let compareValue = normalizeString(item.name);
            if (REGEX_SEARCH.test(compareValue)) {
                console.log('POSITIVE => ', compareValue);
                document.querySelector(`[data-channel='${item.name}']`).classList.remove('hidden');
            } else {
                console.log('NEGATIVE => ', compareValue);
                document.querySelector(`[data-channel='${item.name}']`).classList.add('hidden');
            }
        });
    };

    /*================================================*/
    /*================================================*/

    const onSearch = (e) => {
        e.target.value
            ? search(channels, e.target.value)
            : document.querySelectorAll('[data-channel]').forEach((element) => {
                  element.classList.remove('hidden');
              });
    };

    /*================================================*/
    /*================================================*/

    const onSearchToggle = (e) => {
        !searchOpen ? searchRef.current.children[0].focus() : searchRef.current.children[0].blur();
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
            <List open={searchOpen}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{renderChannels()}</SimpleBar>
            </List>
        </>
    );
}
