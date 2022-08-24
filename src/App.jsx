import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useSocket } from 'Util/api/websocket.js';

// COMPONENTS
import ErrorPage from 'Views/error/Error.jsx';
import AuthPage from 'Views/auth/Auth.jsx';
import ChatPage from 'Views/chat/Chat.jsx';
import { ContainerApp } from './styles.js';
import Dev from 'Shared/Dev/Dev.jsx';

// REDUX
import { incrementUserTotal, decrementUserTotal } from 'Redux/slices/userTotal.slice.js';
import { setName, setNickname, setColor } from 'Redux/slices/user.slice.js';
import { setSocketClosed } from 'Redux/slices/socket.slice.js';
import { addMessage } from 'Redux/slices/messages.slice.js';
import { addLogItem } from 'Redux/slices/log.slice.js';
import {
    addUser,
    removeUser,
    setUserName,
    setUserNickname,
    setUserColor,
} from 'Redux/slices/users.slice.js';

export default function App(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
    });
    const socketReady = useSelector((state) => {
        return state['socket'].socket;
    });

    // Hooks
    const socket = useSocket();

    /*================================================
        BLOCK: HOOK - WEBSOCKET
    ==================================================*/

    useEffect(() => {
        console.log('---------- USE-EFFECT - WebSocket - APP ----------');

        /*================================================
            INNER: > WS - OPENING
        ==================================================*/

        socket.onopen = (e) => {
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>');
        };

        /*================================================
            INNER: > WS - MESSAGES
        ==================================================*/

        if (socketReady) {
            socket.onmessage = async (messageData) => {
                const updateData = JSON.parse(messageData.data);
                console.log('>>>>>>>>> MESSAGE RECIEVED - ' + updateData.type + ' >>>>>>>>>');

                try {
                    switch (updateData.type) {
                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => connectionReady
                        case 'connectionReady': {
                            console.log('======= START - MESSAGE - connectionReady =======');

                            // ==> Set messages
                            console.log('==> Set messages');
                            if (!(updateData.messages === undefined) && updateData.messages.length) {
                                dispatch(setMessages(updateData.messages));
                            }

                            // ==> Set users
                            console.log('==> Set users');
                            if (!(updateData.users === undefined) && updateData.users.length) {
                                dispatch(setUsers(updateData.users));
                                dispatch(setUserTotal(updateData.users.length + 1)); // + 1 for current user
                            }
                            console.log();

                            console.log('==> Navigate');
                            // navigate('/room', { replace: false }); // DEV
                            // navigate('/room', { replace: true }); // PROD
                            console.log('======= END - MESSAGE - connectionReady =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => userConnected
                        case 'userConnected': {
                            console.log('======= START - MESSAGE - userConnected =======');
                            dispatch(addUser(updateData.user));
                            dispatch(addLogItem(updateData.message));
                            dispatch(incrementUserTotal());
                            console.log('======= END - MESSAGE - userConnected =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => userDisconnected
                        case 'userDisconnected': {
                            console.log('======= START - MESSAGE - userDisconnected =======');
                            dispatch(removeUser(updateData.userID));
                            dispatch(addLogItem(updateData.message));
                            dispatch(decrementUserTotal());
                            console.log('======= END - MESSAGE - userDisconnected =======');
                            // break
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateUserName
                        case 'updateUserName': {
                            console.log('======= START - MESSAGE - updateUserName =======');
                            if (updateData.user.id === user.id) {
                                dispatch(setName(updateData.newName));
                            } else {
                                dispatch(setUserName({ id: updateData.user, name: updateData.newName }));
                            }
                            dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - updateUserName =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateUserNickame
                        case 'updateUserNickame': {
                            console.log('======= START - MESSAGE - updateUserNickname =======');
                            if (updateData.user.id === user.id) {
                                dispatch(setNickname(updateData.newNickname));
                            } else {
                                dispatch( setUserNickname({id: updateData.user, nickname: updateData.newNickname}));
                            }
                            dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - updateUserNickname =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateUserColor
                        case 'updateUserColor': {
                            console.log('======= START - MESSAGE - updateUserColor =======');
                            if (updateData.user.id === user.id) {
                                dispatch(setColor(updateData.newColor));
                            } else {
                                dispatch(setUserColor({id: updateData.user, color: updateData.newColor}));
                            }
                            dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - updateUserColor =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateAddChannel
                        case 'updateAddChannel': {
                            console.log('======= START - MESSAGE - updateAddChannel =======');
                            updateData.id = uuidv4();
                            // dispatch(  )
                            // serverData.addChannel( updateData.channel )
                            dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateAddChannel >>>>>>>>>');
                            console.log('======= END MESSAGE - updateAddChannel =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateDeleteChannel
                        case 'updateDeleteChannel': {
                            console.log('======= START - MESSAGE - updateDeleteChannel =======');
                            updateData.id = uuidv4();
                            // serverData.deleteChannel( updateData.channelID )
                            dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateDeleteChannel >>>>>>>>>');
                            console.log('======= END MESSAGE - updateDeleteChannel =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateChannelName
                        case 'updateChannelName': {
                            console.log('======= START - MESSAGE - updateChannelName =======');
                            updateData.id = uuidv4();
                            // serverData.setChannelName( updateData.channel, updateData.newName )
                            dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelName >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelName =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateChannelPublic
                        case 'updateChannelPublic': {
                            console.log('======= START - MESSAGE - updateChannelPublic =======');
                            updateData.id = uuidv4();
                            // serverData.setChannelPublic( updateData.channel )
                            dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelPublic >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelPublic =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateChannelPrivate
                        case 'updateChannelPrivate': {
                            console.log('======= START - MESSAGE - updateChannelPrivate =======');
                            updateData.id = uuidv4();
                            // serverData.setChannelPrivate( updateData.channel )
                            // serverData.setChannelPassword( updateData.channel, updateData.password )
                            dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelPrivate >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelPrivate =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => updateChannelPassword
                        case 'updateChannelPassword': {
                            console.log('======= START - MESSAGE - updateChannelPassword =======');
                            updateData.id = uuidv4();
                            // serverData.setChannelPassword( updateData.channel, updateData.password )
                            dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelPassword >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelPassword =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        // HANDLER: => newMessage
                        case 'newMessage': {
                            console.log('======= START - MESSAGE - newMessage =======');
                            dispatch(addMessage(updateData.message));
                            console.log('======= END - MESSAGE - newMessage =======');
                            break;
                        }

                        /*================================================*/
                        /*================================================*/

                        default:
                    }
                } catch (err) {
                    console.error(err);
                }
            };
        }

        /*================================================
            INNER: > WS - CLOSING
        ==================================================*/

        socket.onclose = (e) => {
            dispatch(setSocketClosed());
            // TODO: check if neeeded
            // setTimeout(() => {
            //     setWS(new WebSocket(WS_URL));
            // }, 1000);
        };

        /*================================================
            INNER: > WS - ERRORS
        ==================================================*/

        socket.onerror = (err) => {
            console.log('WebSocket encountered error: ', err.message, ' --> Closing socket');
            dispatch(setSocketClosed());
            socket.close();
        };

        /*================================================
            INNER: > WS - UNMOUNTING
        ==================================================*/

        return () => {
            socket.close();
        };
    }, [socket]);

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <>
            <ContainerApp>
                <Router>
                    <Routes>
                        <Route path='/' element={<AuthPage />}></Route>
                        <Route path='/room' element={<ChatPage />}></Route>
                        <Route path='*' element={<ErrorPage />}></Route>
                    </Routes>
                </Router>
            </ContainerApp>

            <Dev />
        </>
    );
}
