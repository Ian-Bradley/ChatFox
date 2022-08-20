import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useSocket } from '../util/websocket.js';
import { useNavigate } from 'react-router-dom';

// COMPONENETS
import NavBar from './components/NavBar/NavBar.jsx';
import ChatBar from './components/ChatBar/ChatBar.jsx';
import UserList from './components/UserList/UserList.jsx';
import ChannelList from './components/ChannelList/ChannelList.jsx';
import MessageList from './components/MessageList/MessageList.jsx';

// STYLED COMPONENTS
import { ContainerNav, ContainerBody, ContainerChat, ContainerSidebar } from './styles.js';

export default function Chat(props) {
    /*================================================
        BLOCK: STATES
    ==================================================*/

    // Redux
    const user = useSelector((state) => {
        return state['user'].user;
    });
    
    // Hooks
    const navigate = useNavigate();

    /*================================================
        BLOCK: HOOKS
    ==================================================*/

    useEffect(() => {
        console.log('---------- USE-EFFECT - Logged-In Redirect ----------');
        if(!user.loggedIn) {
            console.log('NOT LOGGED IN');
            // navigate('/', { replace: true });
        }

    });

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
            <ContainerNav>
                <NavBar />
            </ContainerNav>
            <ContainerBody>
                <ContainerSidebar>
                    <ChannelList clickChannel={clickChannel} />
                </ContainerSidebar>
                <ContainerChat>
                    <MessageList clickName={clickName} />
                    <ChatBar />
                </ContainerChat>
                <ContainerSidebar>
                    <UserList clickName={clickName} />
                </ContainerSidebar>
            </ContainerBody>
        </>
    );
}
