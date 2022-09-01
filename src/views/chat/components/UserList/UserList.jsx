import React, { useState, useCallback, useRef } from 'react';
import { SIMPLE_BAR_STYLES } from 'Styles/common.js';
import { useSelector } from 'react-redux';

// COMPONENTS
import User from '../User/User.jsx';
import SimpleBar from 'simplebar-react';
import SearchSVG from 'Assets/icons/search.svg.js';
import IconButton from 'Shared/Buttons/IconButton.jsx';
import { List, Header, OpenSearch, UserTotal, SearchBar, SearchInput } from './styles.js';

/**
 * @props clickName (function) Clicking on a user name
 */

export default function listRef(props) {
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
    const listRef = useRef();

    /*=================================================
        BLOCK: EVENTS
    ===================================================*/

    const onSearchButton = (e) => {
        // TODO: refine to use ref height (offsetheight or clientheight) instead of -37px
        // console.log(searchRef);
        !searchOpen ? searchRef.current.children[0].focus() : searchRef.current.children[0].blur();
        // console.log(listRef);
        !searchOpen
            ? (listRef.current.style.marginTop = '0')
            : (listRef.current.style.marginTop = '-36px');
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
                    <IconButton onClick={onSearchButton} icon={SearchSVG} />
                </OpenSearch>
                Users
                <UserTotal>{users.length}</UserTotal>
            </Header>
            <SearchBar ref={searchRef} open={searchOpen}>
                <SearchInput placeholder={'Search users'}></SearchInput>
            </SearchBar>
            <List ref={listRef}>
                <SimpleBar style={SIMPLE_BAR_STYLES}>{renderUsers()}</SimpleBar>
            </List>
        </>
    );
}
