import React, { useState, useCallback, useRef } from 'react';
import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import { useSelector } from 'react-redux';

// COMPONENTS
import { List, Header, OpenSearch, UserTotal, SearchBar, SearchInput } from './styles.js';
import IconButton from 'Common/Buttons/IconButton.jsx';
import SearchSVG from 'Assets/icons/search.svg.js';
import SimpleBar from 'simplebar-react';
import User from '../User/User.jsx';

// UTIL
import { escapeRegex, normalizeString } from 'Util/helpers/functions.js';

/**
 * @props clickName (function) Clicking on a user name
 */

export default function UserList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const users = useSelector((state) => {
        return state['users'].users;
    });

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
                document.querySelector(`[data-user='${item.name}']`).classList.remove('hidden');
            } else {
                console.log('NEGATIVE => ', compareValue);
                document.querySelector(`[data-user='${item.name}']`).classList.add('hidden');
            }
        });
    };

    /*================================================*/
    /*================================================*/

    const onSearch = (e) => {
        e.target.value
            ? search(users, e.target.value)
            : document.querySelectorAll('[data-user]').forEach((element) => {
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
        BLOCK: RENDERING
    ===================================================*/

    const renderUsers = useCallback(() => {
        if (!(users === undefined) && users.length) {
            return [...Array(users.length)].map((x, i) => (
                <User key={i} user={users[i]} clickName={props.clickName} />
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
                Users
                <UserTotal>{users.length}</UserTotal>
            </Header>
            <SearchBar ref={searchRef} open={searchOpen}>
                <SearchInput onChange={onSearch} placeholder={'Search users'}></SearchInput>
            </SearchBar>
            <List open={searchOpen}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{renderUsers()}</SimpleBar>
            </List>
        </>
    );
}
