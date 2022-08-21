import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useSocket } from 'Util/api/websocket.js';

// COMPONENTS
import AuthPage from 'Views/auth/Auth.jsx';
import ChatPage from 'Views/chat/Chat.jsx';
import ErrorPage from 'Views/error/Error.jsx';
import { ContainerApp } from './styles.js';
import Dev from 'Shared/Dev/Dev.jsx';

// UTILS - DEV
import { generateRandomName, generateRandomColor } from 'Util/helpers/functions.js';

/*================================================
    BLOCK: REDUX ACTIONS
==================================================*/

/*================================================*/
import {
    setUserTotal,
    incrementUserTotal,
    decrementUserTotal,
} from 'Redux/slices/userTotal.slice.js';
/*================================================*/
import { setID, setName, setNickname, setColor, setLoggedIn } from 'Redux/slices/user.slice.js';
/*================================================*/
import {
    addUser,
    removeUser,
    setUsers,
    setUserName,
    setUserNickname,
    setUserColor,
} from 'Redux/slices/users.slice.js';
/*================================================*/
import { toggleTimestamps, toggle24HourTime } from 'Redux/slices/prefs.slice.js';
/*================================================*/
import {
    setChannel,
    // setName,
    setPublic,
    setPrivate,
    setPassword,
} from 'Redux/slices/channel.slice.js';
/*================================================*/
import {
    addChannel,
    deleteChannel,
    deleteAllChannels,
    setChannels,
    setChannelActive,
    setChannelInctive,
    setChannelPrivate,
    setChannelPublic,
    setChannelPassword,
} from 'Redux/slices/channels.slice.js';
/*================================================*/
import {
    addMessage,
    deleteMessage,
    deleteAllMessages,
    setMessages,
} from 'Redux/slices/messages.slice.js';
/*================================================*/
import { addLogItem, deleteLogItem, deleteAllLogItems } from 'Redux/slices/log.slice.js';
/*================================================*/

export default function App(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const socket = useSocket();

    const user = useSelector((state) => {
        return state['user'].user;
    });

    // Hooks
    const [WSReady, setWSReady] = useState(false);

    /*================================================
        BLOCK: HOOK - WEBSOCKET COMMUNICATION
    ==================================================*/

    useEffect(() => {
        console.log('---------- USE-EFFECT - WebSocket ----------');

        /*================================================
            INNER: > WS - ON OPEN
        ==================================================*/

        socket.onopen = (e) => {
            console.log('>>>>>>>>> WebSocket Client Connected >>>>>>>>>');
            // setWSReady(true);
        };

        /*================================================
            INNER: > WS - ON MESSAGE
        ==================================================*/

        socket.onmessage = (messageData) => {
            const updateData = JSON.parse(messageData.data);
            console.log('>>>>>>>>> MESSAGE RECIEVED - ' + updateData.type + ' >>>>>>>>>');

            switch (updateData.type) {
                /*================================================*/
                /*================================================*/

                // HANDLER: => clientConnected
                case 'clientConnected': {
                    // This handler is only fired ONCE when the CURRENT user joins
                    console.log('======= START - MESSAGE - clientConnected =======');

                    // ==> Set current user ID
                    // TODO: returning users will not do this
                    // they will get id/name from cookies/localStorage OR from here on "return check" (create a new variable)
                    if (updateData.userID) {
                        dispatch(setID(updateData.userID));
                    }

                    // ==> Set messages
                    if (!(updateData.messages === undefined) && updateData.messages.length) {
                        dispatch(setMessages(updateData.messages));
                    }

                    // ==> Set users
                    if (!(updateData.users === undefined) && updateData.users.length) {
                        dispatch(setUsers(updateData.users));
                        dispatch(setUserTotal(updateData.users.length + 1)); // + 1 for current user
                    }

                    // TODO: =>>>>> MOVE USER ID AND USERCONNECTD TO NON-WS SERVER CODE
                    // ==> Send current user (with new user message) information to server
                    let newUpdate = {
                        type: 'userConnected',
                        user: user,
                        message: {
                            type: 'notification-connect',
                            name: user.name,
                            time: new Date().toGMTString(),
                            color: user.color,
                        },
                    };
                    socket.send(JSON.stringify(newUpdate));
                    console.log('>>>>>>>>> MESSAGE SENT - userConnected >>>>>>>>>');
                    console.log('======= END - MESSAGE - clientConnected =======');
                    break;
                }

                /*================================================*/
                /*================================================*/

                // HANDLER: => userConnected
                case 'userConnected': {
                    // This handler is only fired when OTHER users join
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
                    // This handler is only fired when OTHER users leave
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
                        dispatch(
                            setUserNickname({
                                id: updateData.user,
                                nickname: updateData.newNickname,
                            })
                        );
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
                        dispatch(setUserColor({ id: updateData.user, color: updateData.newColor }));
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
        };

        /*================================================
            INNER: > WS - ON CLOSE
        ==================================================*/

        socket.onclose = (e) => {
            // setWSReady(false);
            // TODO: check if neeeded
            // setTimeout(() => {
            //     setWS(new WebSocket(WS_URL));
            // }, 1000);
        };

        /*================================================
            INNER: > WS - ON ERROR
        ==================================================*/

        socket.onerror = (err) => {
            console.log('WebSocket encountered error: ', err.message, ' --> Closing socket');
            setWSReady(false);
            socket.close();
        };

        /*================================================
            INNER: > WS - COMPONENT UNMOUNTING
        ==================================================*/

        return () => {
            socket.close();
        };
    }, [socket]);

    /*================================================
        BLOCK: WS SENDERS - USER INFO
    ==================================================*/

    // FUNCTION: => sendUserName
    const sendUserName = (newName) => {
        console.log('===> START - sendUserName');
        let newUpdate = {
            type: 'updateUserName',
            userID: user.id,
            newName: newName,
            message: {
                type: 'notification-name',
                name: newName,
                namePrev: user.name,
                time: new Date().toGMTString(),
                color: user.color,
            },
        };
        socket.send(JSON.stringify(newUpdate));
        console.log('>>>>>>>>> MESSAGE SENT - updateUserName >>>>>>>>>');
        console.log('===> END - sendUserName');
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => sendUserNickname
    const sendUserNickname = (newNickname) => {
        console.log('===> START - sendUserNickname');
        let newUpdate = {
            type: 'updateUserNickname',
            userID: user.id,
            newNickname: newNickname,
            message: {
                type: 'notification-nickname',
                nickname: newNickname,
                nicknamePrev: user.nickname,
                time: new Date().toGMTString(),
                color: user.color,
            },
        };
        socket.send(JSON.stringify(newUpdate));
        console.log('>>>>>>>>> MESSAGE SENT - updateUserNickname >>>>>>>>>');
        console.log('===> END - sendUserNickname');
    };

    /*================================================*/
    /*================================================*/

    // FUNCTION: => sendUserColor
    const sendUserColor = (newColor) => {
        console.log('===> START - sendUserColor');
        let newUpdate = {
            type: 'updateUserColor',
            userID: user.id,
            newColor: newColor,
            message: {
                type: 'notification-color',
                name: user.name,
                time: new Date().toGMTString(),
                color: newColor,
                colorPrev: user.color,
            },
        };
        socket.send(JSON.stringify(newUpdate));
        console.log('>>>>>>>>> MESSAGE SENT - updateUserColor >>>>>>>>>');
        console.log('===> END - sendUserColor');
    };

    /*================================================
        BLOCK: DEV FUNCTIONS
    ==================================================*/
    // NOTE: to be moved (send functions are the issue)

    const onDevuser = () => {
        dispatch(
            addUser({
                id: generateRandomName(),
                name: generateRandomName(true),
                nickname: generateRandomName(false),
                color: generateRandomColor(),
            })
        );
    };
    const onDevcolor = () => {
        sendUserColor(generateRandomColor());
    };
    const onDevname = (e) => {
        if (e.keyCode === 13) {
            sendUserNickname(e.target.value);
            e.target.value = '';
        }
    };
    const onDevname3 = (e) => {
        if (e.keyCode === 13) {
            sendUserName(e.target.value);
            e.target.value = '';
        }
    };
    const onDevname2 = () => {
        sendUserNickname(generateRandomName());
    };
    const onDevpref4 = () => {
        dispatch(toggleTimestamps());
    };
    const onDevpref5 = () => {
        dispatch(toggle24HourTime());
    };

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
                        {/* <Route path='/room/:id' element={<App />}></Route> */}
                        <Route path='*' element={<ErrorPage />}></Route>
                    </Routes>
                </Router>
            </ContainerApp>

            <Dev
                onDevuser={onDevuser}
                onDevcolor={onDevcolor}
                onDevname={onDevname}
                onDevname2={onDevname2}
                onDevname3={onDevname3}
                onDevpref4={onDevpref4}
                onDevpref5={onDevpref5}
            />
        </>
    );
}
