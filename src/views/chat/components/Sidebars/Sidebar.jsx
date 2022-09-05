import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import React, { useState,useRef } from 'react';

// COMPONENTS
import { List, Header, Left, Right, SearchBar, SearchInput } from './styles.js';
import IconButton from 'Common/Buttons/IconButton.jsx';
import SearchSVG from 'Assets/icons/search.svg.js';
import SimpleBar from 'simplebar-react';

// UTIL
import { CLASS_HIDDEN } from 'Util/helpers/constants.js';
import { escapeRegex, normalizeString } from 'Util/helpers/functions.js';

/**
 * @props type {string}
 * @props header {React Components || string || number}
 * @props list {array}
 */

export default function Sidebar(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Hooks
    const [searchOpen, setSearchOpen] = useState(false);
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
                document.querySelector(`[data-${props.type}='${item.name}']`).classList.remove(CLASS_HIDDEN);
            } else {
                console.log('NEGATIVE => ', compareValue);
                document.querySelector(`[data-${props.type}='${item.name}']`).classList.add(CLASS_HIDDEN);
            }
        });
    };

    /*================================================*/
    /*================================================*/

    const onSearch = (e) => {
        e.target.value
            ? search(props.list, e.target.value)
            : document.querySelectorAll(`[data-${props.type}]`).forEach((element) => {
                  element.classList.remove(CLASS_HIDDEN);
              });
    };

    /*================================================*/
    /*================================================*/

    const onSearchToggle = (e) => {
        !searchOpen ? searchRef.current.children[0].focus() : searchRef.current.children[0].blur();
        setSearchOpen(!searchOpen);
    };

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <>
            <Header>
                <Left>
                    <IconButton onClick={onSearchToggle} icon={SearchSVG} />
                </Left>
                {props.type + 's'}
                <Right>{props.header}</Right>
            </Header>
            <SearchBar ref={searchRef} open={searchOpen}>
                <SearchInput
                    onChange={onSearch}
                    placeholder={`Search ${props.type}s`}
                ></SearchInput>
            </SearchBar>
            <List open={searchOpen}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{props.children}</SimpleBar>
            </List>
        </>
    );
}
