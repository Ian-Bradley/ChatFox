import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import { Dev, DevInfo, DevTools, DevList, DevListItem, DevTitle } from './styles.js';

export default function Dev(props) {
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
                        {user.id + ' '}
                        <DevTitle>ID</DevTitle>
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
