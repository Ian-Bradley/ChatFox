import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from 'Util/api/websocket.js';
import React from 'react';

// COMPONENTS
import { Container, Info, Tools, List, ListItem, Title } from './styles.js';
import Draggable from 'Shared/draggable/draggable.jsx';

// REDUX
import { toggleTimestamps, toggle24HourTime } from 'Redux/slices/prefs.slice.js';
import { setUserData, clearUserData } from 'Redux/slices/user.slice.js';
import { setLoggedIn, setLoggedOut } from 'Redux/slices/app.slice.js';
import { addChannel } from 'Redux/slices/channels.slice.js';
import { addUser } from 'Redux/slices/users.slice.js';

// UTILS
import { generateRandomName, generateRandomColor, generateRandomNumber } from 'Util/helpers/functions.js';

export default function Dev(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
    });
    const LOGGED_IN = useSelector((state) => {
        return state['app'].app.loggedIn;
    });
    const prefs = useSelector((state) => {
        return state['prefs'].prefs;
    });

    // Hooks
    const socket = useSocket();

    /*================================================
        BLOCK: WEBSOCKET SENDERS
    ==================================================*/

    // FUNCTION: => sendUserName
    const sendUserName = (newName) => {
        console.log('===> START - sendUserName');
        let newUpdate = {
            type: 'updateUserName',
            userID: user.id,
            name: newName,
            // message: {
            //     type: 'notification-name',
            //     name: newName,
            //     namePrev: user.name,
            //     time: new Date().toGMTString(),
            //     color: user.color,
            // },
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
            // message: {
            //     type: 'notification-nickname',
            //     nickname: newNickname,
            //     nicknamePrev: user.nickname,
            //     time: new Date().toGMTString(),
            //     color: user.color,
            // },
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
            color: newColor,
            // message: {
            //     type: 'notification-color',
            //     name: user.name,
            //     time: new Date().toGMTString(),
            //     color: newColor,
            //     colorPrev: user.color,
            // },
        };
        socket.send(JSON.stringify(newUpdate));
        console.log('>>>>>>>>> MESSAGE SENT - updateUserColor >>>>>>>>>');
        console.log('===> END - sendUserColor');
    };

    /*================================================
        BLOCK: TOOLS
    ==================================================*/

    const addFakeUser = () => {
        dispatch(
            addUser({
                id: 6,
                name: generateRandomName(true),
                nickname: generateRandomName(false),
                color: generateRandomColor(),
            })
        );
    };

    const addFakeChannel = () => {
        dispatch(
            addChannel({
                id: generateRandomNumber(1,200),
                name: generateRandomName(false),
                active: false,
                locked: false,
                password: '',
            })
        );
    };

    const toggleLogin = () => {
        if (!LOGGED_IN) {
            console.log('LOGGING IN');
            dispatch(
                setUserData({
                    id: 1,
                    name: generateRandomName(true),
                    nickname: generateRandomName(false),
                })
            );
            dispatch(setLoggedIn());
        } else {
            console.log('LOGGING OUT');
            dispatch(clearUserData());
            dispatch(setLoggedOut());
        }
    };

    const randomColor = () => {
        sendUserColor(generateRandomColor());
    };

    const randomName = () => {
        sendUserNickname(generateRandomName());
    };

    const changeNickname = (e) => {
        if (e.keyCode === 13) {
            sendUserNickname(e.target.value);
            e.target.value = '';
        }
    };

    const changeName = (e) => {
        if (e.keyCode === 13) {
            sendUserName(e.target.value);
            e.target.value = '';
        }
    };

    const timestamps = () => {
        dispatch(toggleTimestamps());
    };

    const fullHours = () => {
        dispatch(toggle24HourTime());
    };

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Draggable initial={{ top: 'calc(100vh - 433px)', left: '15px' }}>
            <Container>
                <Info>
                    <List>
                        <ListItem>
                            <Title>Current User: </Title>
                        </ListItem>
                        <ListItem>
                            <Title>ID</Title>
                            {' ' + user.id}
                        </ListItem>
                        <ListItem>
                            <Title>Name</Title>
                            {' ' + user.name}
                        </ListItem>
                        <ListItem>
                            <Title>Nickname</Title>
                            {' ' + user.nickname}
                        </ListItem>
                        <ListItem>
                            <Title>Color</Title>
                            {' ' + user.color}
                        </ListItem>
                        <ListItem>
                            <Title>ChannelID</Title>
                            {' ' + user.channelID}
                        </ListItem>
                        <ListItem>
                            <Title>LOGGED_IN</Title>
                            {' ' + LOGGED_IN}
                        </ListItem>
                        <ListItem>
                            <Title>Timestamps</Title>
                            {' ' + prefs.showTimestamps}
                        </ListItem>
                        <ListItem>
                            <Title>24HourTime</Title>
                            {' ' + prefs.show24HourTime}
                        </ListItem>
                    </List>
                </Info>
                <Tools>
                    <input type='text' placeholder='Name' onKeyDown={changeName} />
                    <input type='text' placeholder='Nickname' onKeyDown={changeNickname} />
                    <button onClick={randomName}>Name</button>
                    <button onClick={randomColor}>Color</button>
                    <button onClick={toggleLogin}>LoggedIn</button>
                    <button onClick={addFakeUser}>Fake User</button>
                    <button onClick={addFakeChannel}>Fake Channel</button>
                    <button onClick={timestamps}>Timestamps</button>
                    <button onClick={fullHours}>24 Hour</button>
                </Tools>
            </Container>
        </Draggable>
    );
}
