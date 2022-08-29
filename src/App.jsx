import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from 'Util/api/websocket.js';
import React, { useEffect } from 'react';

// COMPONENTS
import PageError from 'Views/error/Error.jsx';
import PageAuth from 'Views/auth/Auth.jsx';
import PageChat from 'Views/chat/Chat.jsx';
import { ContainerApp } from './styles.js';
import Dev from 'Shared/Dev/Dev.jsx';

// REDUX
import { setUserTotal, incrementUserTotal, decrementUserTotal } from 'Redux/slices/userTotal.slice.js';
import { setName, setNickname, setColor } from 'Redux/slices/user.slice.js';
import { setSocketClosed } from 'Redux/slices/socket.slice.js';
import { addMessage } from 'Redux/slices/messages.slice.js';
// import { addLogItem } from 'Redux/slices/log.slice.js';
import {
    addUser,
    removeUser,
    setUsers,
    setUserName,
    setUserNickname,
    setUserColor,
} from 'Redux/slices/users.slice.js';
import {
    addChannel,
    deleteChannel,
    setChannels,
    setChannelName,
    setChannelDescription,
    setChannelPrivate,
    setChannelPublic,
    setChannelPassword,
    addUserToChannel,
    removeUserFromChannel,
} from 'Redux/slices/channels.slice.js';

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
            socket.onmessage = (messageData) => {
                const updateData = JSON.parse(messageData.data);
                console.log('>>>>>>>>> MESSAGE RECIEVED - ' + updateData.type + ' >>>>>>>>>');

                try {
                    switch (updateData.type) {
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => connectionReady (self)
                        case 'connectionReady': {
                            console.log('======= START - MESSAGE - connectionReady =======');

                            // ==> Set channels
                            console.log('==> Set channels');
                            if (!(updateData.channels === undefined) && updateData.channels.length) {
                                dispatch(setChannels(updateData.channels));
                            }

                            // ==> Set users
                            console.log('==> Set users');
                            if (!(updateData.users === undefined) && updateData.users.length) {
                                dispatch(setUsers(updateData.users));
                                dispatch(setUserTotal(updateData.users.length + 1)); // + 1 for current user
                            }

                            console.log('======= END - MESSAGE - connectionReady =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => userConnected (other)
                        case 'userConnected': {
                            console.log('======= START - MESSAGE - userConnected =======');
                            dispatch(addUser(updateData.user));
                            dispatch(incrementUserTotal());
                            // dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - userConnected =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => userDisconnected (other)
                        case 'userDisconnected': {
                            console.log('======= START - MESSAGE - userDisconnected =======');
                            dispatch(removeUser(updateData.name));
                            dispatch(decrementUserTotal());
                            // dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - userDisconnected =======');
                            // break
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateUserName
                        case 'updateUserName': {
                            console.log('======= START - MESSAGE - updateUserName =======');
                            if (updateData.name === user.name) {
                                dispatch(setName(updateData.newName));
                            } else {
                                dispatch(setUserName({ name: updateData.name, newName: updateData.newName }));
                            }
                            // dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - updateUserName =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateUserNickame
                        case 'updateUserNickame': {
                            console.log('======= START - MESSAGE - updateUserNickname =======');
                            if (updateData.name === user.name) {
                                dispatch(setNickname(updateData.newNickname));
                            } else {
                                dispatch( setUserNickname({name: updateData.name, nickname: updateData.newNickname}));
                            }
                            // dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - updateUserNickname =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateUserColor
                        case 'updateUserColor': {
                            console.log('======= START - MESSAGE - updateUserColor =======');
                            if (updateData.name === user.name) {
                                dispatch(setColor(updateData.newColor));
                            } else {
                                dispatch(setUserColor({name: updateData.name, color: updateData.newColor}));
                            }
                            // dispatch(addLogItem(updateData.message));
                            console.log('======= END - MESSAGE - updateUserColor =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => addChannel
                        case 'addChannel': {
                            console.log('======= START - MESSAGE - addChannel =======');
                            dispatch(addChannel(updateData.channel));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - addChannel >>>>>>>>>');
                            console.log('======= END MESSAGE - addChannel =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => deleteChannel
                        case 'deleteChannel': {
                            console.log('======= START - MESSAGE - deleteChannel =======');
                            dispatch(deleteChannel(updateData.channelName));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - deleteChannel >>>>>>>>>');
                            console.log('======= END MESSAGE - deleteChannel =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateChannelName
                        case 'updateChannelName': {
                            console.log('======= START - MESSAGE - updateChannelName =======');
                            dispatch(setChannelName(updateData.channelName, updateData.newName));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelName >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelName =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateChannelDescription
                        case 'updateChannelDescription': {
                            console.log('======= START - MESSAGE - updateChannelDescription =======');
                            dispatch(setChannelDescription(updateData.channelName, updateData.description));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelDescription >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelDescription =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateChannelPublic
                        case 'updateChannelPublic': {
                            console.log('======= START - MESSAGE - updateChannelPublic =======');
                            dispatch(setChannelPublic(updateData.channelName));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelPublic >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelPublic =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateChannelPrivate
                        case 'updateChannelPrivate': {
                            console.log('======= START - MESSAGE - updateChannelPrivate =======');
                            dispatch(setChannelPrivate(updateData.channelName, updateData.password));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelPrivate >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelPrivate =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => updateChannelPassword
                        case 'updateChannelPassword': {
                            console.log('======= START - MESSAGE - updateChannelPassword =======');
                            dispatch(setChannelPassword(updateData.channelName, updateData.password));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - updateChannelPassword >>>>>>>>>');
                            console.log('======= END MESSAGE - updateChannelPassword =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => addUserToChannel
                        case 'addUserToChannel': {
                            console.log('======= START - MESSAGE - addUserToChannel =======');
                            dispatch(addUserToChannel(updateData.channelName, updateData.userName));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - addUserToChannel >>>>>>>>>');
                            console.log('======= END MESSAGE - addUserToChannel =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => removeUserFromChannel
                        case 'removeUserFromChannel': {
                            console.log('======= START - MESSAGE - removeUserFromChannel =======');
                            dispatch(removeUserFromChannel(updateData.channelName, updateData.userName));
                            // dispatch(addLogItem(updateData.message));
                            console.log('>>>>>>>>> MESSAGE SENT - removeUserFromChannel >>>>>>>>>');
                            console.log('======= END MESSAGE - removeUserFromChannel =======');
                            break;
                        }
                        /*================================================*/
                        /*================================================*/
                        // HANDLER: => newMessage
                        case 'newMessage': {
                            // console.log('======= START - MESSAGE - newMessage =======');
                            dispatch(addMessage(updateData.message));
                            // console.log('======= END - MESSAGE - newMessage =======');
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
                        <Route path='/' element={<PageAuth />}></Route>
                        <Route path='/room' element={<PageChat />}></Route>
                        <Route path='*' element={<PageError />}></Route>
                    </Routes>
                </Router>
            </ContainerApp>

            <Dev />
        </>
    );
}
