import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

// COMPONENETS
import ChannelList from './components/ChannelList/ChannelList.jsx';
import MessageList from './components/MessageList/MessageList.jsx';
import UserList from './components/UserList/UserList.jsx';
import ChatBar from './components/ChatBar/ChatBar.jsx';
import Header from './components/Header/Header.jsx';
import Modals from './components/Modals/Modals.jsx';
import { Body, Chat, Sidebar } from './styles.js';

// REDUX
import { getMessages } from 'Redux/slices/messages.slice.js';

export default function PageChat(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const LOGGED_IN = useSelector((state) => {
        return state['app'].app.loggedIn;
    });

    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /*================================================
        BLOCK: HOOKS - LOGGED IN CHECK
    ==================================================*/

    useEffect(() => {
        if (!LOGGED_IN) {
            navigate('/', { replace: true });
        }
    }, [LOGGED_IN]);

    /*================================================
        BLOCK: HOOKS - MESSAGES
    ==================================================*/

    useEffect(() => {
        console.log('---------- USE-EFFECT - MESSAGES - CHAT ----------');
        if (LOGGED_IN) {
            console.log('GETTING MESSAGES - LOUNGE ');
            dispatch(getMessages(1)); // 1 = channel id for lounge (default channel)
        }
    }, [dispatch]);

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

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <Header />
            <Body>
                <Sidebar>
                    <ChannelList />
                </Sidebar>
                <Chat>
                    <MessageList clickName={clickName} />
                    <ChatBar />
                </Chat>
                <Sidebar>
                    <UserList clickName={clickName} />
                </Sidebar>
            </Body>

            <Modals />
        </>
    );
}
