import { useSelector, useDispatch } from 'react-redux';
import { useSocket } from 'Util/api/websocket.js';
import React from 'react';

// COMPONENTS
import { Container, Info, Tools, List, ListItem, Title } from './styles.js';
import Draggable from 'Shared/draggable/draggable.jsx';

// REDUX
import { toggleTimestamps, toggle24HourTime } from 'Redux/slices/prefs.slice.js';
import { setLoggedIn } from 'Redux/slices/user.slice.js';
import { addUser } from 'Redux/slices/users.slice.js';

// UTILS
import { generateRandomName, generateRandomColor } from 'Util/helpers/functions.js';

export default function Dev(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state['user'].user;
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
        BLOCK: TOOLS
    ==================================================*/

    const addFakeUser = () => {
        dispatch(
            addUser({
                id: generateRandomName(),
                name: generateRandomName(true),
                nickname: generateRandomName(false),
                color: generateRandomColor(),
            })
        );
    };

    const toggleLogin = () => {
        user.loggedIn ? dispatch(setLoggedIn(false)) : dispatch(setLoggedIn(true));
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
        <Draggable initial={{top: 'calc(100vh - 372px)', left: '0'}}>
            <Container>
                <Info>
                    <List>
                        <ListItem>
                            <Title>Current User: </Title>
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
                            <Title>LoggedIn</Title>
                            {' ' + user.loggedIn}
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
                    <button onClick={timestamps}>Timestamps</button>
                    <button onClick={fullHours}>24 Hour</button>
                </Tools>
            </Container>
        </Draggable>
    );
}
