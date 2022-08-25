import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

// COMPONENETS
import ChannelList from './components/ChannelList/ChannelList.jsx';
import MessageList from './components/MessageList/MessageList.jsx';
import UserList from './components/UserList/UserList.jsx';
import ChatBar from './components/ChatBar/ChatBar.jsx';
import Header from './components/Header/Header.jsx';
import {Body, Chat, Sidebar } from './styles.js';

// UTIL
import { MODE_DEV } from 'Util/helpers/constants.js';

export default function PageChat(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const user = useSelector((state) => {
        return state['user'].user;
    });

    // Hooks
    const navigate = useNavigate();

    /*================================================
        BLOCK: HOOKS - LOGGED IN CHECK
    ==================================================*/

    useEffect(() => {
        // TODO: cookies || localstorage w/ redux-persist
        user.loggedIn ? console.log('LOGGED IN') : console.log('NOT LOGGED IN');
        if (!user.loggedIn) {
            MODE_DEV ? navigate('/', { replace: false }) : navigate('/', { replace: true });
        }
    }, [user.loggedIn]);

    /*================================================
        BLOCK: EVENTS
    ==================================================*/

    // FUNCTION: => clickName
    const clickName = (data) => {
        console.log('===> clickName');
        console.log('data: ', data);
        // TODO: name clicking
        // --> open DM + Info sidebar (OVER player list)
        // --> this sidebar will have a button to swap to DM Chat (new window, don't overwrite MessageList, just make a new one on top)
        // --> 'return to main chat' button
        // --> maybe have a 'close chat' option to reduce open windows
        console.log('===> END - clickName');
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => clickChannel
    const clickChannel = (data) => {
        console.log('===> clickChannel');
        console.log('data: ', data);
        // TODO: channel clicking
        console.log('===> END - clickChannel');
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Header />
            <Body>
                <Sidebar>
                    <ChannelList clickChannel={clickChannel} />
                </Sidebar>
                <Chat>
                    <MessageList clickName={clickName} />
                    <ChatBar />
                </Chat>
                <Sidebar>
                    <UserList clickName={clickName} />
                </Sidebar>
            </Body>
        </>
    );
}
