import React from 'react';
import { useSelector } from 'react-redux';

// STYLED COMPONENTS
import { Dev, DevInfo, DevTools, DevList, DevListItem, DevTitle } from './styles.js';

export default function Auth(props) {
    /*================================================
        BLOCK: STATE
    ==================================================*/

    // Redux
    const user = useSelector((state) => {
        return state['user'].user;
    });
    const prefs = useSelector((state) => {
        return state['prefs'].prefs;
    });

    /*================================================
        BLOCK: COMPONENTS
    ==================================================*/

    return (
        <Dev>
            <DevInfo>
                <DevList>
                    <DevListItem>
                        <DevTitle>Current User: </DevTitle>
                    </DevListItem>
                    <DevListItem>
                        <DevTitle>ID</DevTitle>
                        {user.id + ' '}
                    </DevListItem>
                    <DevListItem>
                        <DevTitle>Name</DevTitle>
                        {user.name + ' '}
                    </DevListItem>
                    <DevListItem>
                        <DevTitle>Nickname</DevTitle>
                        {user.nickname + ' '}
                    </DevListItem>
                    <DevListItem>
                        <DevTitle>Color</DevTitle>
                        {user.color + ' '}
                    </DevListItem>
                    <DevListItem>
                        <DevTitle>Timestamps</DevTitle>
                        {prefs.showTimestamps + ' '}
                    </DevListItem>
                    <DevListItem>
                        <DevTitle>24HourTime</DevTitle>
                        {prefs.show24HourTime + ' '}
                    </DevListItem>
                </DevList>
            </DevInfo>
            <DevTools>
                <input
                    type='text'
                    className='name-input'
                    placeholder='Specific name'
                    defaultValue=''
                    onKeyDown={props.onDevname3}
                />
                <input
                    type='text'
                    className='name-input'
                    placeholder='Specific nickname'
                    defaultValue=''
                    onKeyDown={props.onDevname}
                />
                <button onClick={props.onDevname2}>Name</button>
                <button onClick={props.onDevcolor}>Color</button>
                <button onClick={props.onDevuser}>Fake User</button>
                <div>
                    <input type='checkbox' id='dev-time' onClick={props.onDevpref4} />
                    <label htmlFor='dev-time'>Timestamps</label>
                </div>
                <div>
                    <input type='checkbox' id='dev-hour' onClick={props.onDevpref5} />
                    <label htmlFor='dev-hour'>24 hour time</label>
                </div>
            </DevTools>
        </Dev>
    );
}
