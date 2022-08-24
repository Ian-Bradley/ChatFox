import { useSocket } from 'Util/api/websocket.js';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

// COMPONENTS
import { Container, DevInfo, DevTools, DevList, DevListItem, DevTitle } from './styles.js';

// REDUX
import { toggleTimestamps, toggle24HourTime } from 'Redux/slices/prefs.slice.js';
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
        BLOCK: FUNCTIONS
    ==================================================*/

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
        <Container>
            <DevInfo>
                <DevList>
                    <DevListItem>
                        <DevTitle>Current User: </DevTitle>
                    </DevListItem>
                    <DevListItem>
                        {user.name + ' '}
                        <DevTitle>Name</DevTitle>
                    </DevListItem>
                    <DevListItem>
                        {user.nickname + ' '}
                        <DevTitle>Nickname</DevTitle>
                    </DevListItem>
                    <DevListItem>
                        {user.color + ' '}
                        <DevTitle>Color</DevTitle>
                    </DevListItem>
                    <DevListItem>
                        {user.loggedIn + ' '}
                        <DevTitle>LoggedIn</DevTitle>
                    </DevListItem>
                    <DevListItem>
                        {prefs.showTimestamps + ' '}
                        <DevTitle>Timestamps</DevTitle>
                    </DevListItem>
                    <DevListItem>
                        {prefs.show24HourTime + ' '}
                        <DevTitle>24HourTime</DevTitle>
                    </DevListItem>
                </DevList>
            </DevInfo>
            <DevTools>
                <input
                    type='text'
                    className='name-input'
                    placeholder='Specific name'
                    defaultValue=''
                    onKeyDown={onDevname3}
                />
                <input
                    type='text'
                    className='name-input'
                    placeholder='Specific nickname'
                    defaultValue=''
                    onKeyDown={onDevname}
                />
                <button onClick={onDevname2}>Name</button>
                <button onClick={onDevcolor}>Color</button>
                <button onClick={onDevuser}>Fake User</button>
                <div>
                    <input type='checkbox' id='dev-time' onClick={onDevpref4} />
                    <label htmlFor='dev-time'>Timestamps</label>
                </div>
                <div>
                    <input type='checkbox' id='dev-hour' onClick={onDevpref5} />
                    <label htmlFor='dev-hour'>24 hour time</label>
                </div>
            </DevTools>
        </Container>
    );
}
