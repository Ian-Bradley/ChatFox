import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// COMPONENTS
import User from '../User/User.jsx';
import SearchSVG from 'Assets/icons/search.svg.js';
import { Container, Top, Bottom, Total, Search, SearchButton, SimpleBarStyles } from './styles.js';

/**
 * @props clickName (function) Clicking on a user name
 */

export default function UserList(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    const users = useSelector((state) => {
        return state['users'].users;
    });
    const userTotal = useSelector((state) => {
        return state['userTotal'].userTotal;
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

    // const renderUsers = () => {
    //     if (!(users === undefined) && users.length) {
    //         let usersArray = [];
    //         for (let i = 0; i < users.length; i++) {
    //             usersArray.push(<User key={i} user={users[i]} clickName={props.clickName} />);
    //         }
    //         return usersArray;
    //     }
    // };

    // NOTE: testing
    const renderUsers = useCallback(() => {
        if (!(users === undefined) && users.length) {
            [...Array(users.length)].map((x, i) => (
                <User key={i} user={users[i]} clickName={props.clickName} />
            ));
        }
    });

    /*=================================================
        BLOCK: COMPONENTS
    ===================================================*/

    return (
        <Container>
            <Top>
                <Total>{userTotal}</Total>
                <Search>
                    {/* <SearchButton onClick={onSearchButton}>{IconSearch}</SearchButton> */}
                </Search>
            </Top>
            <SimpleBar style={SimpleBarStyles}>{renderUsers()}</SimpleBar>
        </Container>
    );
}
